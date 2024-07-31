"use client";

import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";
import moment from 'moment-timezone';
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
  const [make_An_Appointment, setMake_An_Appointment] = useState<Appointment[]>([]);
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [idcancel,setidcancel] =useState("");

  const [isLoading, setIsLoading] = useState(true);


  const fetchEvents = async () => {
    const apiUrl = 'http://localhost:3000/api/events';
    try {
      await axios.post(apiUrl);
    } catch (error) {
      console.error('Oh no! An error has arisen from the depths of the internet:', error);
    }
  };

  const fetchEvents2 = async () => {
    const apiUrl = 'http://localhost:3000/api/events2';
    try {
      await axios.post(apiUrl);
    } catch (error) {
      console.error('Oh no! An error has arisen from the depths of the internet:', error);
    }
  };

  const handleCancel = async (start_datetime: string, end_datetime: string, event_id: string, room: string) => {
    fetchEvents();
    fetchEvents2();
    if (room === 'conseling_room1') {
      GetEventIdCalendar(start_datetime, end_datetime);
      await DeleteEvents(event_id);
    } else if (room === 'conseling_room2') {
      GetEventIdCalendar2(start_datetime, end_datetime);
      await DeleteEvents2(event_id);
    }
    await router.push("/appointment");
  };

  const getPersonId = () => {
    axios.get('/api/checkdata')
      .then(response => setPersonId(response.data.temp.studentid))
      .catch(error => console.log("getPersonId failed: ", error));
  };

  const appointment = async (studentid: string) => {
    try {
      const response = await axios.put('http://localhost:3001/api/appointment/listhistory', { studentid });
      setMake_An_Appointment(response.data);
    } catch (error) {
      console.log("Can't get appointment", error);
    }
  };

  async function DeleteEvents(event_id: string) {
    const apiUrl = "http://localhost:3001/api/appointment/cancel";
    try {
      await axios.delete(apiUrl, {
        data: { event_id }
      });
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function DeleteEvents2(event_id: string) {
    const apiUrl = "http://localhost:3001/api/appointment2/cancel";
    try {
      await axios.delete(apiUrl, {
        data: { event_id }
      });
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function DeleteEventsCalendar(event_id: string) {
    const apiUrl = "/api/createevents";
    try {
      await axios.put(apiUrl, {
        event_id
      });
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function DeleteEventsCalendar2(event_id: string) {
    const apiUrl = "/api/createevents2";
    try {
      await axios.put(apiUrl, {
        event_id
      });
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function GetEventIdCalendar(start_datetime: string, end_datetime: string) {
    const apiUrl = "http://localhost:3001/api/appointment/getidcalendar";
    try {
      const response = await axios.put(apiUrl, { start_datetime, end_datetime });
      const eventsid = response.data[0].event_id;
      if (eventsid) {
        DeleteEventsCalendar(eventsid);
      }
    } catch (error) {
      console.log("Can't GET EventId ", error);
    }
  }

  async function GetEventIdCalendar2(start_datetime: string, end_datetime: string) {
    const apiUrl = "http://localhost:3001/api/appointment2/getidcalendar";
    try {
      const response = await axios.put(apiUrl, { start_datetime, end_datetime });
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
      appointment(personId);
      setIsLoading(false);
    }
  }, [personId]);

  const isCurrentAppointment = (start_datetime: string) => {
    const now = new Date();
    const appointmentDate = new Date(start_datetime);
    return now.toISOString() === appointmentDate.toISOString();
  };

  if (isLoading) {
    return <Loading />; // Loading message or spinner
  }

  return (
    <Card className="mt-7 relative">
      {make_An_Appointment.map((appointment, index) => (
        <div key={index} className="flex flex-col md:flex-row items-center mb-5 border p-4 rounded-lg relative">
          <img
            src="/Pop.png"
            alt="pop"
            className="w-1/2 md:w-1/4 lg:w-1/6 border rounded-lg md:ml-4"
          />
          <div className="flex flex-col gap-4 p-5 text-center md:text-left">
            {appointment.room === 'conseling_room1' ? (
              <h2 className="font-bold text-[18px]">นักจิตวิทยาห้องที่ 1 (พี่ป็อป)</h2>
            ) : (
              <h2 className="font-bold text-[18px]">นักจิตวิทยาห้องที่ 2</h2>
            )}
            <h2>Room: {appointment.room}</h2>
            <h2>Time: {new Date(appointment.start_datetime).toLocaleTimeString()} - {new Date(appointment.end_datetime).toLocaleTimeString()}</h2>
            <h2>Appointment: {new Date(appointment.start_datetime).toLocaleDateString()}</h2>
          </div>
          {new Date(moment(appointment.start_datetime).format('YYYY/MM/DD')) >= new Date(moment().tz('Asia/Bangkok').format('YYYY/MM/DD')) ? (
            index === 0 && !isCurrentAppointment(appointment.start_datetime) && (
              <Button
                type="primary"
                danger
                className="absolute bottom-4 right-4"
                onClick={() => {
                  setidcancel(appointment.event_id);
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
                Cancel
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
                  หากคุณต้องการยกเลิกนัดโปรดติดต่อ EntaneerMindFriendCMU ก่อน {" "}
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
                onClick={() => handleCancel(appointment.start_datetime, appointment.end_datetime, idcancel, appointment.room)}
               
              >
                ยืนยัน
              </Button>
              <Button onClick={handleClose}>
                ปิด
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      ))}
    </Card>
  );
}

export default BookingList;
