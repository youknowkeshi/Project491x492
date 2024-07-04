"use client";
import { useRouter } from 'next/router';
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
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  studentid: string;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
  phone: string;
  facebook_url : string;
};

export const columns: ColumnDef<Payment>[] = [
  // {
  //   accessorKey: "email",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         Email
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  // },
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
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "facebook_url",
    header: "Facebook",
    cell: ({ row }) => (
      <a href={row.original.facebook_url} target="_blank" rel="noopener noreferrer">
        {row.original.facebook_url}
      </a>
    ),
  },
];
