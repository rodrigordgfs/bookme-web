import { Outlet } from "react-router-dom";
import NavBar from "../../components/Navbar";

const AuthLayout = () => {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex justify-center  bg-zinc-100">
        <div className="w-full max-w-[1200px] bg-white p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
