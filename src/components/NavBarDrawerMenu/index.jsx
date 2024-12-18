import {
  IoClose,
  IoHomeOutline,
  IoCalendarOutline,
  IoPersonOutline
} from "react-icons/io5";
import { MdWork } from "react-icons/md";
import { GrServices } from "react-icons/gr";
import { LuLayoutDashboard } from "react-icons/lu";
import { Link, useLocation } from "react-router-dom";

const NavBarDrawerMenu = ({ isOpen, onClose }) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex"
      onClick={onClose}
    >
      <div
        className="bg-white w-64 h-full shadow-lg p-5 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão de fechamento */}
        <div className="flex justify-end">
          <button onClick={onClose}>
            <IoClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        {/* Logo */}
        <div className="flex flex-row items-center justify-center w-full border-b pb-5 pt-4">
          <img src="/logo-text.svg" alt="Logo BookMe" className="h-12" />
        </div>

        {/* Navegação */}
        <nav className="mt-6">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                onClick={onClose}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  location.pathname === "/"
                    ? "text-blue-500 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <LuLayoutDashboard
                  className={`w-5 h-5 mr-3 ${
                    location.pathname === "/"
                      ? "text-blue-500"
                      : "text-gray-700"
                  }`}
                />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/appointments"
                onClick={onClose}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  location.pathname === "/appointments"
                    ? "text-blue-500 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <IoCalendarOutline
                  className={`w-5 h-5 mr-3 ${
                    location.pathname === "/appointments"
                      ? "text-blue-500"
                      : "text-gray-700"
                  }`}
                />
                <span>Appointments</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profissionals"
                onClick={onClose}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  location.pathname === "/profissionals"
                    ? "text-blue-500 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <MdWork
                  className={`w-5 h-5 mr-3 ${
                    location.pathname === "/profissionals"
                      ? "text-blue-500"
                      : "text-gray-700"
                  }`}
                />
                <span>Profissionais</span>
              </Link>
            </li>
            <li>
              <Link
                to="/clients"
                onClick={onClose}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  location.pathname === "/clients"
                    ? "text-blue-500 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <IoPersonOutline
                  className={`w-5 h-5 mr-3 ${
                    location.pathname === "/clients"
                      ? "text-blue-500"
                      : "text-gray-700"
                  }`}
                />
                <span>Clientes</span>
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                onClick={onClose}
                className={`flex items-center px-3 py-2 rounded-md transition-colors ${
                  location.pathname === "/services"
                    ? "text-blue-500 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <GrServices
                  className={`w-5 h-5 mr-3 ${
                    location.pathname === "/services"
                      ? "text-blue-500"
                      : "text-gray-700"
                  }`}
                />
                <span>Serviços</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBarDrawerMenu;
