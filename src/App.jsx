import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

import AdminLogin from "./pages/AdminLogin";
import InternshipAdmin from "./pages/InternshipAdmin";
import ScholarshipAdmin from "./pages/ScholarshipAdmin";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./Auth/Login";

function App() {
  return (
    <MantineProvider>
      <Router>
        <Routes>
          {/* DEFAULT HOME PAGE */}
          <Route path="/" element={<Login />} />

          {/* ADMIN LOGIN */}
          <Route path="/admin-login" element={<AdminLogin />} />

          {/* INTERNSHIP ADMIN */}
          <Route
            path="/admin/internships"
            element={<InternshipAdmin />}
          />

          {/* SCHOLARSHIP ADMIN */}
          <Route
            path="/admin/scholarships"
            element={<ScholarshipAdmin />}
          />

          {/* ADMIN DASHBOARD */}
          <Route
            path="/admin/dashboard"
            element={<AdminDashboard />}
          />
        </Routes>
      </Router>
    </MantineProvider>
  );
}

export default App;