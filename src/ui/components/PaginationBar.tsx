import React, { useMemo } from 'react';

interface PaginationBarProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationBar: React.FC<PaginationBarProps> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const pages = useMemo(() => {
    const maxVisible = 5;
    const pages: (number | string)[] = [];

    if (totalPages <= maxVisible) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    pages.push(1);
    if (start > 2) pages.push('...');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < totalPages - 1) pages.push('...');
    pages.push(totalPages);

    return pages;
  }, [currentPage, totalPages]);

  const baseBtnClass =
    'px-3 py-1 rounded min-w-[2.5rem] text-sm';
  const inactiveBtnClass =
    'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200';
  const activeBtnClass = 'bg-purple-500 text-white';

  const navBtnClass =
    'px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50';

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 mt-4 w-full overflow-x-auto">
      <button
        className={navBtnClass}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {pages.map((page, idx) =>
        typeof page === 'number' ? (
          <button
            key={page}
            className={`${baseBtnClass} ${
              page === currentPage ? activeBtnClass : inactiveBtnClass
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400 select-none">
            {page}
          </span>
        )
      )}

      <button
        className={navBtnClass}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationBar;
