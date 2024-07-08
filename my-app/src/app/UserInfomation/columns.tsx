"use client";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

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
  event_id:string;
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
  {
    accessorKey: "start_datetime",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Start Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "room",
    header: "Room",
  },
];
