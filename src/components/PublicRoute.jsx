import { Navigate, Outlet } from "react-router-dom";

// Renders children/outlet only when the user is NOT authenticated.
// Authenticated users are redirected to /admin/dashboard.
function PublicRoute() {
  const token = localStorage.getItem("token");
  const adminStr = localStorage.getItem("admin");
  
  // Check if token exists and admin data is valid
  if (token && adminStr) {
    try {
      const admin = JSON.parse(adminStr);
      if (admin.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
      }
    } catch (e) {
      // Invalid admin data, clear it
      localStorage.removeItem("token");
      localStorage.removeItem("admin");
    }
  }
  
  return <Outlet />;
}

export default PublicRoute;
