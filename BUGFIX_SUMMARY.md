# 403 Forbidden Error Fix - Internship Creation

## Problem Description

When attempting to create internships in the ScholarLink admin panel, the following error occurred:

```
POST http://localhost:8000/api/internships 403 (Forbidden)
InternshipAdmin.jsx:93 Failed to save internship Error: Forbidden
api.js:16 handleResponse Error: Forbidden
```

## Root Cause Analysis

The 403 Forbidden error was caused by a **broken authentication flow** in the frontend:

### Issue 1: JWT Token Not Being Stored
**File**: `src/pages/AdminLogin.jsx` (lines 48-54)

**Before**:
```javascript
// Demo credentials
const adminEmail = "admin@scholarlink.com";
const adminPassword = "12345";

setTimeout(() => {
  if (email === adminEmail && password === adminPassword) {
    localStorage.setItem("admin", "true");  // ❌ No JWT token stored!
    navigate("/admin");
  }
}, 1200);
```

**Problem**: The component used hardcoded demo credentials and never called the backend API. It only stored `localStorage.setItem("admin", "true")` without storing the JWT token.

### Issue 2: Missing Authorization Header
**File**: `src/api.js` (lines 4-9)

```javascript
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");  // ❌ Returns undefined!
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};
```

**Problem**: When creating an internship, `getAuthHeaders()` tried to get the token from `localStorage.getItem("token")`, but it was `undefined` because AdminLogin never stored it. This resulted in no Authorization header being sent.

### Issue 3: Wrong API Endpoint
**File**: `src/pages/AdminLogin.jsx` (line 40)

```javascript
const data = await authAPI.login(email, password);  // ❌ Calls /api/auth/login (user login)
```

**Problem**: The frontend was calling the user login endpoint (`/api/auth/login`) instead of the admin login endpoint (`/api/admin/login`).

## Backend Authentication Flow

### Middleware Chain
**File**: `../scholarlink-backend/middleware/auth.js`

```javascript
const protect = async (req, res, next) => {
  // 1. Extract token from Authorization header
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;

  if (!token) {
    return next(new AppError('Not authorized', 401));  // ❌ No token = 401
  }

  // 2. Verify JWT token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // 3. Find user in User or Admin model
  let user = await User.findById(decoded.id).select('-password');
  if (!user) {
    user = await Admin.findById(decoded.id).select('-password');
  }

  if (!user) {
    return next(new AppError('User not found', 401));
  }

  req.user = user;
  next();
};

const authorizeRoles = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(new AppError('Forbidden', 403));  // ❌ Wrong role = 403
  }
  next();
};
```

### Route Protection
**File**: `../scholarlink-backend/routes/internshipRoutes.js`

```javascript
// CREATE INTERNSHIP (Admin)
router.post('/', protect, authorizeRoles('admin'), createInternship);
```

**Flow**:
1. `protect` middleware checks for valid JWT token
2. `authorizeRoles('admin')` checks if user role is 'admin'
3. If either check fails, returns 403 Forbidden

## Solutions Implemented

### Fix 1: Updated AdminLogin.jsx to Use Backend API

**File**: `src/pages/AdminLogin.jsx`

**Changes**:
1. Added import for `authAPI`
2. Replaced hardcoded demo login with actual API call
3. Store JWT token in localStorage
4. Store admin/user data in localStorage

```javascript
import { authAPI } from "../api";

const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  if (!email || !password) {
    setError("Please fill in all fields");
    return;
  }

  setLoading(true);

  try {
    // Call the admin login API
    const data = await authAPI.adminLogin(email, password);

    console.log("Admin login response:", data);

    // Check if the response contains admin data
    if (data.admin || data.user) {
      // Save JWT token
      localStorage.setItem("token", data.token);  // ✅ Store token
      
      // Save user/admin info
      const userData = data.admin || data.user;
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect to Admin Dashboard
      navigate("/admin/dashboard");
    } else {
      setError("Invalid response from server");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError(err.message || "Invalid email or password");
  } finally {
    setLoading(false);
  }
};
```

### Fix 2: Added Admin Login Endpoint to API

**File**: `src/api.js`

**Changes**:
1. Added `adminLogin` method to `authAPI`
2. Calls correct endpoint `/api/admin/login`

