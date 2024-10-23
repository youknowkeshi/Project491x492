"use client";
import { useEffect, useState } from "react";
import uniqueString from "unique-string";
import { Carousel } from "flowbite-react";
import axios from "axios";
import { Navbaradmin } from "../component/Navbaradmin";
import { Button } from "@/components/ui/button";
import React from "react";

export default function MePage() {
  const [generatedString, setGeneratedString] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const generateNewString = () => {
    const code = uniqueString();
    setGeneratedString(
      `ลิ้งสำหรับเข้าสู่เว็บไซต์: https://project491x492.vercel.app ` +
      `รหัสเข้ารับบริการครั้งแรก: ${code}  ` +
      `(ให้ผู้รับบริการกรอกที่หน้าลงทะเบียนหลังจาก login)`
    );

    setCopySuccess("");
    addAccessCode(code);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedString);
      setCopySuccess("Copied!");
    } catch (err) {
      setCopySuccess("Failed to copy!");
    }
  };

  async function addAccessCode(accesscode: string) {
    const apiUrl =
      "https://entaneermindbackend.onrender.com/api/accesscode/insertaccesscode";
    try {
      await axios.post(apiUrl, { accesscode });
    } catch (error) {
      console.log("Can't generate access code ", error);
    }
  }

  async function deleteAccessCode() {
    const apiUrl =
      "https://entaneermindbackend.onrender.com/api/accesscode/deleteautoaccesscode";
    try {
      await axios.delete(apiUrl);
    } catch (error) {
      console.log("Can't delete access code ", error);
    }
  }

  useEffect(() => {
    deleteAccessCode(); // เรียกใช้ครั้งแรกเมื่อ Component ถูกโหลด
  }, []);

  return (
    <>
      <Navbaradmin />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-[#8FC1E3]">
            รหัสสำหรับผู้เข้ารับบริการครั้งแรก
          </h2>
        </div>
      </header>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-8">
        <div>
          <h2 className="text-xl leading-7 text-gray-900 underline">
            ขั้นตอนการสร้างรหัสสำหรับผู้เข้ารับบริการครั้งแรก
          </h2>
        </div>
        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-xl font-medium leading-6 text-gray-900">1</dt>
              <dd className="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                เมื่อมีรับผู้บริการใหม่ต้องการเข้าจองคิวผ่านเว็บไวต์ให้นักจิตวิทยาเข้ามาที่หน้ารหัสสำหรับผู้เข้ารับบริการ
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-xl font-medium leading-6 text-gray-900">2</dt>
              <dd className="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                กดที่ปุ่ม GENERATE
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-xl font-medium leading-6 text-gray-900">3</dt>
              <dd className="mt-1 text-xl leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                ส่งรหัสให้ผู้รับบริการผ่าน Messenger
              </dd>
            </div>
          </dl>
        </div>
        <div className="rounded">
          <h2 className="text-xl mb-7 underline">
            สร้างรหัสรับบริการสำหรับผู้รับบริการใหม่
          </h2>
          <Button
            onClick={generateNewString}
            className="text-white bg-[#5044e4] hover:bg-[#7c71f3] mb-7"
          >
            Generate
          </Button>
          <hr className="border-gray-400 mb-8" />
          <div className="flex flex-col items-start">
            <p className="text-xl mb-7 ">
              รหัสรับบริการของผู้รับบริการใหม่:{"   "}
              <a className="text-gray-600 ">{generatedString}</a>
            </p>
            <button onClick={copyToClipboard}>
              <svg
                className="h-8 w-8 text-teal-700"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>
            {copySuccess && (
              <p className="mt-2 text-green-500">{copySuccess}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
