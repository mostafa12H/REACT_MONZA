import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 3; 

  const getPaginationButtons = () => {
    const pages = [];

    pages.push(
      <button
        key={1}
        onClick={() => onPageChange(1)}
        className={`px-4 py-2 rounded-lg mx-1 transition-colors duration-300 ${
          currentPage === 1
            ? "bg-blue-600 text-white dark:bg-blue-400"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        }`}
      >
        1
      </button>
    );

    if (currentPage > maxPagesToShow + 1) {
      pages.push(
        <span
          key="dots-start"
          className="px-3 text-gray-500 dark:text-gray-400 flex items-center"
        >
          <FontAwesomeIcon icon={faEllipsisH} />
        </span>
      );
    }

    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 2);
    let endPage = Math.min(
      currentPage + Math.floor(maxPagesToShow / 2),
      totalPages - 1
    );

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-4 py-2 rounded-lg mx-1 transition-colors duration-300 ${
            currentPage === i
              ? "bg-blue-600 text-white dark:bg-blue-400"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {i}
        </button>
      );
    }

    if (currentPage < totalPages - maxPagesToShow) {
      pages.push(
        <span
          key="dots-end"
          className="px-3 text-gray-500 dark:text-gray-400 flex items-center"
        >
          <FontAwesomeIcon icon={faEllipsisH} />
        </span>
      );
    }

    if (totalPages > 1) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className={`px-4 py-2 rounded-lg mx-1 transition-colors duration-300 ${
            currentPage === totalPages
              ? "bg-blue-600 text-white dark:bg-blue-400"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="flex justify-center mt-8 space-x-1">
      {getPaginationButtons()}
    </div>
  );
};

export default Pagination;
