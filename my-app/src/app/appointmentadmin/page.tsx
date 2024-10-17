"use client";
import React, { useEffect, useState } from "react";
import { Navbaradmin } from "../component/Navbaradmin";
import { DatePicker } from "./datepicker";
import { Button } from "@/components/ui/button";
import { Label, Select, TextInput } from "flowbite-react";
import axios from "axios";
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
import { Modal } from "flowbite-react";

type Props = {};

interface checktime {
  event_id: string
  start_datetime: string
  end_datetime: string
  room: string,
  personid: string
  topic: string
}

export default function Page({ }: Props) {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startTime, setStartTime] = useState("-");
  const [endTime, setEndTime] = useState("-");
  const [personId, setPersonId] = useState("");
  const [description, setDescription] = useState("");
  const [room, setRoom] = useState("-");
  const [checkTime, setCheckTime] = useState<checktime[]>([]);
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [showModalAppointmented, setShowModalAppointmented] = useState(false);
  const handleShowAppointmented = () => setShowModalAppointmented(true);
  const handleCloseAppointmented = () => setShowModalAppointmented(false);

  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

  const handlestarttimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStartTime(event.target.value);
  };

  const handleendtimeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEndTime(event.target.value);
  };

  const handleroomChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRoom(event.target.value);
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

  // async function getdata() {
  //   const apiurl = `/api/register`;
  //   const response = await axios.get(apiurl);
  //   const cmuAccount = response.data.cmuAccount;
  //   axios
  //     .put("http://10.10.12.95:3001/api/admin/checkadmin", { cmuAccount }).then((response) => {
  //       setPersonId(response.data[0].personid);
  //     });
  // }

  async function checkclosetimeslot(start_datetime: string, end_datetime: string, room: string) {
    const apiurl = `http://10.10.12.95:3001/api/admin/checkclosetimeslot`;

    try {
      const result = await axios.put(apiurl, { start_datetime, end_datetime, room });
      if (result.data && result.data.length > 0) {
        await setCheckTime(result.data);  // ใช้ result.data เพื่อใส่ข้อมูลลงใน setCheckTime
        handleShow()
      }else{
        setIsConfirmationModalOpen(true)
      }

    } catch (error) {
      console.error('Error checking time slot:', error);
    }
  }



  async function closetimeslot(start_datetime: string, end_datetime: string, room: string) {
    const apiurl = `http://10.10.12.95:3001/api/admin/closetimeslot`;
    axios.post(apiurl, { start_datetime, end_datetime, room });


  }

  async function AddAppointmentGoogle(
    description: string,
    startDateTime: string,
    endDateTime: string
  ) {
    const apiUrl = "http://10.10.12.95:3001/api/google/createevent";
    try {
      await axios.post(apiUrl, { description, startDateTime, endDateTime });
    } catch (error) {
      console.log("Can't add appointment to googlecalendar : ", error);
    }
  }

  async function AddAppointmentGoogle2(
    description: string,
    startDateTime: string,
    endDateTime: string
  ) {
    const apiUrl = "http://10.10.12.95:3001/api/google/createevent2";
    try {
      await axios.post(apiUrl, { description, startDateTime, endDateTime });
    } catch (error) {
      console.log("Can't add appointment to googlecalendar : ", error);
    }
  }

  const fetchEvents = async () => {
    const apiUrl = "http://10.10.12.95:3001/api/google/events";

    try {
      const reuslut =await axios.get(apiUrl);

      
    } catch (error) {
      console.error(
        "Oh no! An error has arisen from the depths of the internet:",
        error
      );
    }
  };

  const fetchEvents2 = async () => {
    const apiUrl = "http://10.10.12.95:3001/api/google/events2";

    try {
      await axios.get(apiUrl);
    } catch (error) {
      console.error(
        "Oh no! An error has arisen from the depths of the internet:",
        error
      );
    }
  };

  async function handleSubmit() {
    if (startDate && endDate && startTime && endTime && room && description) {
      checkclosetimeslot(formatDateTime(startDate, startTime), formatDateTime(endDate, endTime), room)
      
    } else {
      handleShowAppointmented();
    }
  };

  const submit = async () => {
    setLoading(true)
    if (room == 'conseling_room1') {
      if (startDate && endDate) {
        // await closetimeslot(formatDateTime(startDate, startTime), formatDateTime(endDate, endTime), room);
        await AddAppointmentGoogle(description, formatDateTime(startDate, startTime), formatDateTime(endDate, endTime))
        await fetchEvents()
        setLoading(false)
        await window.location.reload();
      } else {
        alert("Please select both start and end dates.");
      }
    } else if (room == 'conseling_room2') {
      if (startDate && endDate) {
        // await closetimeslot(formatDateTime(startDate, startTime), formatDateTime(endDate, endTime), room);
        await AddAppointmentGoogle2(description, formatDateTime(startDate, startTime), formatDateTime(endDate, endTime))
        await fetchEvents2()
        setLoading(false)
        await window.location.reload();
      } else {
        alert("Please select both start and end dates.");
      }
      
    } else {
      alert("Please select room.");
    }
    
  }

  const isCurrentAppointment = (start_datetime: string) => {
    const [date, timeWithZone] = start_datetime.split('T');
    const time = timeWithZone.substring(0, 5); 
    const formattedTime = time.startsWith('0') ? time.slice(1) : time;
    const finalTime = formattedTime.endsWith(':') ? formattedTime.slice(0, -1) : formattedTime;

    return `${date} ${finalTime}`;
  };

  // useEffect(() => {
  //   if (startDate && endDate) {
  //     checkclosetimeslot(formatDateTime(startDate, startTime), formatDateTime(endDate, endTime), room)
  //   }
  // }, []);
  // useEffect(() => {
  //   getdata();
  // }, [personId]);

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

          {isConfirmationModalOpen && (
            <Dialog
              open={isConfirmationModalOpen}
              onOpenChange={setIsConfirmationModalOpen}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>ปิดรับบริการ</DialogTitle>
                  <DialogDescription>
                    คุณได้เลือกการปิดรับบริการวันที่{"  "}
                    {startDate && (isCurrentAppointment(formatDateTime(startDate, startTime)))} 
                    {"  "} จนถึงวันที่ {endDate && (isCurrentAppointment(formatDateTime(endDate, endTime)))}
                    {/* {date?.toLocaleDateString()} at {selectedTimeSlot}. */}
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="sm:justify-end">
                  <Button
                    className="bg-blue-500 text-white border-blue-500 mt-4"
                    type="button"
                    disabled={loading} // ปิดปุ่มเมื่อกำลังโหลด
                    onClick={submit}
                  >
                    {loading ? "กำลังประมวลผล..." : "ยืนยัน"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}

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
                  <option value="12:00:00+07:00">12:00 น.</option>
                  <option value="14:00:00+07:00">14:00 น.</option>
                  <option value="15:00:00+07:00">15:00 น.</option>
                  <option value="16:00:00+07:00">16:00 น.</option>
                </Select>
              </div>
            </div>

            <div className="max-w-md mt-1">
              <div className="mb-1 block">
                <Label htmlFor="ห้องที่ต้องการปิด" value="ห้องที่ต้องการปิด" />
              </div>
              <Select
                id="ห้องที่ต้องการปิด"
                required
                onChange={handleroomChange}
              >
                <option value="-"> - </option>

                <option value="conseling_room1">ห้องที่ 1</option>
                <option value="conseling_room2">ห้องที่ 2</option>

              </Select>
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
              <Button className="mt-7 bg-indigo-700" onClick={handleSubmit}>Submit</Button>
            </div>
          </div>

          <Modal dismissible show={!!showModal} onClose={handleClose}>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  คุณมีนัดให้ปรึกษาในเวลาที่เลือกปิดรับบริการให้คำปรึกษาโปรดแจ้งให้ผู้รับบริการทราบก่อนที่จะยกเลิกนัด
                  <p>โดยมีจำนวนนัด : {checkTime.length}</p>
                  {checkTime.length > 0 && (
                    <ul>
                    {checkTime.slice(0, 10).map((time, index) => (
                      <li key={index}>
                        <strong>วันเวลา : </strong> {isCurrentAppointment(time.start_datetime)}
                      </li>
                    ))}
                    {checkTime.length > 10 && <li>และรายการอื่น</li>}
                  </ul>
                  )}
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button
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
                  โปรดกรอกรายละเอียดให้ครบถ้วน
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

        </main>
      </div>
    </div>
  );
}
