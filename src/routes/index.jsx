import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/authLayout";
import NoAuthLayout from "../layouts/noAuthLayout";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import Home from "../pages/home";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
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
