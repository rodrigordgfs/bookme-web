import { useState } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

const Collapsible = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className="w-full border rounded-md">
      <div
        className={`flex flex-row items-center justify-between cursor-pointer p-4 bg-zinc-200 ${
          isOpen ? "rounded-t-md" : "rounded-md"
        }`}
        onClick={toggle}
      >
        <h3 className="font-medium text-lg text-zinc-600">{title}</h3>
        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {isOpen && <div className="p-4">{children}</div>}
    </div>
  );
};

export default Collapsible;
