import { IoChevronDownOutline, IoMenu } from "react-icons/io5";
import { useContext, useState, useRef } from "react";
import { AuthContext } from "../../contexts/auth";
import { Link } from "react-router-dom";
import NavBarDropDown from "../NavBarDropDown";
import NavBarDrawerMenu from "../NavBarDrawerMenu";
import { FaUser } from "react-icons/fa";

const NavBar = () => {
  const { user } = useContext(AuthContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const dropdownRef = useRef(null);

  const FirtName = user?.name.split(" ")[0];

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  const toggleDrawer = () => {
    setDrawerOpen((prev) => !prev);
  };

  return (
    <nav className="bg-blue-500 h-14 flex flex-row justify-between items-center gap-5 px-2 shadow-md relative">
      <div className="flex flex-row items-center justify-center md:justify-start gap-3">
        <button
          className="rounded-md hover:bg-white transition-all p-1 group cursor-pointer"
          onClick={toggleDrawer}
        >
          <IoMenu className="w-7 h-7 text-white group-hover:text-blue-500 transition-all cursor-pointer" />
        </button>
        <Link to="/">
          <img src="/logo-text-white.svg" className="h-10 my-3" />
        </Link>
      </div>
      <div
        className="hidden md:flex flex-row items-center gap-3 relative"
        ref={dropdownRef}
      >
        <div className="w-7 h-7 rounded-full flex items-center justify-center bg-white">
          <FaUser className="w-4 h-4 text-blue-500" />
        </div>
        <span className="text-white ml-1">
          Olá, <strong>{FirtName}</strong>
        </span>
        <div
          className="rounded-md hover:bg-white transition-all p-1 group cursor-pointer"
          onClick={toggleDropdown}
        >
          <IoChevronDownOutline className="w-7 h-7 text-white group-hover:text-blue-500 transition-all" />
        </div>

        <NavBarDropDown
          isDropdownOpen={isDropdownOpen}
          setDropdownOpen={setDropdownOpen}
          dropdownRef={dropdownRef}
        />
      </div>

      <NavBarDrawerMenu isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </nav>
  );
};

export default NavBar;
