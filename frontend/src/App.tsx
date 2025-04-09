import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import AdminLogin from "./pages/AdminLogin";
import RefugeeLogin from "./pages/RefugeeLogin";
import NGOLogin from "./pages/NGOlogin";
import AdminDashboard from "./pages/AdminDashboard";
import RefugeeRegistration from "./pages/RefugeeRegistration";
import MonitorRefugee from "./pages/MonitorRefugee";
import Requests from "./pages/Requests";
import NGORegister from "./pages/NGORegister";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/refugee/login" element={<RefugeeLogin />} />
          <Route path="/ngo/login" element={<NGOLogin />} />
          <Route path="/ngo/register" element={<NGORegister />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/refugee-register" element={<RefugeeRegistration />} />
          <Route path="/monitor-refugee" element={<MonitorRefugee />} />
          <Route path="/requests" element={<Requests />} />
        </Routes>
      </Router>
  );
}

export default App;
