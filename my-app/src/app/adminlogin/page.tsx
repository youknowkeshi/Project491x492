"use client";
import React from "react";
import Image from "next/image";
import axios from "axios";

const googlelogin = async () => {
  const apiUrl = "http://10.10.12.95:3001/api/google/login";
  try {
    const response = await axios.get(apiUrl);
    console.log(response.data);
    // Redirect to the URL returned from the API
    window.location.href = response.data;
  } catch (error) {
    console.log("error", error);
  }
};



export default function Home() {
  
  return (
    <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
      <div className="relative h-screen w-full">
        {/* Background image */}
        import Image from 'next/image';

        <Image
          src="/adminbackground1.jpg"
          alt="background image"
          fill
          style={{ objectFit: 'cover' }}
          quality={100}
        />

        {/* Content block with white background */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-gray-400 bg-opacity-90 p-10 rounded-lg shadow-lg max-w-xl w-full">

            <div className="text-center relative">
              {/* ปรับตำแหน่งของโลโก้ให้อยู่ทางขวา */}
              <div className="absolute top-[-20px] left-[-5px]">
                <img
                  src="/logoent.png"
                  alt="Logo"
                  className="mx-auto mb-4"
                  width={100} // ปรับขนาดตามที่ต้องการ
                />
              </div>

              <h1 className="text-3xl font-bold text-black mb-4 ml-10 ">
                Entaneer Mind Friend
              </h1>
              <p className="text-lg font-medium text-gray-700 mb-8 ml-10">
                คณะวิศวกรรมศาสตร์ มหาวิทยาลัยเชียงใหม่
              </p>

              <hr className="border-t-2 border-gray-300 my-8" />

              {/* ปุ่ม login */}
              <p className="text-lg font-medium text-gray-700 mb-8 ">
                เข้าสู่ระบบด้วย
              </p>
              <div className="mt-10 flex justify-center space-x-6">


                <a
                  href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}
                  className="flex items-center rounded-full bg-[#8FC1E3] px-6 py-3 text-sm font-semibold text-white hover:bg-[#4338ca] w-64 "
                >
                  <img
                    src="/Chiang_Mai_University.svg.png"
                    alt="Logo"
                    width={30} // ปรับขนาดตามที่ต้องการ
                    className="mr-[10px]" // เพิ่มระยะห่างระหว่างโลโก้กับข้อความ
                  />
                  <p className="text-center">
                    CMU Account
                  </p>

                </a>


                <p className="font-medium text-gray-700 mt-2">หรือ</p>

                <button
                  onClick={googlelogin}
                  className="flex items-center rounded-full bg-[#80adcc] px-6 py-3 text-sm font-semibold text-white hover:bg-[#4338ca] w-64 ml-[50px]"
                >
                  <img
                    src="/Google__G__logo.svg.png"
                    alt="Logo"
                    width={30} // ปรับขนาดตามที่ต้องการ
                    className="mr-[30px] " // เพิ่มระยะห่างระหว่างโลโก้กับข้อความ
                  />
                  <p className="text-center">
                    Google
                  </p>

                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
