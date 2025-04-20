import React from "react";

const PaginationComponent = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 8; //
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
    <div className="flex flex-row items-center space-x-2 w-full justify-center text-skin-primary">
      <button 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        className="px-3 py-1 border rounded disabled:opacity-50 bg-skin-button-primary"
      >
        Prev
      </button>

      {startPage > 1 && (
        <>
          <button onClick={() => onPageChange(1)} className="px-3 py-1 border rounded bg-skin-button-primary">
            1
          </button>
          {startPage > 2 && <span>...</span>}
        </>
      )}

      {pageNumbers.map((page) => (
        <button 
          key={page} 
          onClick={() => onPageChange(page)} 
          className={`px-3 py-1 border rounded ${page === currentPage ? "bg-skin-button-secondary text-skin-secondary" : "bg-skin-button-primary text-skin-primary"}`}
        >
          {page}
        </button>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span>...</span>}
          <button onClick={() => onPageChange(totalPages)} className="px-3 py-1 border rounded bg-skin-button-primary">
            {totalPages}
          </button>
        </>
      )}

      <button 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className="px-3 py-1 border rounded disabled:opacity-50 bg-skin-button-primary"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationComponent;
