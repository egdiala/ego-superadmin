import React from "react";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Icon } from "@iconify/react";
import { Pagination, RenderIf } from "..";
import { EmptyState } from "./EmptyState";
import { TableLoader } from "./TableLoader";
import { useLocation } from "react-router-dom";
import { getPaginationParams } from "@/hooks/usePaginationParams";

interface TableProps {
  columns: ColumnDef<any>[]; // table columns; see Table.stories.tsx for sample use
  data: any[]; // table data
  page?: number;
  loading?: boolean;
  perPage?: number;
  paginateData?: boolean; // show pagination
  totalCount?: number; // total count of table data
  emptyStateText?: string;
  getData: (page: number, rowsPerPage: number) => void; // handle pagination on page mount
  onClick?: (row: any) => void; // on click event for table row
  onPageChange: (page: number, rowsPerPage: number) => void; // handle pagination change
}

export const Table: React.FC<TableProps> = ({
  columns,
  data,
  page = 1,
  perPage = 10,
  loading = false,
  getData,
  totalCount,
  emptyStateText = "",
  onPageChange,
  onClick = () => {},
  paginateData = true,
}) => {
  const location = useLocation();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [currentPage, setCurrentPage] = React.useState<number>(page);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(perPage);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    debugTable: true,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    onPageChange(page, rowsPerPage);
  };

  // Function to navigate to a specific page
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalCount!) {
      handlePageChange(page);
    }
  };

  // Function to navigate to previous page
  const prev = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  // Function to navigate to next page
  const next = () => {
    if (currentPage < totalCount!) {
      handlePageChange(currentPage + 1);
    }
  };

  React.useEffect(() => {
    if (paginateData) {
      getPaginationParams(location, setCurrentPage, setRowsPerPage);
      getData(currentPage, rowsPerPage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <div
      data-testid="table-component"
      className="min-h-40vh w-full h-full border border-neutral-10 rounded-lg"
    >
      <table className="font-cabin w-full h-full">
        {/* Table Head */}
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="w-full flex justify-between items-center px-6 py-3 border-b border-b-neutral-10 rounded-t-lg bg-neutral-variant cursor-pointer"
            >
              {headerGroup.headers.map((header, index) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="w-full text-left"
                    style={{
                      width: `${header.getSize()}px`,
                      opacity: header.id === "action" ? 0 : 1,
                    }}
                  >
                    {header.isPlaceholder ? null : (
                      <td
                        className={`w-full flex items-center gap-[2px] text-left
                          ${
                            header.column.getCanSort()
                              ? "cursor-pointer select-none"
                              : ""
                          }
                        `}
                        onClick={
                          index === 0
                            ? header.column.getToggleSortingHandler()
                            : () => {}
                        }
                        title={
                          header.column.getCanSort()
                            ? header.column.getNextSortingOrder() === "asc"
                              ? "Sort ascending"
                              : header.column.getNextSortingOrder() === "desc"
                                ? "Sort descending"
                                : "Clear sort"
                            : undefined
                        }
                      >
                        <span className="text-left text-neutral-80 text-sm font-bold leading-[21px] tracking-[0.14px]">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>

                        <RenderIf condition={index === 0}>
                          <Icon
                            icon="ph:caret-up-down-fill"
                            className="text-neutral-40"
                          />
                        </RenderIf>
                      </td>
                    )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        {/* Table Body */}
        {loading ? (
          <tbody className="min-h-[20rem]">
            <TableLoader />
          </tbody>
        ) : data.length > 0 ? (
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  onClick={() => onClick(row)}
                  className="w-full flex justify-between items-center px-6 py-4 border-b border-b-neutral-10"
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="w-full text-left text-neutral-base text-sm font-normal leading-[21px] tracking-[0.14px] break-words"
                        style={{ width: `${cell.column.getSize()}px` }}
                        onClick={(e) => {
                          if (
                            cell.column.id === "action" ||
                            cell.column.id === "status"
                          ) {
                            e.stopPropagation();
                          }
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody className="flex items-center justify-center">
            <EmptyState
              emptyStateText={emptyStateText}
            />
          </tbody>
        )}

        <RenderIf condition={paginateData && data.length > 0 && !loading}>
          <tfoot>
            <Pagination
              className="px-6 py-3"
              currentPage={currentPage}
              totalPages={Math.ceil((totalCount as number) / rowsPerPage)}
              prev={prev}
              next={next}
              goToPage={(v) => goToPage(Number(v))}
            />
          </tfoot>
        </RenderIf>
      </table>
    </div>
  );
};