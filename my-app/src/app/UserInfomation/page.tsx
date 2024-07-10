"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Nav } from "../component/Nav";
import { columns } from "./columns";
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

// Function to generate a random date within the past year
function getRandomDate() {
  const start = new Date();
  const end = new Date(start);
  start.setFullYear(start.getFullYear() - 1);
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.toLocaleDateString("th-TH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "728ed52f1",
      studentid: "630612106",
      date: getRandomDate(), // Generate random date
      email: "a@example.com",
      phone: "0945241644",
      facebook_url: "https://www.facebook.com/casey.4552/",
    },
    {
      id: "728ed52f2",
      studentid: "610612105",
      date: getRandomDate(), // Generate random date
      email: "bm@example.com",
      phone: "0945241644",
      facebook_url: "https://www.facebook.com/nithikon440",
    },
    {
      id: "728ed52f3",
      studentid: "630612107",
      date: getRandomDate(), // Generate random date
      email: "c1@example.com",
      phone: "0945241644",
      facebook_url: "https://www.facebook.com/casey.4552/",
    },
    {
      id: "728ed52f4",
      studentid: "630612108",
      date: getRandomDate(), // Generate random date
      email: "d@example.com",
      phone: "0945241644",
      facebook_url: "https://www.facebook.com/casey.4552/",
    },
    {
      id: "728ed52f5",
      studentid: "630612109",
      date: getRandomDate(), // Generate random date
      email: "e@example.com",
      phone: "0945241644",
      facebook_url: "https://www.facebook.com/casey.4552/",
    },
    {
      id: "728ed52f6",
      studentid: "630612110",
      date: getRandomDate(), // Generate random date
      email: "f@example.com",
      phone: "0945241644",
      facebook_url: "https://www.facebook.com/casey.4552/",
    },
    {
      id: "728ed52f7",
      studentid: "630612111",
      date: getRandomDate(), // Generate random date
      email: "g@example.com",
      phone: "0945241644",
      facebook_url: "https://www.facebook.com/casey.4552/",
    },
    {
      id: "728ed52f8",
      studentid: "630612112",
      date: getRandomDate(), // Generate random date
      email: "h@example.com",
      phone: "0945241644",
      facebook_url: "https://www.facebook.com/casey.4552/",
    },
    {
      id: "728ed52f9",
      studentid: "630612113",
      date: getRandomDate(), // Generate random date
      email: "i@example.com",
      phone: "0945241644",
      facebook_url: "https://www.facebook.com/casey.4552/",
    },
    {
      id: "728ed52f10",
      studentid: "630612114",
      date: getRandomDate(), // Generate random date
      email: "j@example.com",
      phone: "0945241644",
      facebook_url: "https://www.facebook.com/casey.4552/",
    },
  ];
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <>
      <Nav />
      <div className="container mx-auto">
        <DataTable columns={columns} data={information} />
      </div>
    </>
  );
}
