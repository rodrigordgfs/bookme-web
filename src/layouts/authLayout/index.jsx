import { Outlet } from "react-router-dom";
import NavBar from "../../components/Navbar";

const AuthLayout = () => {
  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center w-full h-full bg-zinc-100">
        <div className="max-w-[1200px] w-full h-full bg-white p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
