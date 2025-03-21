/* eslint-disable prefer-const */
import { Table } from "@tanstack/react-table";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
}

export function DataTablePagination<TData>({
  table,
}: DataTablePaginationProps<TData>) {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();

  // Determine pagination range
  let startPage = Math.max(1, currentPage - 1);
  let endPage = Math.min(totalPages, startPage + 2);

  if (endPage === totalPages) startPage = Math.max(1, totalPages - 2);

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="flex items-center justify-between px-2">
      {/* <div className="flex-1 text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div> */}
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div> */}
        <div className="flex items-center space-x-2">
          {/* Previous Button */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft className="text-primaryText" />
          </Button>

          {/* Page Numbers */}
          {pages.map((page) => (
            <Button
              key={page}
              // variant={currentPage === page ? "default" : "outline"}
              variant={"outline"}
              className={`h-8 w-8 p-0 ${
                currentPage === page
                  ? "bg-primaryText text-background hover:bg-primaryText hover:text-background"
                  : ""
              } `}
              onClick={() => table.setPageIndex(page - 1)}
            >
              {page}
            </Button>
          ))}

          {/* Next Button */}
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight className="text-primaryText" />
          </Button>
        </div>
      </div>
    </div>
  );
}
