/* eslint-disable no-unused-vars */
import React from "react";
import { usePagination, DOTS } from "./usePagination";
import { Icon } from "@iconify/react";
import "./pagination.css";

export interface PaginationProps {
  /**
   * Current page.
   */
  currentPage: number;
  /**
   * Total pages.
   */
  totalPages: number;
  /**
   * Go to previous page.
   */
  prev: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Go to next page.
   */
  next: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * Go to specific page.
   */
  goToPage: (v: string | number) => void;
  /**
   * Other unknown attributes
   */
  [x: string]: any;
}

/**
 * Pagination component for iterating through data on a table
 */

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages,
  goToPage,
  prev,
  next,
  className,
}) => {
  const paginationRange = usePagination({
    pages: totalPages,
    siblingCount: 1,
    currentPage,
  });

  if (currentPage === 0 || paginationRange?.length! < 1) {
    return null;
  }

  return (
    <div
      className={`zsm-pagination-container ${className ?? "pt-4 px-4 pb-2.5"}`}
    >
      <div className="relative inline-block text-left">
        <div className="text-grey-dark-3 inline-flex justify-center w-full focus:outline-none items-center gap-2">
            Showing page 
            <span className="text-grey-dark-1 text-sm font-normal">
                {currentPage} of {totalPages}
            </span>
        </div>
      </div>
      <div className="flex items-center gap-2 justify-start">
        <button
          type="button"
          onClick={prev}
          disabled={currentPage === 1}
          className={currentPage === 1 ? "zsm-pagination-arrow-button-inactive" : "zsm-pagination-arrow-button-active"}
        >
          <Icon
            icon="heroicons:chevron-left-solid"
            className="text-base"
          />
        </button>
        <div className="flex items-center gap-2">
          {paginationRange?.map((item, idx) =>
            item === DOTS ? (
              <button
                key={`${item.toString()}-${idx}`}
                type="button"
                className="zsm-pagination-number-button-inactive"
                disabled
              >
                &#8230;
              </button>
            ) : (
              <button
                key={item.toString()}
                className={
                  currentPage === item
                    ? "zsm-pagination-number-button-active"
                    : "zsm-pagination-number-button-inactive"
                }
                type="button"
                disabled={currentPage === item}
                onClick={() => goToPage(item)}
              >
                {item}
              </button>
            )
          )}
        </div>
        <button
          type="button"
          onClick={next}
          disabled={currentPage === totalPages}
          className={currentPage === totalPages ? "zsm-pagination-arrow-button-inactive" : "zsm-pagination-arrow-button-active"}
        >
          <Icon
            icon="heroicons:chevron-right-solid"
            className="text-base"
          />
        </button>
      </div>
    </div>
  );
};