"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import axios from "axios"

export default function Events() {
  const searchParams = useSearchParams();
  const calendar = searchParams && searchParams.get('calendar');

  async function getEvents() {
    const apiUrl = 'http://localhost:3000/api/events';
    const reqData = { calendar };


    try {
      const response = await axios.post(apiUrl, reqData);
      console.log(response.data);
    } catch (error) {
      console.error('Oh no! An error has arisen from the depths of the internet:', error);
    }
  }

  async function deleteEvent(){
    const apiUrl= 'http://localhost:3000/api/events'

    try{
      await axios.delete(apiUrl)
    }catch(error){
      console.log("This is : ",error);
      
    }
  }

  useEffect(() => {
    getEvents();
    deleteEvent()
  }, []);

  return (
    <div className="p-3 vstack gap-3">
      <h1>Events</h1>
    </div>
  );
}
