import { IoClose } from "react-icons/io5";

// eslint-disable-next-line react/prop-types
const NavBarDrawerMenu = ({ isOpen, onClose }) => {
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
        <div className="flex justify-end">
          <button onClick={onClose}>
            <IoClose className="w-6 h-6 text-gray-600" />
          </button>
        </div>
        <div className="flex flex-row items-center justify-center w-full border-b pb-5 pt-4">
          <img src="/logo-text.svg" alt="Logo BookMe" className="h-12" />
        </div>
        <nav className="mt-4">
          <ul className="space-y-4">
            <li>
              <a href="/" className="text-blue-500 hover:underline text-center">
                Home
              </a>
            </li>
            <li>
              <a
                href="/about"
                className="text-blue-500 hover:underline text-center"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="/services"
                className="text-blue-500 hover:underline text-center"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="text-blue-500 hover:underline text-center"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavBarDrawerMenu;
