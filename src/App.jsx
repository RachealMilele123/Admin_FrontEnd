import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import Login from "./Auth/Login";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import InternshipAdmin from "./pages/InternshipAdmin";


function App() {
  return (
    <MantineProvider>
    <Router>
      <Routes>

        {/* DEFAULT HOME PAGE */}
        <Route path="/" element={<Login />} />

        {/* ADMIN LOGIN */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* ADMIN DASHBOARD */}
        <Route path="/admin" element={<Admin />} />
        
        {/* INTERNSHIP ADMIN */}
        <Route path="/admin/internships" element={<InternshipAdmin />} /> 
      </Routes>
    </Router>
    </MantineProvider>
  );
}

export default App;