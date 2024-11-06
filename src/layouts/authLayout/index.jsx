import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return <main>
    {/* Navbar */}
    <Outlet />
  </main>;
};

export default AuthLayout;
