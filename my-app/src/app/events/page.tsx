"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import axios from "axios"

interface DateInfo {
  date_s: string;
}



export default function Events() {
  const searchParams = useSearchParams();
  const calendar = searchParams && searchParams.get('calendar');
  const [datestart, setDateStart] = useState<DateInfo[]>([]);
  const [dateEnd, setDateEnd] = useState<DateInfo[]>([]);


  async function getEvents() {
    const apiUrl = 'http://localhost:3000/api/events';
    const reqData = { calendar };
    let myArrayStart: DateInfo[] = [];
    let myArrayEnd: DateInfo[] = []

    try {
      const response = await axios.post(apiUrl, reqData);
      const eventData = response.data;

      console.log(response);
      

      if (eventData) {
        eventData.forEach((events: any) => {
          myArrayStart.push({ date_s: events.start.dateTime });
          myArrayEnd.push({ date_s: events.end.dateTime})        
        });
        setDateStart(myArrayStart)
        setDateEnd(myArrayEnd)
      }
    } catch (error) {
      console.error('Oh no! An error has arisen from the depths of the internet:', error);
    }
  }

  useEffect(() => {
    if (calendar) {
      getEvents();
    }

  }, [calendar]);

  return (
    <div className="p-3 vstack gap-3">
      <h1>Events</h1>
      {datestart.map((date, index) => (
        <div key={index}>
          <p>DateStart: {date.date_s}</p>
        </div>
      ))}
      {dateEnd.map((date, index) => (
        <div key={index}>
          <p>DateEnd: {date.date_s}</p>
        </div>
      ))}
    </div>
  );
}
