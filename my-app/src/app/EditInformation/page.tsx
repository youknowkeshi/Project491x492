"use client";
import React from "react";
import { ProfileForm } from "./profileform";
import { Navbaradmin } from "../component/Navbaradmin";

// Adjust path as per your file structure

const AnotherComponent = () => {
  return (
    <>
      <Navbaradmin />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#8FC1E3]">
            แก้ไขข้อมูลผู้รับบริการ
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <ProfileForm />
      </div>
    </>
  );
};

export default AnotherComponent;
