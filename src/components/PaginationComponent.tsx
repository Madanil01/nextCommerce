import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="mt-4 font-montserrat" aria-label="Pagination">
      <ul className="flex justify-center">
        <li
          className={`mx-1 ${
            currentPage === 1
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white cursor-pointer"
          } px-4 py-2 rounded-md`}
          onClick={handlePrevClick}
        >
          Previous
        </li>
        {pageNumbers.map((page) => (
          <li
            key={page}
            className={`mx-1 ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700 hover:bg-blue-700 hover:text-white cursor-pointer"
            } px-4 py-2 rounded-md`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </li>
        ))}
        <li
          className={`mx-1 ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-700 cursor-not-allowed"
              : "bg-blue-500 text-white cursor-pointer"
          } px-4 py-2 rounded-md`}
          onClick={handleNextClick}
        >
          Next
        </li>
      </ul>
    </nav>
  );
};

export default PaginationComponent;
