"use client";
import * as React from "react";
import { Button, Card, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import axios from "axios";
import moment from 'moment-timezone';
import { Navbaradmin } from "../component/Navbaradmin";
import  loading  from "../loading"

type Props = {};

interface details {
  details_consultation: string
  start_datetime: string
}

export default function Page({ }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [informationUsers, setInformationUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const nowInThailand = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');
  const [pastDetail, setPastDetail] = useState("")

  async function informationUser(selectedDate: Date) {
    const apiUrl = "/api/informationusers";
    try {
      const response = await axios.post(apiUrl, {
        date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "null",
      });
      setInformationUsers(response.data);
    } catch (error) {
      console.log("Can't get information users");
    }
  }

  async function detailUser(studentid: string, selectdete: string) {
    const apiUrl = "/api/informationusers";
    try {
      const response = await axios.put<details[]>(apiUrl, {
        studentid
      });
      const data = response.data

      for (let i = 0; i < data.length; i++) {
        if (data[i].start_datetime == selectdete) {
          setPastDetail(data[i + 1].details_consultation || '')
        }
      }

      // setPastDetail(response.data[1]?.details_consultation || '');
    } catch (error) {
      console.log("Can't get information users");
    }
  }

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      informationUser(selectedDate);
    }
  };

  const handleOpenModal2 = async (user: any) => {
    setSelectedUser(user);
    await detailUser(user.studentid, user.start_datetime);
  };

  const handleCloseModal2 = () => {
    setSelectedUser(null);
    setPastDetail("");
  };

  React.useEffect(() => {
    informationUser(new Date(nowInThailand))
  }, [])

  return (
    <div>
      <Navbaradmin />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            รายการนัด
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-row mt-7 gap-7">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                color={"gray"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                  "bg-neutral-100 hover:bg-cyan-300 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelectDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {informationUsers.length === 0 ? (
          <h5 className="mt-11 mb-4 p-4 relative text-center text-xl font-bold">วันนี้ไม่มีรายการนัด</h5>
        ) : (
          informationUsers.map((user, index) => (
            <Card
              key={index}
              className="border-r-4 border-l-4 border-x-cyan-300 mt-11 mb-4 p-4 relative"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Time: {format(new Date(user.start_datetime), "HH:mm")} -{" "}
                {format(new Date(user.end_datetime), "HH:mm")}
              </h5>
              <hr />
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Name: {user.firstname_lastname}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Student ID: {user.studentid}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Major: {user.major}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                หัวข้อที่ต้องการพูดคุย : {user.topic}
              </p>
              <div className="flex flex-row gap-4 absolute bottom-4 right-4">
                <Button
                  outline
                  gradientDuoTone="cyanToBlue"
                  onClick={() => handleOpenModal2(user)}
                >
                  Details
                </Button>
                <Button
                  gradientMonochrome="failure"
                  onClick={() => setOpenModal(true)}
                >
                  Cancel
                </Button>
              </div>
              <Modal
                show={openModal}
                size="md"
                onClose={() => setOpenModal(false)}
                popup
              >
                <Modal.Header />
                <Modal.Body>
                  <div className="text-center">
                    <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete this product?
                    </h3>
                    <div className="flex justify-center gap-4">
                      <Button color="failure" onClick={() => setOpenModal(false)}>
                        {"Yes, I'm sure"}
                      </Button>
                      <Button color="gray" onClick={() => setOpenModal(false)}>
                        No, cancel
                      </Button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </Card>
          ))
        )}

        {selectedUser && (
          <Modal dismissible show={!!selectedUser} onClose={handleCloseModal2}>
            <Modal.Header>รายละเอียดการปรึกษา</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  บันทึกการปรึกษาก่อนหน้านี้ : {pastDetail || '-'}
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button gradientMonochrome="failure" onClick={handleCloseModal2}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
}
