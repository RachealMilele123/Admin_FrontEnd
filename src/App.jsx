import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import Login from "./Auth/Login";
import AdminLogin from "./pages/AdminLogin";

import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/User";
import CreateUser from "./Auth/CreateUser";
import CreateScholarship from "./pages/CreateScholarship";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Message";
import Notifications from "./pages/Notifications";

function App() {
  const token = localStorage.getItem("token");

  return (
    <MantineProvider>
      <Router>
        <Routes>
          {/* LOGIN ROUTES */}
          <Route
            path="/login"
            element={token ? <Navigate to="/admin/dashboard" /> : <Login />}
          />

          <Route
            path="/"
            element={
              token ? <Navigate to="/admin/dashboard" /> : <AdminLogin />
            }
          />

          {/* PROTECTED ADMIN ROUTES */}
          <Route
            path="/admin"
            element={token ? <AdminLayout /> : <Navigate to="/login" />}
          >
            <Route path="dashboard" element={<AdminDashboard />} />

            <Route path="users" element={<Users />} />

            <Route path="create-user" element={<CreateUser />} />

            <Route path="create-scholarship" element={<CreateScholarship />} />

            <Route path="reports" element={<Reports />} />

            <Route path="analytics" element={<Analytics />} />

            <Route path="messages" element={<Messages />} />

            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;
