import { Outlet } from "react-router-dom";
import NavBar from "../../components/Navbar";

const AuthLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="max-w-full w-full h-full p-2">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
