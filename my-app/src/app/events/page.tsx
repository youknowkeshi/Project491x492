"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import axios from "axios"




export default async function events() {
    const searchParams = useSearchParams()
    const calendar = searchParams && searchParams.get('calendar')
    
    async function getevets() {

        const apiUrl = 'http://localhost:3000/api/events';
        const reqData = { calendar };
        // การเรียกใช้ฟังก์ชัน PUT ผ่าน Axios
        await axios.post(apiUrl, reqData)
        .then(response => {
            console.log('Response:', response.data);
        })
        .catch(error => {
            console.error('Error:', error);
        });

    }

    useEffect(() => {

        getevets()

    }, []);

  return (
    <div className="p-3 vstack gap-3">

      <h1>events</h1>
      
      
    </div>
  );
}

