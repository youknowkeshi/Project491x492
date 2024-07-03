import { Nav } from "../component/Nav";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      studentid: "630612106",
      status: "pending",
      email: "m@example.com",
      phone: "0945241644",
    },
    {
      id: "728ed52f",
      studentid: "630612106",
      status: "pending",
      email: "m@example.com",
      phone: "0945241644",
    },
    {
      id: "728ed52f",
      studentid: "630612106",
      status: "pending",
      email: "m@example.com",
      phone: "0945241644",
    },
    {
      id: "728ed52f",
      studentid: "630612106",
      status: "pending",
      email: "m@example.com",
      phone: "0945241644",
    },
    {
      id: "728ed52f",
      studentid: "630612106",
      status: "pending",
      email: "m@example.com",
      phone: "0945241644",
    },
    {
      id: "728ed52f",
      studentid: "630612106",
      status: "pending",
      email: "m@example.com",
      phone: "0945241644",
    },
    {
      id: "728ed52f",
      studentid: "630612106",
      status: "pending",
      email: "m@example.com",
      phone: "0945241644",
    },

    {
      id: "728ed52f",
      studentid: "630612106",
      status: "pending",
      email: "m@example.com",
      phone: "0945241644",
    },
    {
      id: "728ed52f",
      studentid: "630612106",
      status: "pending",
      email: "m@example.com",
      phone: "0945241644",
    },

    // ...
  ];
}

export default async function DemoPage() {
  const data = await getData();
  const dataCount = data.length;

  return (
    <>
      <Nav />
      <div className="container mx-auto ">
        <DataTable columns={columns} data={data} />
      </div>
      <span>Total Data Sets: {dataCount}</span>
    </>
  );
}
