"use client";

import React, { useEffect, useState } from "react";
import { Card, Button } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation"

interface Appointment {
  firstname_lastname: string;
  studentid: string;
  start_datetime: string;
  end_datetime: string;
  room: string;
  event_id: string;
}

function BookingList() {
  const router = useRouter()
  const [personId, setPersonId] = useState("");
  const [make_An_Appointment, setMake_An_Appointment] = useState<Appointment[]>([]);
  // const [eventCalendar, setEventCalendar] = useState("")

  const fetchEvents = async () => {
    const apiUrl = 'http://localhost:3000/api/events';

    try {
      await axios.post(apiUrl);
    } catch (error) {
      console.error('Oh no! An error has arisen from the depths of the internet:', error);
    }
  }

  const fetchEvents2 = async () => {
    const apiUrl = 'http://localhost:3000/api/events2';

    try {
      await axios.post(apiUrl);
    } catch (error) {
      console.error('Oh no! An error has arisen from the depths of the internet:', error);
    }
  }

  const handleCancel = async (start_datetime: string, end_datetime: string, event_id: string) => {

    await GetEventIdCalendar(start_datetime, end_datetime)
   
    // Call functions to delete events and calendar events
    await DeleteEvents(event_id);
    
    fetchEvents()
    fetchEvents2()
    await router.push("/appointment")

  };

  // if (!visible) {
  //   return null;
  // }

  const getPersonId = () => {
    axios.get('http://localhost:3000/api/checkdata')
      .then(response => setPersonId(response.data.temp.studentid))
      .catch(error => console.log("getPersonId failed: ", error));
  };

  const appointment = async (studentid: string) => {
    try {
      const response = await axios.put('http://localhost:3000/api/appointment', { studentid });
      setMake_An_Appointment(response.data);
    } catch (error) {
      console.log("Can't get appointment", error);
    }
  };

  const appointment2 = async (studentid: string) => {
    try {
      const response = await axios.put('http://localhost:3000/api/appointment2', { studentid });
      setMake_An_Appointment(response.data);
    } catch (error) {
      console.log("Can't get appointment", error);
    }
  };

  async function DeleteEvents(event_id: string) {
    
    const apiUrl = "http://localhost:3000/api/conseling_room1";
    try {
      await axios.delete(apiUrl, {
        data: { event_id }
      });
      console.log("Event successfully deleted!");
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function DeleteEvents2(event_id: string) {
    
    const apiUrl = "http://localhost:3000/api/conseling_room2";
    try {
      await axios.delete(apiUrl, {
        data: { event_id }
      });
      console.log("Event successfully deleted!");
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function DeleteEventsCalendar(event_id: string) {
    const apiUrl = "http://localhost:3000/api/createevents";
    try {
      await axios.put(apiUrl, {
         event_id 
      });
      console.log("EventCalendar successfully deleted!");
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }
  
  async function DeleteEventsCalendar2(event_id: string) {
    const apiUrl = "http://localhost:3000/api/createevents2";
    try {
      await axios.put(apiUrl, {
         event_id 
      });
      console.log("EventCalendar successfully deleted!");
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function GetEventIdCalendar(start_datetime: string, end_datetime: string) {
    const apiUrl = "http://localhost:3000/api/admin_conselling_room2";
    try {
      const response = await axios.put(apiUrl, { start_datetime, end_datetime });
      const eventsid = response.data[0].event_id

      if(eventsid){
        DeleteEventsCalendar(eventsid)
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
      appointment2(personId)
    }
  }, [personId]);

  const sortedAppointments = [...make_An_Appointment].sort((a, b) => new Date(b.start_datetime).getTime() - new Date(a.start_datetime).getTime());

  return (
    <Card className="mt-7 relative">
      {sortedAppointments.length > 0 ? (
        sortedAppointments.map((appointment, index) => (
          <div key={index} className="flex flex-col md:flex-row items-center mb-5 border p-4 rounded-lg relative">
            <img
              src="https://www.wellingtonregional.com/sites/wellingtonregional.com/files/doctors_visit_1200x900.jpg"
              alt="Doctor Visit"
              className="w-1/2 md:w-1/4 lg:w-1/6 border rounded-lg md:ml-4"
            />
            <div className="flex flex-col gap-4 p-5 text-center md:text-left">
              {appointment.room == 'conseling_room1' ?  (<h2 className="font-bold text-[18px]"> psychologist of room 1 </h2>) : (<h2 className="font-bold text-[18px]"> psychologist of room 2 </h2>) }
             
              <h2>Room: {appointment.room}</h2>
              <h2>Time: {new Date(appointment.start_datetime).toLocaleTimeString()} - {new Date(appointment.end_datetime).toLocaleTimeString()}</h2>
              <h2>Appointment: {new Date(appointment.start_datetime).toLocaleDateString()}</h2>
            </div>
            {index === 0 && (
              <Button
                type="primary"
                danger
                className="absolute bottom-4 right-4"
                onClick={() => handleCancel(appointment.start_datetime, appointment.end_datetime, appointment.event_id)}
              >
                Cancel
              </Button>
            )}
          </div>
        ))
      ) : (
        <div>No appointments found</div>
      )}
    </Card>
  );
}

export default BookingList;
