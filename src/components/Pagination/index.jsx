import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "../Button";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onItemsPerPageChange,
}) => {
  console.log("Pagination", currentPage, totalPages);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    onItemsPerPageChange(parseInt(e.target.value, 10));
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center mt-4 md:mt-0">
      <div className="flex flex-row w-full justify-center md:justify-start items-center gap-2">
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="ml-4 px-4 py-2 border rounded"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={30}>30</option>
          <option value={40}>40</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <p>Items por página</p>
      </div>
      <div className="flex flex-row items-center justify-center md:justify-end gap-2 p-4 bg-white w-full">
        <Button size="icon" onClick={handlePrev} disabled={currentPage === 1}>
          <FaChevronLeft className="m-2" />
        </Button>
        <div>
          Página {currentPage} de {totalPages}
        </div>
        <Button
          size="icon"
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight className="m-2" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
