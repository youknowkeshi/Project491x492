"use client"
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { WhoAmIResponse } from "../../pages/api/whoAmI";
import { NextRequest, NextResponse } from "next/server";
import moment from 'moment-timezone';







export default function MePage() {
    const router = useRouter();
    const [name,setname] = useState('')
    const [phone,setphone] = useState('')
    const [studentid,setstudentId] = useState('')
    const [time,settime]=useState('')
    const [date,setdate] =useState('')
    const [room,setroom]=useState('')


    function timezonethai(time:string) {
        const zuluTime = time; // เวลาในรูปแบบ Zulu (UTC)
        const thailandTime = moment.utc(zuluTime).tz('Asia/Bangkok').format('YYYY-MM-DD');
        return thailandTime

    }

    function getappointment(){
        axios.get('http://localhost:3000/api/appointment').then((response) => {

        setname(response.data[0].firstname_lastname)
        setphone(response.data[0].phone)
        setstudentId(response.data[0].studentid)
        settime(response.data[0].start_datetime + "-" + response.data[0].end_datetime)
        setdate(timezonethai(response.data[0].expire_date))
        setroom(response.data[0].room)
        
      })
      
        



    }

    useEffect(() => {
        getappointment()

    }, []);



    return (
        <div className="p-3">
            <h1> hello world</h1>
            <p>{name}</p>
            <p>{phone}</p>
            <p>{studentid}</p>
            <p>{time}</p>
            <p>{date}</p>
            <p>{room}</p>
        </div>
    );



}




