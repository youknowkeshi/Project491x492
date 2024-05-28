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

function BookAppointment({room}:{room : any}) {
  interface TimeSlot {
    time: string;
  }

  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [timeSlot, setTimeSlot] = React.useState<TimeSlot[] | undefined>(
    undefined
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = React.useState<
    string | undefined
  >(undefined);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] =
    React.useState(false);

  const isPastDay = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  React.useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList: TimeSlot[] = [];
    for (let i = 9; i <= 15; i++) {
      const time = `${i}:00 AM`;
      if (time !== "12:00 AM") {
        timeList.push({ time });
      }
    }
    setTimeSlot(timeList);
  };

  const handleSubmit = () => {
    setIsConfirmationModalOpen(true);
  };

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
                    <CalendarDays className="text-primary h-5 w-5 " />
                    Select Date
                  </h2>
                  <div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(day) => isPastDay(day)}
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
                        timeSlot.map((item, index) => (
                          <h2
                            onClick={() => setSelectedTimeSlot(item.time)}
                            className={`grid p-2 border rounded-lg justify-items-center cursor-pointer ${
                              selectedTimeSlot === item.time
                                ? "bg-green-500 text-white"
                                : ""
                            }`}
                            key={index}
                          >
                            {item.time}
                          </h2>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end">
            <DialogClose asChild>
              <Button
                className="text-red-500 border-red-500"
                type="button"
                variant="outline"
              >
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
        <Dialog
          open={isConfirmationModalOpen}
          onOpenChange={setIsConfirmationModalOpen}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmation</DialogTitle>
              <DialogDescription>
                Your appointment has been booked for{" "}
                {date?.toLocaleDateString()} at {selectedTimeSlot}.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
              <Link href="/profile">
                <Button
                  className="bg-blue-500 text-white border-blue-500"
                  type="button"
                >
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
