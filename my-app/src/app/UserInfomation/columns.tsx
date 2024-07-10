"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export type Information = {
  personid: string;
  firstname_lastname: string;
  studentid: string;
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

export const columns: ColumnDef<Information>[] = [
  {
    accessorKey: "studentid",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Student ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "firstname_lastname",
    header: "Name",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "major",
    header: "Major",
  },
  {
    accessorKey: "facebookurl",
    header: "Facebook",
  },
];