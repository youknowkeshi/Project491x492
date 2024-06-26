"use client";
import * as React from "react";
import Nav from "../component/Nav";
import { Button, Card } from "flowbite-react";
import { Modal } from "flowbite-react";
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

type Props = {};

export default function Page({ }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const [openModal2, setOpenModal2] = useState(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [informationUsers, setInformationUsers] = useState<any[]>([]);

  async function informationUser(selectedDate: Date) {
    const apiUrl = "http://localhost:3000/api/informationusers";
    try {
      const response = await axios.post(apiUrl, { date: 
        selectedDate ? format(selectedDate, "yyyy-MM-dd") : 'null'
      });
      setInformationUsers(response.data);
    } catch (error) {
      console.log("Can't get information users");
    }
  }

  const displayDate = date ? format(date, "yyyy-MM-dd") : 'null';

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      informationUser(selectedDate);
    }
  };

  return (
    <div>
      <Nav />
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

      {informationUsers.map((user, index) => (
        <Card key={index} className="border-r-4 border-l-4 border-x-cyan-300 mt-7 mb-4 p-4 relative">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Time: {format(new Date(user.start_datetime), "HH:mm")} - {format(new Date(user.end_datetime), "HH:mm")}
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
          <div className="flex flex-row gap-4 absolute bottom-4 right-4">
            <Button
              outline
              gradientDuoTone="cyanToBlue"
              onClick={() => setOpenModal2(true)}
            >
              Details
            </Button>
            <Modal
              dismissible
              show={openModal2}
              onClose={() => setOpenModal2(false)}
            >
              <Modal.Header>Talk details</Modal.Header>
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    With less than a month to go before the European Union enacts
                    new consumer privacy laws for its citizens, companies around
                    the world are updating their terms of service agreements to
                    comply.
                  </p>
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    The European Union’s General Data Protection Regulation
                    (G.D.P.R.) goes into effect on May 25 and is meant to ensure a
                    common set of data rights in the European Union. It requires
                    organizations to notify users as soon as possible of high-risk
                    data breaches that could personally affect them.
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  gradientMonochrome="failure"
                  onClick={() => setOpenModal2(false)}
                >
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
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
      ))}
    </div>
  );
}
