/* eslint-disable @typescript-eslint/naming-convention */
"use client";

import PaginationButton from "./PaginationButton";
import { PaginationControlsProps } from "./TypeScrip";

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  delta = 2,
  labels = {
    first: "« First",
    previous: "‹ Previous",
    next: "Next ›",
    last: "Last »",
  },
}) => {
  const renderEllipsis = (
    position: "ellipsis-start" | "ellipsis-end",
  ): React.JSX.Element => (
    <span key={position} className="px-3 py-1 text-gray-500 dark:text-gray-400">
      &#8230;
    </span>
  );

  const renderPageButton = (
    pageNumber: number,
    isDisabled: boolean,
  ): React.JSX.Element => (
    <PaginationButton
      key={pageNumber}
      label={pageNumber.toString()}
      onClick={() => onPageChange(pageNumber)}
      disabled={isDisabled}
      ariaLabel={`Page ${pageNumber}`}
      className={`p-3 rounded-md transition duration-300 ${isDisabled ? "bg-gray-300 text-gray-700 cursor-not-allowed" : "bg-white text-[#FF6600] border border-[#FF6600] hover:bg-[#FF6600] hover:text-white"}`}
    />
  );

  const getPageNumbers = (): (number | JSX.Element)[] => {
    let startPage = Math.max(1, currentPage - delta);
    let endPage = Math.min(totalPages, currentPage + delta);
    const pageNumbers: (number | JSX.Element)[] = [];

    if (currentPage - delta <= 1) {
      endPage = Math.min(totalPages, endPage + (delta - (currentPage - 1)));
      startPage = 1;
    }

    if (currentPage + delta >= totalPages) {
      startPage = Math.max(1, startPage - (delta - (totalPages - currentPage)));
      endPage = totalPages;
    }

    if (startPage > 1) {
      pageNumbers.push(renderPageButton(1, currentPage === 1));
      if (startPage > 2) {
        pageNumbers.push(renderEllipsis("ellipsis-start"));
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(renderPageButton(i, i === currentPage));
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(renderEllipsis("ellipsis-end"));
      }
      pageNumbers.push(
        renderPageButton(totalPages, currentPage === totalPages),
      );
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <section className="flex flex-col items-center py-2">
      <div className="flex items-center justify-between w-full gap-2">
        <PaginationButton
          label={labels.first ?? "« First"}
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          ariaLabel="First Page"
          className="bg-[#FF6600] text-white hover:bg-[#e65c00] focus:ring-2 focus:ring-[#FF6600]"
        />
        <PaginationButton
          label={labels.previous ?? "‹ Previous"}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          ariaLabel="Previous Page"
          className="bg-[#FF6600] text-white hover:bg-[#e65c00] focus:ring-2 focus:ring-[#FF6600]"
        />
        {pageNumbers}
        <PaginationButton
          label={labels.next ?? "Next ›"}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          ariaLabel="Next Page"
          className="bg-[#FF6600] text-white hover:bg-[#e65c00] focus:ring-2 focus:ring-[#FF6600]"
        />
        <PaginationButton
          label={labels.last ?? "Last »"}
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          ariaLabel="Last Page"
          className="bg-[#FF6600] text-white hover:bg-[#e65c00] focus:ring-2 focus:ring-[#FF6600]"
        />
      </div>
    </section>
  );
};

export default PaginationControls;
