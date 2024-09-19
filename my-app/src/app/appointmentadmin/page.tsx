"use client";
import React, { useEffect, useState } from "react";
import { Navbaradmin } from "../component/Navbaradmin";
import { DatePicker } from "./datepicker";
import { Button } from "@/components/ui/button";
import { Label, Select, TextInput } from "flowbite-react";
import axios from "axios";

type Props = {};

export default function Page({ }: Props) {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState("-");
  const [endTime, setEndTime] = useState("-");
  const [personId, setPersonId] = useState("");
  const [description, setDescription] = useState("");

  const handlestarttimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTime(event.target.value);
  };

  const handleendtimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(event.target.value);
  };

  const handledescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
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
    const cmuAccount = response.data.cmuAccount;
    axios
      .put("http://localhost:3001/api/admin/checkadmin", { cmuAccount }).then((response) => {        
        setPersonId(response.data[0].personid);
      });
  }

  async function closetimeslot(start_datetime: string, end_datetime: string, personid: string) {
    const apiurl = `http://localhost:3001/api/admin/closetimeslot`;
    axios.post(apiurl, { start_datetime, end_datetime, personid });
  }

  async function AddAppointmentGoogle(
    description: string,
    startDateTime: string,
    endDateTime: string
  ) {
    const apiUrl = "http://localhost:3001/api/google/createevent";
    try {
      await axios.post(apiUrl, { description, startDateTime, endDateTime });
    } catch (error) {
      console.log("Can't add appointment to googlecalendar : ", error);
    }
  }

  const submit = () => {
    if (startDate && endDate) {
      closetimeslot(formatDateTime(startDate, startTime), formatDateTime(endDate, endTime), personId);
      AddAppointmentGoogle(description,formatDateTime(startDate, startTime), formatDateTime(endDate, endTime))
      window.location.reload();
    } else {
      alert("Please select both start and end dates.");
    }
  }

  useEffect(() => {
    getdata();
  }, [personId]);

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
          <div className="mx-auto grid max-w-screen-lg  pb-10 mt-10">
            <p className=" text-xl font-bold text-blue-900">เลือกวัน</p>
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
              <div className="max-w-md mt-1">
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
              <div className="max-w-md mt-1">
                <div className="mb-1 block">
                  <Label htmlFor="เวลาสิ้นสุด" value="เวลาสิ้นสุด" />
                </div>
                <Select
                  id="เวลาสิ้นสุด"
                  required
                  onChange={handleendtimeChange}
                >
                  <option value="-"> - </option>
                  
                  <option value="10:00:00+07:00">10:00 น.</option>
                  <option value="11:00:00+07:00">11:00 น.</option>
                  <option value="13:00:00+07:00">13:00 น.</option>
                  <option value="14:00:00+07:00">14:00 น.</option>
                  <option value="15:00:00+07:00">15:00 น.</option>
                  <option value="16:00:00+07:00">16:00 น.</option>
                </Select>
              </div>
            </div>

            <div className="max-w-md mt-3 ">
              <Label value="รายละเอียดการปิดนัด" />
            </div>

            <div className="mt-2 grid grid-cols-2 gap-5">
              <TextInput
                id="input-gray"
                placeholder="รายละเอียด"
                required
                color="gray"
                value={description}
                onChange={handledescriptionChange}
              />

            </div>
            <div className="text-center">
              <Button className="mt-7 bg-indigo-700" onClick={submit}>Submit</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
