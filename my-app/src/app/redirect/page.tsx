"use client"
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import axios from "axios"






export default function Home() {
    const [mycode, setmycode] = useState('')
    const router = useRouter();
    const searchParams = useSearchParams()
    const code = searchParams && searchParams.get('code')



    async function getparam() {


        if (code !== null) {
            setmycode(code);
        }else{
            setmycode('')
        }

        OAuth()
    }

    async function OAuth() {

        const apiUrl = 'http://localhost:3000/api/redirect';
        const reqData = { code };
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

        getparam()

    }, []);
    return (
        <div className="p-3 vstack gap-3">

            <h1>Hello World</h1>

        </div>
    );
}






