import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../../components/Navbar";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";

const AuthLayout = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }
  , [user, navigate]);

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
