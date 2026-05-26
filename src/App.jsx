import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";

import Login from "./Auth/Login";
import AdminLogin from "./pages/AdminLogin";

import AdminLayout from "./layouts/AdminLayout";

import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/User";
import CreateUser from "./Auth/CreateUser";
import CreateScholarship from "./pages/CreateScholarship";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>

          {/* AUTH */}
          <Route path="/" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* ADMIN LAYOUT (IMPORTANT) */}
          <Route path="/admin" element={<AdminLayout />}>

            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="/admin/create-user" element={<CreateUser />} />
            <Route path="create-scholarship" element={<CreateScholarship />} />

          </Route>

        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;