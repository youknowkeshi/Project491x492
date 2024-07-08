"use client";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// This type is used to define the shape of our data.
export type Payment = {
  id: string;
  studentid: string;
  date: string; // New date field
  email: string;
  phone: string;
  facebook_url: string;
};
const dateSortingFn = (
  rowA: { original: { date: any } },
  rowB: { original: { date: any } }
) => {
  const parseDate = (dateString: {
    split: (arg0: string) => {
      (): any;
      new (): any;
      map: { (arg0: NumberConstructor): [any, any, any]; new (): any };
    };
  }) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day).getTime();
  };

  const dateA = parseDate(rowA.original.date);
  const dateB = parseDate(rowB.original.date);
  return dateA - dateB;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "studentid",
    header: "Student ID",
  },
  {
    accessorKey: "date", // New date field
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const dateA = new Date(rowA.original.date).getTime();
      const dateB = new Date(rowB.original.date).getTime();
      return dateA - dateB;
    },
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "facebook_url",
    header: "Facebook",
  },
];
