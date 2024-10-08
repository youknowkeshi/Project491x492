"use client";

import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import moment from "moment-timezone";
import Loading from "../loading";
import { Modal } from "flowbite-react";

interface Appointment {
  firstname_lastname: string;
  studentid: string;
  start_datetime: string;
  end_datetime: string;
  room: string;
  event_id: string;
}

function BookingList() {
  const router = useRouter();
  const [personId, setPersonId] = useState("");
  const [make_An_Appointment, setMake_An_Appointment] = useState<Appointment[]>(
    []
  );
  const [showModal, setShowModal] = useState(false);
  const handleShow = async () => {
    // await fetchEvents();
    // await fetchEvents2();
    await setShowModal(true);
  }

  const handleClose = () => setShowModal(false);

  const [idcancel, setidcancel] = useState("");
  const [startCancle, setStartCancle] = useState("");
  const [endCancle, setEndCancle] = useState("");
  const [roomCancle, setRoomCancle] = useState("");

  const [isLoading, setIsLoading] = useState(true);


  // const fetchEvents = async () => {
  //   const apiUrl = 'https://entaneermindbackend.onrender.com/api/google/events';
  //   try {
  //     await axios.get(apiUrl);
  //   } catch (error) {
  //     console.error('Oh no! An error has arisen from the depths of the internet:', error);
  //   }
  // };

  // const fetchEvents2 = async () => {
  //   const apiUrl = 'https://entaneermindbackend.onrender.com/api/google/events2';
  //   try {
  //     await axios.get(apiUrl);
  //   } catch (error) {
  //     console.error('Oh no! An error has arisen from the depths of the internet:', error);
  //   }
  // };

  const handleCancel = async (start_datetime: string, end_datetime: string, event_id: string, room: string) => {

    if (room === 'conseling_room1') {
      await GetEventIdCalendar(start_datetime, end_datetime, room);
      await DeleteEvents(event_id);
      await router.push("/appointment");
      // console.log("room1");
    } else if (room === "conseling_room2") {
      await GetEventIdCalendar2(start_datetime, end_datetime, room);
      await DeleteEvents2(event_id);
      await router.push("/appointment");
      // console.log("room2");

    }

  };

  const getPersonId = () => {
    axios
      .get("/api/checkdata")
      .then((response) => setPersonId(response.data.temp.studentid))
      .catch((error) => console.log("getPersonId failed: ", error));
  };

  const appointment1 = async (studentid: string) => {
    try {
      const response = await axios.put(
        "https://entaneermindbackend.onrender.com/api/appointment/listhistory",
        { studentid }
      );
      setMake_An_Appointment(response.data);
    } catch (error) {
      console.log("Can't get appointment", error);
    }
  };

  async function DeleteEvents(event_id: string) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/appointment/cancel";
    try {
      await axios.delete(apiUrl, {
        data: { event_id },
      });
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function DeleteEvents2(event_id: string) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/appointment2/cancel";
    try {
      await axios.delete(apiUrl, {
        data: { event_id },
      });
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function DeleteEventsCalendar(event_id: string) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/google/deleteevent";
    try {
      await axios.put(apiUrl, {
        event_id,
      });
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function DeleteEventsCalendar2(event_id: string) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/google/deleteevent2";
    try {
      await axios.put(apiUrl, {
        event_id,
      });
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function GetEventIdCalendar(
    start_datetime: string,
    end_datetime: string,
    room: string
  ) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/appointment/getidcalendar";
    try {
      const response = await axios.put(apiUrl, {
        start_datetime,
        end_datetime,
        room,
      });
      const eventsid = response.data[0].event_id;
      if (eventsid) {


        DeleteEventsCalendar(eventsid);
      }
    } catch (error) {
      console.log("Can't GET EventId ", error);
    }
  }

  async function GetEventIdCalendar2(
    start_datetime: string,
    end_datetime: string,
    room: string
  ) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/appointment2/getidcalendar";
    try {
      const response = await axios.put(apiUrl, {
        start_datetime,
        end_datetime,
        room,
      });
      const eventsid = response.data[0].event_id;
      if (eventsid) {
        DeleteEventsCalendar2(eventsid);
      }
    } catch (error) {
      console.log("Can't GET EventId ", error);
    }
  }



  useEffect(() => {
    getPersonId();
  }, []);

  useEffect(() => {
    if (personId) {
      appointment1(personId);
      setIsLoading(false);
    }
    console.log(roomCancle);

  }, [personId, startCancle, endCancle, idcancel, roomCancle]);

  const isCurrentAppointment = (start_datetime: string) => {
    const now = new Date();
    const appointmentDate = new Date(start_datetime);
    return now.toISOString() === appointmentDate.toISOString();
  };

  if (isLoading) {
    return <Loading />; // Loading message or spinner
  }

  return (
    <Card className="relative">
      {make_An_Appointment.length === 0 ? (
        <div
          role="status"
          className="space-y-8 animate-pulse md:space-y-0 md:space-x-8 rtl:space-x-reverse md:flex md:items-center"
        >
          <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded sm:w-96 dark:bg-gray-700">
            <svg
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>
          <div className="w-full">
            <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[480px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[460px] mb-2.5"></div>
            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
            <div> </div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        make_An_Appointment.map((appointment, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-center mb-5 border p-4 rounded-lg relative"
          >
            {appointment.room === "conseling_room1" ? (
              <img
              src="/Pop.png"
              alt="pop"
              className="w-1/2 md:w-1/4 lg:w-1/6 border rounded-lg md:ml-4"
            />
            ):(
              <img
              src="/psyco.jpg"
              alt="psyco"
              className="w-1/2 md:w-1/4 lg:w-1/6 border rounded-lg md:ml-4"
            />
            )}
            
            <div className="flex flex-col gap-4 p-5 text-center md:text-left">
              {appointment.room === "conseling_room1" ? (

                <h2 className="font-bold text-[18px]">
                  นักจิตวิทยาห้องที่ 1 (พี่ป็อป)
                </h2>
              ) : (
                <h2 className="font-bold text-[18px]">นักจิตวิทยาห้องที่ 2</h2>
              )}
              <h2>Room: {appointment.room}</h2>
              <h2>
                Time: {new Date(appointment.start_datetime).toLocaleTimeString()}{" "}
                - {new Date(appointment.end_datetime).toLocaleTimeString()}
              </h2>
              <h2>
                Appointment:{" "}
                {new Date(appointment.start_datetime).toLocaleDateString()}
              </h2>
            </div>
            {new Date(moment(appointment.start_datetime).format('YYYY/MM/DD')) >= new Date(moment().tz('Asia/Bangkok').format('YYYY/MM/DD')) ? (
              !isCurrentAppointment(appointment.start_datetime) && (
                <Button
                  type="primary"
                  danger
                  className="absolute bottom-4 right-4"
                  onClick={() => {
                    setidcancel(appointment.event_id);
                    setStartCancle(appointment.start_datetime)
                    setEndCancle(appointment.end_datetime)
                    setRoomCancle(appointment.room)
                    handleShow();
                  }}
                >
                  ยกเลิกนัด
                </Button>
              )
            ) : (
              index === 0 && !isCurrentAppointment(appointment.start_datetime) && (
                <Button
                  type="primary"
                  danger
                  className="absolute bottom-4 right-4"
                  disabled
                >

                </Button>
              )
            )}

            <Modal
              dismissible
              show={!!showModal}
            >
              <Modal.Body>
                <div className="space-y-6">
                  <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                    หากคุณต้องการยกเลิกนัดโปรดติดต่อ EntaneerMindFriendCMU ก่อน{" "}
                    <a
                      href="https://www.facebook.com/EntaneerMindFriendCMU"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 underline"
                    >
                      https://www.facebook.com/EntaneerMindFriendCMU
                    </a>
                  </p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  onClick={() => handleCancel(startCancle, endCancle, idcancel, roomCancle)}

                >
                  ยืนยัน
                </Button>
                <Button onClick={handleClose}>ปิด</Button>
              </Modal.Footer>
            </Modal>
          </div>
        ))
      )}
    </Card>
  );

}

export default BookingList;
