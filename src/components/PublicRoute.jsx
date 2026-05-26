import { Navigate, Outlet } from "react-router-dom";

// Renders children/outlet only when the user is NOT authenticated.
// Authenticated users are redirected to /admin/dashboard.
function PublicRoute() {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/admin/dashboard" replace /> : <Outlet />;
}

export default PublicRoute;
