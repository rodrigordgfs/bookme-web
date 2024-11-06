import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/auth";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const NavBarDropDown = ({ isDropdownOpen, setDropdownOpen, dropdownRef }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // eslint-disable-next-line react/prop-types
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, setDropdownOpen]);

  return (
    <>
      {isDropdownOpen && (
        <div className="absolute right-0 mt-28 bg-zinc-800 shadow-sm rounded-md w-32">
          <button
            onClick={handleLogout}
            className="w-full px-4 py-2 text-white hover:bg-zinc-700 rounded-md transition-all text-center"
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default NavBarDropDown;
