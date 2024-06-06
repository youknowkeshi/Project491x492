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

function BookAppointment({ room }: { room: any }) {
  interface TimeSlot {
    time: string;
  }

  interface EventRow {
    start_datetime: string;
    end_datetime: string;
  }

  type DateParts = {
    date: string;
    time: string;
  };
  
  interface DataandTime {
    data: string;
    time: string; 
  }

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = useState<TimeSlot[] | undefined>(undefined);
  const [personId, setPersonId] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [unavailableDates, setUnavailableDates] = useState<Map<string, Set<string>>>(new Map());


  function splitDateTime(datetime: string): DateParts {
    const [date, time] = datetime.split('T');
    return { date, time };
  }

  async function getEvents() {
    const apiUrl = 'http://localhost:3000/api/events';
    try {
      const response = await axios.get(apiUrl);
      const rows: EventRow[] = response.data.result.rows;

      const dateToTimesMap = new Map<string, Set<string>>();

      rows.forEach(row => {
        const { date, time } = splitDateTime(row.start_datetime);

        console.log("Time",row.start_datetime);
        
        if (!dateToTimesMap.has(date)) {
          dateToTimesMap.set(date, new Set());
        }
        dateToTimesMap.get(date)?.add(time);
      });

      setUnavailableDates(dateToTimesMap);
    } catch (error) {
      console.log("Can't getEvent: ", error);
    }
  }

  const isPastDay = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  const isUnavailableDay = (day: Date) => {
    const dayWithOffset = new Date(day.getTime() - (day.getTimezoneOffset() * 60000)).toISOString();
    const formattedDate = dayWithOffset.split('T')[0];
  
    
    return unavailableDates.has(formattedDate);
  };

  const getTime = () => {
    const timeList: TimeSlot[] = [];
    for (let i = 10; i <= 15; i++) {
      const time = `${i}:00`;
      if (time !== "12:00") {
        timeList.push({ time });
      }
    }
    setTimeSlot(timeList);
  };

  const handleSubmit = () => {
    setIsConfirmationModalOpen(true);
  };

  function getpersonid() {
    axios.get('http://localhost:3000/api/checkdata')
      .then(response => setPersonId(response.data.temp.personid))
      .catch(error => console.log("getpersonid fail: ", error));
  }

  useEffect(() => {
    getpersonid();
    getEvents();
    getTime();
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
                      disabled={day => isPastDay(day) || isUnavailableDay(day)}
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
                      {timeSlot &&
                        timeSlot.map((item, index) => {
                          const formattedDate = date?.toISOString().split('T')[0] || "";
                          const isUnavailable = unavailableDates.get(formattedDate)?.has(item.time);

                          return (
                            <h2
                              onClick={() => !isUnavailable && setSelectedTimeSlot(item.time)}
                              className={`grid p-2 border rounded-lg justify-items-center cursor-pointer ${selectedTimeSlot === item.time
                                ? "bg-green-500 text-white"
                                : isUnavailable
                                  ? "bg-red-500 text-white cursor-not-allowed"
                                  : ""}`}
                              key={index}
                            >
                              {item.time}
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
      {/* <p>{Array.from(unavailableDates.entries()).map(([key, value]) => `${key}: ${Array.from(value).join(', ')}`).join(' | ')}</p> */}
    </>
  );
}

export default BookAppointment;
