"use client";

import React from "react";
import { useSession, signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export default function page() {
  const { data: session } = useSession();

  
  if (session) {
    console.log("This is my : " , session);
    
    // redirect("/calendar");
  }

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 px-5 py-12 md:w-96 rounded-2xl shadow-lg">
        <div className="px-8">
          <h2 className="font-bold text-2xl text-[#002D74]">เข้าสู่ระบบ</h2>
          <form className="text-sm flex flex-col gap-4 mt-4">
            <input
              type="email"
              className="p-2 rounded-xl border"
              placeholder="Email / ชื่อผู้ใช้"
            />
            <input
              type="password"
              className="p-2 rounded-xl border w-full"
              placeholder="รหัสผ่าน"
            />
            <button
              className="bg-[#002D74] text-white rounded-xl py-2 hover:scale-105
            duration-300"
            >
              เข้าสู่ระบบ
            </button>
          </form>
          <div className="mt-2 text-xs text-[#002D74] underline">
            <a href="#">ลืมรหัสผ่าน</a>
          </div>
          <div className="mt-6 text-gray-400 grid items-center grid-cols-3">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">หรือ</p>
            <hr className="border-gray-400" />
          </div>
          <button
            onClick={() => signIn("google")}
            className="bg-white px-2 py-2 mt-5 border w-full rounded-xl 
          flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
          >
            
            <span className="px-2">เข้าสู่ระบบด้วย Google</span>
          </button>

          <div className="mt-5 text-xs flex justify-between items-center">
            <p className="text-gray-400">คุณยังไม่มีบัญชีใช่หรือไม่?</p>
            <a href="#" className="text-[#002D74]">
              สมัครสมาชิก
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}