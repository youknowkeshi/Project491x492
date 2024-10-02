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
import { CalendarDays, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import moment from "moment-timezone";
import { Modal } from "flowbite-react";
import { Button } from "@/components/ui/button";

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
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(
    undefined
  );
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [unavailableSlotsByDay, setUnavailableSlotsByDay] = useState<{
    [key: string]: string[];
  }>({});
  const [currentTime, setCurrentTime] = useState("");
  const [message, setMessage] = useState("");
  const nowInThailand = moment().tz("Asia/Bangkok");

  //show eror that not register
  const [checkPhone, setCheckPhone] = useState("");
  const [checkMajor, setCheckMajor] = useState("");
  const [checkGender, setCheckGender] = useState("");
  const [checkFacebookurl, setCheckFacebookUrl] = useState("");
  const [checkGradeLevel, setCheckGradeLevel] = useState("");

  //show eror that not register
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [showModalAppointmented, setShowModalAppointmented] = useState(false);
  const handleShowAppointmented = () => setShowModalAppointmented(true);
  const handleCloseAppointmented = () => setShowModalAppointmented(false);
  const [checkAppointmented, setCheckAppointmented] = useState(false);

  const freeTimeSlots: string[] = [
    "09:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
  ];

  async function getEvents() {
    const apiUrl = 'https://entaneermindbackend.onrender.com/api/admin/gettimeroom';
    try {
        const response = await axios.get(apiUrl);
        const rows: EventRow[] = response.data;

        const slotsByDay: { [key: string]: string[] } = {};

        rows.forEach((event) => {
            const startDateTime = event.start_datetime;
            const endDateTime = event.end_datetime;

            if (startDateTime && endDateTime) {
                const date = startDateTime.substring(0, 10); // Extract the date part (YYYY-MM-DD)
                const start = moment(startDateTime).startOf('hour');
                const end = moment(endDateTime); // Do not round end time

                const hours = [];
                for (let m = start; m.isBefore(end); m.add(1, 'hour')) {
                    hours.push(m.format('HH:mm'));
                }

                // Check if the last hour slot is within the end time and not after it
                if (start.isBefore(end) && start.format('HH:mm') !== end.format('HH:mm')) {
                    hours.push(end.startOf('hour').format('HH:mm'));
                }

                if (!slotsByDay[date]) {
                    slotsByDay[date] = [];
                }

                hours.forEach(hour => {
                    const nextHour = moment(hour, 'HH:mm').add(1, 'hour');
                    if (nextHour.isSameOrBefore(end)) {
                        slotsByDay[date].push(`${hour} - ${nextHour.format('HH:mm')}`);
                    }
                });
            }
        });

        const newUnavailableSlotsByDay: { [key: string]: string[] } = {};

        for (const date in slotsByDay) {
            if (slotsByDay[date].length > 0) {
                newUnavailableSlotsByDay[date] = slotsByDay[date];
            }
        }

        // console.log(newUnavailableSlotsByDay);
        
        setUnavailableSlotsByDay(newUnavailableSlotsByDay);

    } catch (error) {
        console.error("Can't get events: ", error);
    }
}



  async function AddTimeAppointment(
    start_datetime: string,
    end_datetime: string,
    personid: string,
    topic: string
  ) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/appointment/addtimeappointment";
    try {
      await axios.post(apiUrl, {
        start_datetime,
        end_datetime,
        personid,
        topic,
      });
    } catch (error) {
      console.log("Can't post api conseling_room1 : ", error);
    }
  }

  async function AddAppointmentGoogle(
    description: string,
    startDateTime: string,
    endDateTime: string
  ) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/google/createevent";
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

  const isUnavailableTimeSlot = (
    timeSlot: string,
    selectedDate: Date | undefined
  ): boolean => {
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
      const [startHour, startMinute] = timeSlot.split(" - ")[0].split(":");
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
      checkregister(response.data.studentId);
      appointment(response.data.studentId);
      getPersonId(response.data.studentId);
    } catch (err) {
      console.log("This is error: ", err);
    }
  }

  async function checkregister(studentId: string) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/user/checkuser";

    try {
      const response = await axios.post(apiUrl, { studentId });


      // ตรวจสอบว่า response.data มีค่าหรือไม่และมีอาเรย์ที่มีสมาชิก
      if (response.data && response.data.length > 0) {
        const userData = response.data[0];
        setCheckPhone(userData.phone);
        setCheckMajor(userData.major);
        setCheckGender(userData.gender);
        setCheckFacebookUrl(userData.facebookurl);
        setCheckGradeLevel(userData.gradelevel);
      }
    } catch (error) {
      console.log("Can't check register users ", error);
    }
  }

  async function handleSubmit ()   {
    if (date && selectedTimeSlot && message) {
      const formattedDate = formatDate(date);
      const [startHour, startMinute] = selectedTimeSlot
        .split(" - ")[0]
        .split(":");
      const [endHour, endMinute] = selectedTimeSlot.split(" - ")[1].split(":");

      const start_datetime = `${formattedDate}T${startHour}:${startMinute}:00+07:00`;
      const end_datetime = `${formattedDate}T${endHour}:${endMinute}:00+07:00`;

      if (
        checkFacebookurl &&
        checkGender &&
        checkGradeLevel &&
        checkMajor &&
        checkPhone
      ) {


        if (checkAppointmented) {
          await handleShowAppointmented();
        } else {
          
          await AddTimeAppointment(start_datetime, end_datetime, personId, message);
          await AddAppointmentGoogle(message, start_datetime, end_datetime);
          await fetchEvents()
          await setIsConfirmationModalOpen(true);
          


        }
      } else {
        await handleShow();
      }
    }
  };

  const appointment = async (studentid: string) => {
    const currentDateTime = new Date();
    try {
      const response = await axios.put(
        "https://entaneermindbackend.onrender.com/api/appointment/checkappointment",
        { studentid }
      );
      // Check if response.data is null or undefined
      if (response.data && response.data.length > 0) {
        const latestApppoint = response.data[0].start_datetime || null;

        if (latestApppoint) {
          const appointmentDateTime = new Date(latestApppoint);
          if (appointmentDateTime > currentDateTime) {
            setCheckAppointmented(true);
          } else {
            setCheckAppointmented(false);
          }
        } else {
          setCheckAppointmented(false);
        }
      } else {
        // Handle the case where response.data is null or empty
        setCheckAppointmented(false);
      }
    } catch (error) {
      console.log("Can't get appointment", error);
    }
  };

  function getPersonId(studentId: string) {
    axios
      .post("https://entaneermindbackend.onrender.com/api/user/checkuser", { studentId })
      .then((response) => {
        setPersonId(response.data[0].personid);
      })
      .catch((error) => console.log("getPersonId fail: ", error));
  }

  const fetchEvents = async () => {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/google/events";

    try {
      await axios.get(apiUrl);
    } catch (error) {
      console.error(
        "Oh no! An error has arisen from the depths of the internet:",
        error
      );
    }
  };

  useEffect(() => {
    getdatausers();
    getEvents();
    setCurrentTime(nowInThailand.format("YYYY-MM-DD HH:mm:ss"));
  }, []);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="mt-5 text-white border-[#FFFFFF] bg-[#8FC1E3]"
            type="button"
          >
            จองคิวนัดปรึกษาที่ห้อง {room}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90%] max-h-[80vh] p-4">
          <DialogHeader>
            <DialogTitle>จองนัดรับบริการ</DialogTitle>
            <DialogDescription>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-3 items-baseline">
                  <h2 className="flex gap-2 mt-2 mb-1">
                    <CalendarDays className="text-primary h-5 w-5" />
                    เลือกวัน
                  </h2>
                  <div>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(day) =>
                        isPastDay(day) || isWeekend(day) || isFullyBooked(day)
                      }
                      className="border rounded-lg"
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <div className="mt-1 md:mt-0">
                    <h2 className="flex gap-2 items-center mb-3">
                      <Clock className="text-primary h-5 w-5" />
                      เลือกเวลา
                    </h2>
                    <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                      {freeTimeSlots.map((timeSlot, index) => {
                        const isAvailable = !isUnavailableTimeSlot(
                          timeSlot,
                          date
                        );

                        return (
                          <h2
                            onClick={() =>
                              isAvailable && setSelectedTimeSlot(timeSlot)
                            }
                            className={`grid p-2 border rounded-lg justify-items-center cursor-pointer ${selectedTimeSlot === timeSlot
                              ? "bg-green-500 text-white"
                              : !isAvailable
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : ""
                              }`}
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
                      <Label htmlFor="message-2">หัวข้อที่ต้องการพูดคุย</Label>
                      <Textarea
                        className="mt-3"
                        placeholder="รายละเอียด..."
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
              <Button className="text-red-500 border-red-500 hover:bg-[#ffffff] " type="button" variant="outline"  >
                ปิด
              </Button>
            </DialogClose>

            <Button
              className="bg-blue-500 text-white border-blue-500"
              type="button"
              disabled={!(date && selectedTimeSlot && message)}
              onClick={handleSubmit}
            >
              ยืนยัน
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {isConfirmationModalOpen && (
        <Dialog
          open={isConfirmationModalOpen}
          onOpenChange={setIsConfirmationModalOpen}
        >
          <DialogContent className="max-w-[90%] max-h-[80vh] p-4">
            <DialogHeader>
              <DialogTitle>ยืนยันนัดหมาย</DialogTitle>
              <DialogDescription>
                คุณได้ทำการนัดรับบริการวันที่{" "}
                {date?.toLocaleDateString()} at {selectedTimeSlot}.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-end">
              <Link href="/profile">
                <Button
                  className="bg-blue-500 text-white border-blue-500"
                  type="button"
                >
                  ยืนยัน
                </Button>
              </Link>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      <Modal dismissible show={!!showModal} onClose={handleClose}>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              คุณต้องลงทะเบียนที่หน้า ลงทะเบียน ก่อนจึงจำทำการนัดหมายได้
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            // gradientMonochrome="failure"
            onClick={handleClose}
          >
            ปิด
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
            ปิด
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default BookAppointment;
