import { Navigate, Outlet } from "react-router-dom";

// Renders children/outlet only when the user is authenticated AND is an admin.
// Otherwise redirects to /login.
function PrivateRoute() {
  const token = localStorage.getItem("token");
  const userStr = localStorage.getItem("admin");
  
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  
  // Parse user data to check role
  let user = null;
  try {
    user = userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error("Failed to parse user data:", e);
    return <Navigate to="/login" replace />;
  }
  
  // Verify user has admin role
  if (!user || user.role !== "admin") {
    // Clear invalid auth data
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    return <Navigate to="/admin/login" replace />;
  }
  
  return <Outlet />;
}

export default PrivateRoute;
