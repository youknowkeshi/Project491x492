"use client";
import React, { useEffect, useState } from "react";
import { Navbaradmin } from "../component/Navbaradmin";
import { DatePicker } from "./datepicker";
import { Button } from "@/components/ui/button";
import { Label, Select } from "flowbite-react";
import axios from "axios";

type Props = {};

export default function Page({ }: Props) {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState("-");
  const [endTime, setEndTime] = useState("-");
  const [personId, setPersonId] = useState("");

  const handlestarttimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTime(event.target.value);
  };

  const handleendtimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(event.target.value);
  };

  const formatDateTime = (date: Date, time: string): string => {
    // Create a new Date object to avoid mutating the original date
    const newDate = new Date(date);
    // Add one day to the date
    newDate.setDate(newDate.getDate() + 1);
  
    const isoString = newDate.toISOString().split('T')[0]; // Get YYYY-MM-DD part
    const formattedDateTime = `${isoString}T${time}`;
    return formattedDateTime;
  };
  
  async function getdata() {
    const apiurl = `/api/register`;
    const response = await axios.get(apiurl);
    const cmuaccount = response.data.cmuAccount;
    axios
      .put("http://localhost:3001/api/admin/checkadmin", { cmuaccount }).then((response) => {
        setPersonId(response.data[0].personid);
      });
  }

  async function closetimeslot(start_datetime: string, end_datetime: string, personid: string) {
    const apiurl = `http://localhost:3001/api/admin/closetimeslot`;
    axios.post(apiurl, { start_datetime, end_datetime, personid });
  }

  const submit = () => {
    if (startDate && endDate) {
      closetimeslot(formatDateTime(startDate, startTime), formatDateTime(endDate, endTime), personId);
    } else {
      alert("Please select both start and end dates.");
    }
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <div>
      <Navbaradmin />
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-indigo-700">
              Appointment
            </h1>
          </div>
        </header>
        <main>
          <div className="w-screen">
            <div className="relative mx-auto mt-10 mb-10 max-w-screen-lg overflow-hidden rounded-xl bg-indigo-700 py-32 text-center shadow-xl shadow-gray-300">
              <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">
                Book an appointment
              </h1>
              <p className="mt-6 text-lg text-white">
                Get an appointment with our experienced accountants
              </p>
              <img
                className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
            </div>
          </div>

          <div className="mx-auto grid max-w-screen-lg  pb-10">
            <p className=" text-xl font-bold text-blue-900">Select a date</p>
            <div className="relative mt-4">
              <DatePicker
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              />
            </div>
          </div>
          <div className="mx-auto grid max-w-screen-lg  pb-10">
            <p className="text-xl font-bold text-blue-900">เลือกเวลา</p>
            <div className="mt-4 grid grid-cols-2 gap-2 lg:max-w-xl">
              <div className="max-w-md mt-5">
                <div className="mb-1 block">
                  <Label htmlFor="เวลาเริ่มต้น" value="เวลาเริ่มต้น" />
                </div>
                <Select
                  id="เวลาเริ่มต้น"
                  required
                  onChange={handlestarttimeChange}
                >
                  <option value="-"> - </option>
                  <option value="9:00:00+07:00">9:00 น.</option>
                  <option value="10:00:00+07:00">10:00 น.</option>
                  <option value="11:00:00+07:00">11:00 น.</option>
                  <option value="13:00:00+07:00">13:00 น.</option>
                  <option value="14:00:00+07:00">14:00 น.</option>
                  <option value="15:00:00+07:00">15:00 น.</option>
                </Select>
              </div>
              <div className="max-w-md mt-5">
                <div className="mb-1 block">
                  <Label htmlFor="เวลาสิ้นสุด" value="เวลาสิ้นสุด" />
                </div>
                <Select
                  id="เวลาสิ้นสุด"
                  required
                  onChange={handleendtimeChange}
                >
                  <option value="-"> - </option>
                  <option value="9:00:00+07:00">9:00 น.</option>
                  <option value="10:00:00+07:00">10:00 น.</option>
                  <option value="11:00:00+07:00">11:00 น.</option>
                  <option value="13:00:00+07:00">13:00 น.</option>
                  <option value="14:00:00+07:00">14:00 น.</option>
                  <option value="15:00:00+07:00">15:00 น.</option>
                </Select>
              </div>
            </div>
            <div className="text-center">
              <Button className="mt-7 bg-indigo-700" onClick={submit}>Submit</Button>
            </div>
          </div>

          <div>
            <h1>{startDate ? formatDateTime(startDate, startTime) : ""}</h1>
          </div>
        </main>
      </div>
    </div>
  );
}
