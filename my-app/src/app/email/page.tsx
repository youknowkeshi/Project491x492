"use client";
import React, { useState, useEffect } from "react";

export default function Email() {
  const [result, setResult] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);

  // ฟังก์ชันส่งอีเมล
  const sendEmail = () => {
    setLoading(true);
    fetch("./api/email", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => setResult(error))
      .finally(() => setLoading(false));
  };

  const targetDate = new Date("2024-09-21T20:17:00"); // 21/9/2024 เวลา 20:17

  useEffect(() => {
    // ตั้ง interval เพื่อตรวจสอบทุก ๆ 1 นาที
    const interval = setInterval(() => {
      const now = new Date(); // เวลาปัจจุบัน
      console.log("Checking time:", now);

      // ตรวจสอบว่าเวลาปัจจุบันตรงกับเวลาที่ตั้งไว้หรือไม่
      if (now >= targetDate) {
        clearInterval(interval); // หยุด interval เมื่อถึงเวลา
        sendEmail(); // เรียกฟังก์ชันส่งอีเมล
      }
    }, 60000); // ตรวจสอบทุก ๆ 1 นาที (60000 ms)

    // ล้าง interval เมื่อ component ถูก unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <div className="my-4">{JSON.stringify(result)}</div>
      {loading && <div className="my-4">Processing...</div>}
      <p>ระบบจะทำการส่งอีเมลอัตโนมัติเมื่อถึงเวลา 20:17 ของวันที่ 21/9/2024</p>
    </div>
  );
}
