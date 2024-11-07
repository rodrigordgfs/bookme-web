import { IoCloseSharp } from "react-icons/io5";

const Modal = ({ isOpen, onClose, title, subtitle, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg">
        <div className="flex justify-between items-start mb-4">
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="text-xs text-zinc-600">{subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-white rounded-md hover:bg-blue-500 transition-all"
          >
            <IoCloseSharp className="w-6 h-6" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
