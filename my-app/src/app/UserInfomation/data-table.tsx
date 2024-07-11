"use client";

import React, { useState, useEffect } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Define a custom filter function
const globalFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  return (
    row.original.firstname_lastname
      .toLowerCase()
      .includes(filterValue.toLowerCase()) ||
    row.original.studentid.toLowerCase().includes(filterValue.toLowerCase()) ||
    row.original.phone.toLowerCase().includes(filterValue.toLowerCase()) ||
    row.original.major.toLowerCase().includes(filterValue.toLowerCase()) ||
    row.original.gender.toLowerCase().includes(filterValue.toLowerCase()) ||
    row.original.topic.toLowerCase().includes(filterValue.toLowerCase())
  );
};

export type Information = {
  personid: string;
  firstname_lastname: string;
  studentid: string;
  phone: string;
  major: string;
  topic: string;
  facebookurl: string;
  details_consultation: string | null;
  mental_health_checklist: string | null;
  start_datetime: string;
  room: string;
  event_id: string;
};

interface DataTableProps {
  columns: ColumnDef<Information, any>[];
  data: Information[];
}

export function DataTable({ columns, data }: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn,
    state: {
      sorting,
      globalFilter,
    },
  });

  if (!isClient) {
    return null;
  }

  return (
    <>
      <div className="flex items-center py-7">
        <Input
          placeholder="Filter data..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border ">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() =>
                    (window.location.href = `/EditInformation?id=${row.original.event_id}`)
                  }
                  style={{ cursor: "pointer" }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </>
  );
}

export default DataTable;
