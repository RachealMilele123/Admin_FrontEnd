import { Navigate, Outlet } from "react-router-dom";

// Renders children/outlet only when the user is authenticated.
// Otherwise redirects to /login.
function PrivateRoute() {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoute;
