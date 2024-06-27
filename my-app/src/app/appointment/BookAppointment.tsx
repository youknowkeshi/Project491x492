"use client";
import * as React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarDays, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import moment from 'moment-timezone';

function BookAppointment({ room }: { room: any }) {
  interface EventRow {
    start_datetime: string;
    end_datetime: string;
  }

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [personId, setPersonId] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [unavailableSlotsByDay, setUnavailableSlotsByDay] = useState<{ [key: string]: string[] }>({});
  const [currentTime, setCurrentTime] = useState("");
  const nowInThailand = moment().tz('Asia/Bangkok');

  const freeTimeSlots: string[] = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
  ];

  async function getEvents() {
    const apiUrl = 'http://localhost:3000/api/events';
    try {
      const response = await axios.get(apiUrl);
      const rows: EventRow[] = response.data.result.rows;

      const slotsByDay: { [key: string]: string[] } = {};

      rows.forEach((event) => {
        const startDateTime = event.start_datetime;
        const endDateTime = event.end_datetime;

        if (startDateTime && endDateTime) {
          const date = startDateTime.substring(0, 10); // Extract the date part (YYYY-MM-DD)
          const start = startDateTime.substring(11, 16);
          const end = endDateTime.substring(11, 16);

          if (!slotsByDay[date]) {
            slotsByDay[date] = [];
          }

          slotsByDay[date].push(start + " - " + end);
        }
      });

      const newUnavailableSlotsByDay: { [key: string]: string[] } = {};

      for (const date in slotsByDay) {
        if (slotsByDay[date].length > 0) {
          newUnavailableSlotsByDay[date] = slotsByDay[date];
        }
      }

      setUnavailableSlotsByDay(newUnavailableSlotsByDay);

    } catch (error) {
      console.error("Can't get events: ", error);
    }
  }

  async function AddTimeAppointment(start_datetime:string, end_datetime:string, personid:string, topic:string) {
    const apiUrl = "http://localhost:3000/api/conseling_room1"
    try{
      const response = await axios.post(apiUrl,{start_datetime,end_datetime,personid,topic})
    }catch(error){
      console.log("Can't post api conseling_room1 : ",error);
      
    }
  }

  const isPastDay = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  const formatDate = (date: Date | undefined): string => {
    if (!date) {
      return "No date selected";
    }

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const isUnavailableTimeSlot = (timeSlot: string, selectedDate: Date | undefined): boolean => {
    if (!selectedDate) {
      return true; // ถ้าไม่ได้เลือกวันที่ก็ให้ถือว่าไม่สามารถใช้งานได้
    }

    const formattedDate = formatDate(selectedDate);
    const slots = unavailableSlotsByDay[formattedDate];

    if (slots && slots.includes(timeSlot)) {
      return true;
    }

    // Disable slots that are past the current time on the current date
    if (formattedDate === formatDate(new Date())) {
      const [startHour, startMinute] = timeSlot.split(' - ')[0].split(':');
      const slotDateTime = new Date(selectedDate);
      slotDateTime.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);

      const currentDateTime = new Date(currentTime);
      if (slotDateTime <= currentDateTime) {
        return true;
      }
    }

    return false;
  };

  const handleSubmit = () => {
    setIsConfirmationModalOpen(true);
  };

  function getPersonId() {
    axios.get('http://localhost:3000/api/checkdata')
      .then(response => setPersonId(response.data.temp.personid))
      .catch(error => console.log("getPersonId fail: ", error));
  }

  useEffect(() => {
    getPersonId();
    getEvents();
    setCurrentTime(nowInThailand.format('YYYY-MM-DD HH:mm:ss'));
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mt-5">Appointment {room}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Appointment</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3 items-baseline">
                  <h2 className="flex gap-2 mt-2 mb-1">
                    <CalendarDays className="text-primary h-5 w-5" />
                    Select Date
                  </h2>
                  <div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={day => isPastDay(day)}
                      className="border rounded-lg"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="mt-1 md:mt-0">
                    <h2 className="flex gap-2 items-center mb-3">
                      <Clock className="text-primary h-5 w-5" />
                      Select Time Slot
                    </h2>
                    <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                      {freeTimeSlots.map((timeSlot, index) => {
                        const isAvailable = !isUnavailableTimeSlot(timeSlot, date);

                        return (
                          <h2
                            onClick={() => isAvailable && setSelectedTimeSlot(timeSlot)}
                            className={`grid p-2 border rounded-lg justify-items-center cursor-pointer ${selectedTimeSlot === timeSlot
                              ? "bg-green-500 text-white"
                              : !isAvailable
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : ""}`}
                            key={index}
                          >
                            {timeSlot}
                          </h2>
                        );
                      })}
                    </div>
                  </div>
                  <div className="grid w-full gap-1.5">
                    <div className="mt-3">
                      <Label htmlFor="message-2">Your Message</Label>
                      <Textarea className="mt-3" placeholder="Type your message here." id="message-2" />
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button className="text-red-500 border-red-500" type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
            <Button
              className="bg-blue-500 text-white border-blue-500"
              type="button"
              disabled={!(date && selectedTimeSlot)}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isConfirmationModalOpen && (
        <Dialog open={isConfirmationModalOpen} onOpenChange={setIsConfirmationModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmation</DialogTitle>
              <DialogDescription>
                Your appointment has been booked for {date?.toLocaleDateString()} at {selectedTimeSlot}.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
              <Link href="/profile">
                <Button className="bg-blue-500 text-white border-blue-500" type="button">
                  Submit
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default BookAppointment;