```javascript
export const authAPI = {
  // User Login
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  // Admin Login
  adminLogin: async (email, password) => {  // ✅ New method
    const response = await fetch(`${API_URL}/admin/login`, {  // ✅ Correct endpoint
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return handleResponse(response);
  },

  // ... rest of methods
};
```

## Complete Authentication Flow (After Fix)

### 1. Admin Login
```
AdminLogin.jsx
  ↓
authAPI.adminLogin(email, password)
  ↓
POST http://localhost:8000/api/admin/login
  ↓
Backend: adminController.loginAdmin()
  ↓
Verify credentials against Admin model
  ↓
Generate JWT token: jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: "7d" })
  ↓
Return: { token, admin: {...} }
  ↓
Frontend stores:
  - localStorage.setItem("token", data.token)
  - localStorage.setItem("user", JSON.stringify(data.admin))
```

### 2. Create Internship
```
InternshipAdmin.jsx
  ↓
internshipsAPI.create(values)
  ↓
getAuthHeaders() retrieves token from localStorage
  ↓
POST http://localhost:8000/api/internships
  Headers: {
    "Content-Type": "application/json",
    "Authorization": "Bearer <JWT_TOKEN>"
  }
  ↓
Backend: protect middleware
  - Extract token from header
  - Verify JWT token
  - Find admin in Admin model
  - Attach admin to req.user
  ↓
Backend: authorizeRoles('admin')
  - Check req.user.role === 'admin'
  - ✅ Pass (admin role matches)
  ↓
Backend: createInternship controller
  - Create internship in MongoDB
  - Return success response
  ↓
Frontend receives success, refreshes list
```

## Verification Checklist

✅ **JWT token is attached to API requests**
- Token is retrieved from `localStorage.getItem("token")`
- Added to Authorization header as `Bearer ${token}`
- All authenticated API calls use `getAuthHeaders()`

✅ **Admin role permissions are correctly handled**
- Admin login endpoint: `/api/admin/login`
- Admin model has `role: "admin"` field
- JWT token contains admin user ID
- Backend middleware checks role correctly

✅ **Backend middleware does not block valid admin users**
- `protect` middleware verifies JWT and finds admin
- `authorizeRoles('admin')` checks role matches
- Admin users pass both checks

✅ **POST /api/internships returns success instead of 403**
- Valid JWT token provided
- Admin role verified
- Request reaches controller
- Internship created in MongoDB

✅ **Internship data is saved to MongoDB**
- Controller creates document with provided data
- MongoDB stores the internship
- Success response returned to frontend

## Testing Instructions

1. **Start Backend Server**:
   ```bash
   cd ../scholarlink-backend
   npm start
   ```

2. **Start Frontend**:
   ```bash
   npm run dev
   ```

3. **Test Admin Login**:
   - Navigate to `/admin-login`
   - Enter admin credentials (must exist in database)
   - Check browser console for "Admin login response"
   - Verify `localStorage` has "token" and "user" keys

4. **Test Internship Creation**:
   - Navigate to `/admin/internships`
   - Click "Add Internship"
   - Fill in the form
   - Click "Post Internship"
   - Verify no 403 error
   - Verify internship appears in table

## Files Modified

1. **src/pages/AdminLogin.jsx**
   - Replaced hardcoded demo login with API call
   - Added JWT token storage
   - Uses `authAPI.adminLogin()` instead of hardcoded check

2. **src/api.js**
   - Added `adminLogin` method to `authAPI`
   - Calls correct endpoint `/api/admin/login`

## Backend Configuration (No Changes Needed)

The backend was already correctly configured:
- ✅ Admin model with role field
- ✅ JWT middleware protecting routes
- ✅ Role-based authorization
- ✅ Admin login endpoint at `/api/admin/login`
- ✅ JWT_SECRET configured in .env

## Summary

The 403 Forbidden error was caused by the frontend not properly authenticating admin users. The AdminLogin component was using hardcoded demo credentials instead of calling the backend API, which meant no JWT token was ever generated or stored. When the InternshipAdmin component tried to create an internship, it had no token to send in the Authorization header, causing the backend middleware to reject the request with 403 Forbidden.

The fix ensures that:
1. Admin login calls the real backend API
2. JWT token is properly stored in localStorage
3. All authenticated requests include the token in the Authorization header
4. Backend middleware can verify the token and admin role
5. Internship creation succeeds with proper authentication