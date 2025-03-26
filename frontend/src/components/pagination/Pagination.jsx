import React from "react";

const Pagination = ({ currentPage, totalPages, totalCounts, onPageChange }) => {
  const maxPagesToShow = 8; // Limit displayed pages to 10
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  const pageNumbers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex items-center space-x-2">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="px-3 py-1 border rounded">
            1
          </button>
          {startPage > 2 && <span>...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <button 
          key={page} 
          onClick={() => onPageChange(page)} 
          className={`px-3 py-1 border rounded ${page === currentPage ? "bg-gray-300" : ""}`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span>...</span>}
          <button onClick={() => onPageChange(totalPages)} className="px-3 py-1 border rounded">
            {totalPages}
          </button>
        </>
      )}

      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
