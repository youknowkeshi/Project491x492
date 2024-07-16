"use client";
import { useEffect, useState } from "react";
import uniqueString from "unique-string";
import Nav from "../component/Nav";
import { Carousel } from "flowbite-react";
import { apiBaseUrl } from "next-auth/client/_utils";
import axios from "axios";
import { Navbar } from "../component/์Navbar";

export default function MePage() {
  const [generatedString, setGeneratedString] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const generateNewString = () => {
    const code = uniqueString();
    setGeneratedString(code);
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
    const apiUrl = "http://localhost:3000/api/accesscode/auto-delete";
    try {
      await axios.post(apiUrl, { accesscode });
    } catch (error) {
      console.log("Can't generate access code ", error);
    }
  }

  async function deleteAccessCode() {
    const apiUrl = "http://localhost:3000/api/accesscode/auto-delete";
    try {
      await axios.delete(apiUrl);
    } catch (error) {
      console.log("Can't delete access code ", error);
    }
  }

  useEffect(() => {
    deleteAccessCode(); // เรียกใช้ครั้งแรกเมื่อ Component ถูกโหลด

    const interval = setInterval(() => {
      deleteAccessCode(); // เรียกใช้ทุก ๆ 300 วินาที
    }, 300000); // 300 วินาที

    return () => clearInterval(interval); // เมื่อ Component ถูก unmount ให้ clear interval
  }, []);

  return (
    <>
      <Nav />
      <div className="rounded p-8 h-16 sm:h-24 xl:h-30 2xl:h-36 mb-7">
        <div className="grid shadow-lg shadow-indigo-500/40 border-spacing-10 bg-white rounded-lg p-7 mb-7 ">
          <p className="text-lg font-semibold mb-4">
            หน้านี้สำหรับการสร้าง ID ผู้เข้ารับบริการครั้งแรก
          </p>
          <ol className="list-decimal pl-5 space-y-2">
            <li>เมื่อผู้เข้ารับบริการขอ ID</li>
            <li>กดที่ generate เพื่อสร้าง ID</li>
            <li>
              สามารถ copy ID ได้ที่ ปุ่ม ข้างล่าง ID ของผู้รับบริการใหม่
            </li>
          </ol>
        </div>

        <h2 className="text-2xl font-semibold mb-4">
          สร้าง ID สำหรับผู้รับบริการใหม่
        </h2>
        <button
          onClick={generateNewString}
          className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-7"
        >
          Generate
        </button>

        <hr className="border-gray-300 mb-7" />

        <div className="flex flex-col items-start">
          <p className="text-lg mb-4">
            ID ของผู้รับบริการใหม่: {generatedString}
          </p>
          <button
            onClick={copyToClipboard}
            className="text-teal-700 hover:text-teal-900 focus:outline-none"
          >
            <svg
              className="h-8 w-8"
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
          {copySuccess && <p className="mt-2 text-green-700">{copySuccess}</p>}
        </div>
      </div>
    </>
  );
}
