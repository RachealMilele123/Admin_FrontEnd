import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import { AuthProvider } from "./context/AuthContext";

import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import Login from "./Auth/Login";
import AdminLogin from "./pages/AdminLogin";

import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/User";
import CreateUser from "./Auth/CreateUser";
import CreateScholarship from "./pages/CreateScholarship";
import Scholars from "./pages/Scholars";
import InternshipAdmin from "./pages/InternshipAdmin";
import AssessmentAdmin from "./pages/AssessmentAdmin";
import Reports from "./pages/Reports";
import Analytics from "./pages/Analytics";
import Messages from "./pages/Message";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <Router>
          <Routes>
          {/* PUBLIC ROUTES — redirect to dashboard when already logged in */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<AdminLogin />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* PRIVATE ROUTES — redirect to /login when not authenticated */}
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="create-user" element={<CreateUser />} />
              <Route
                path="create-scholarship"
                element={<CreateScholarship />}
              />
              <Route path="scholars" element={<Scholars />} />
              <Route path="internships" element={<InternshipAdmin />} />
              <Route path="assessments" element={<AssessmentAdmin />} />
              <Route path="reports" element={<Reports />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="messages" element={<Messages />} />
              <Route path="notifications" element={<Notifications />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  </MantineProvider>
  );
}

export default App;
