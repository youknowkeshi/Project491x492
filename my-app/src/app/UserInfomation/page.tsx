"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navbaradmin } from "../component/Navbaradmin";
import { columns } from "./columns";
import { DataTable } from "./data-table";

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
  end_datetime: string;
  room: string;
  event_id: string;
};

function formatDatetime(start: string): string {
  const startDate = new Date(start);

  const date = startDate.toISOString().split("T")[0]; // YYYY-MM-DD

  return `${date}`;
}

export default function DemoPage() {
  const [information, setInformation] = useState<Information[]>([]);

  async function fetchData() {
    const apiUrl = `https://entaneermindbackend.onrender.com/api/infor/getinformationusers`;
    try {
      const response = await axios.get(apiUrl);

      // Format start_datetime and end_datetime, and reverse the data array
      const formattedData = response.data.map((item: Information) => ({
        ...item,
        start_datetime: formatDatetime(item.start_datetime),
      }));
      
      setInformation(formattedData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbaradmin />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            ข้อมูลผู้ใช้บริการ
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4  sm:px-6 lg:px-8">
          <div className="container mx-auto ">
            <DataTable columns={columns} data={information} />
          </div>
        </div>
      </main>
    </>
  );
}
