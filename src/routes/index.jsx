import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/authLayout";
import NoAuthLayout from "../layouts/noAuthLayout";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import HomePage from "../pages/home";
import AppointmentsPage from "../pages/appointments";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/appointments" element={<AppointmentsPage />} />
        </Route>
        <Route element={<NoAuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
