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
import {
  Modal
} from "flowbite-react";
import { log } from "console";

interface Appointment {
  firstname_lastname: string;
  studentid: string;
  start_datetime: string;
  end_datetime: string;
  room: string;
  event_id: string;
}




//วันปัจจุบันถ้าไม่ว่างเเล้ววันที่ไม่ปิด เเต่ถ้าจองจน SlotTime เต็มจะกดไม่ได้
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
  const [message, setMessage] = useState("");
  const nowInThailand = moment().tz('Asia/Bangkok');

  //show eror that not register
  const [checkPhone, setCheckPhone] = useState('');
  const [checkMajor, setCheckMajor] = useState('');
  const [checkGender, setCheckGender] = useState('');
  const [checkFacebookurl, setCheckFacebookUrl] = useState('');
  const [checkGradeLevel, setCheckGradeLevel] = useState("");

  //show eror that not register
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [showModalAppointmented, setShowModalAppointmented] = useState(false);
  const handleShowAppointmented = () => setShowModalAppointmented(true);
  const handleCloseAppointmented = () => setShowModalAppointmented(false);
  const [checkAppointmented, setCheckAppointmented] = useState(false)



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
          const start = moment(startDateTime);
          const end = moment(endDateTime);

          const hours = [];
          for (let m = start; m.isBefore(end); m.add(1, 'hours')) {
            hours.push(m.format('HH:mm'));
          }

          if (!slotsByDay[date]) {
            slotsByDay[date] = [];
          }

          hours.forEach(hour => slotsByDay[date].push(`${hour} - ${moment(hour, 'HH:mm').add(1, 'hours').format('HH:mm')}`));
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

  async function AddTimeAppointment(start_datetime: string, end_datetime: string, personid: string, topic: string) {
    const apiUrl = "http://localhost:3000/api/conseling_room1";
    try {
      await axios.post(apiUrl, { start_datetime, end_datetime, personid, topic });
    } catch (error) {
      console.log("Can't post api conseling_room1 : ", error);
    }
  }

  async function AddAppointmentGoogle(description: string, startDateTime: string, endDateTime: string) {
    const apiUrl = "http://localhost:3000/api/createevents";
    try {
      await axios.post(apiUrl, { description, startDateTime, endDateTime });
    } catch (error) {
      console.log("Can't add appointment to googlecalendar : ", error);
    }
  }

  const isPastDay = (day: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day < today;
  };

  const isWeekend = (day: Date) => {
    const dayOfWeek = day.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
  };

  const isFullyBooked = (day: Date) => {
    const formattedDate = formatDate(day);
    const slots = unavailableSlotsByDay[formattedDate];
    return slots && slots.length >= freeTimeSlots.length;
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

  async function getdatausers() {
    try {
      const response = await axios.get("/api/register");
      const studentId = response.data.studentId
      checkregister(studentId);
      appointment(studentId);
    } catch (err) {
      console.log("This is error: ", err);
    }
  }

  async function checkregister(studentId: string) {
    const apiUrl = "http://localhost:3000/api/register"

    try {
      const response = await axios.post(apiUrl, { studentId });

      setCheckPhone(response.data.data[0].phone)
      setCheckMajor(response.data.data[0].major)
      setCheckGender(response.data.data[0].gender)
      setCheckFacebookUrl(response.data.data[0].facebookurl)
      setCheckGradeLevel(response.data.data[0].gradelevel)

    } catch (error) {
      console.log("Can't check resgister users ", error);
    }
  }

  const handleSubmit = () => {
    if (date && selectedTimeSlot && message) {
      const formattedDate = formatDate(date);
      const [startHour, startMinute] = selectedTimeSlot.split(' - ')[0].split(':');
      const [endHour, endMinute] = selectedTimeSlot.split(' - ')[1].split(':');

      const start_datetime = `${formattedDate}T${startHour}:${startMinute}:00+07:00`;
      const end_datetime = `${formattedDate}T${endHour}:${endMinute}:00+07:00`;

      if (checkFacebookurl && checkGender && checkGradeLevel && checkMajor && checkPhone) {

        if (checkAppointmented) {
          handleShowAppointmented()
        } else {
          AddTimeAppointment(start_datetime, end_datetime, personId, message);
          AddAppointmentGoogle(message, start_datetime, end_datetime);
          setIsConfirmationModalOpen(true);
        }

      } else {
        handleShow()
      }

    }
  };

  const appointment = async (studentid: string) => {
    try {
      const response = await axios.put('http://localhost:3000/api/appointment', { studentid });
      const len = response.data.length - 1
      const latestApppoint = response.data[len].start_datetime
      checkLatestAppointment(latestApppoint)

    } catch (error) {
      console.log("Can't get appointment", error);
    }
  };

  function getPersonId() {
    axios.get('http://localhost:3000/api/checkdata')
      .then(response => {
        const personId = response.data.temp.personid;
        setPersonId(personId);
      })
      .catch(error => console.log("getPersonId fail: ", error));
  }

  const checkLatestAppointment = (appointments: string) => {
    const currentDateTime = new Date();

    const appointmentDateTime = new Date(appointments);
    if (appointmentDateTime > currentDateTime) {
      setCheckAppointmented(false)
    }
    setCheckAppointmented(true)
  };


  useEffect(() => {
    getPersonId();
    getEvents();
    getdatausers();
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
                      disabled={day => isPastDay(day) || isWeekend(day) || isFullyBooked(day)}
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
                      <Textarea
                        className="mt-3"
                        placeholder="Type your message here."
                        id="message-2"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />
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
              disabled={!(date && selectedTimeSlot && message)}
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


      <Modal
        dismissible
        show={!!showModal}
        onClose={handleClose}
      >
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              คุณต้องลงทะเบียนที่หน้า register ก่อนจึงจำทำการนัดหมายได้
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            // gradientMonochrome="failure"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <Modal
        dismissible
        show={!!showModalAppointmented}
        onClose={handleCloseAppointmented}
      >
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              คุณได้ทำการนัดหมายไปเเล้ว หากต้องการเปลี่ยนกรุณากดยกเลิกนัดก่อน
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            // gradientMonochrome="failure"
            onClick={handleCloseAppointmented}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookAppointment;
