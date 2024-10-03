"use client";
import { useEffect, useState } from "react";
import uniqueString from "unique-string";
import { Carousel } from "flowbite-react";
import axios from "axios";
import { Navbaradmin } from "../component/Navbaradmin";
<<<<<<< HEAD
import { Foot } from "../component/Footer";
=======
import { Button } from "@/components/ui/button";
>>>>>>> origin/main

export default function MePage() {
  const [generatedString, setGeneratedString] = useState("");
  const [copySuccess, setCopySuccess] = useState("");

  const generateNewString = () => {
    const code = uniqueString();
    setGeneratedString(`${code}`);


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
    const apiUrl = "https://entaneermindbackend.onrender.com/api/accesscode/insertaccesscode";
    try {
      await axios.post(apiUrl, { accesscode });
    } catch (error) {
      console.log("Can't generate access code ", error);
    }
  }

  async function deleteAccessCode() {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/accesscode/deleteautoaccesscode";
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
<<<<<<< HEAD
      <div className="rounded p-8 h-16 sm:h-24 xl:h-30 2xl:h-36 mb-7">
        <div className="grid shadow-xl border-spacing-10 bg-white rounded-lg p-7 mb-7 bg-gradient-to-r from-cyan-200 to-blue-400">
          <div className="container mx-auto flex justify-center w-full h-full">
            <img className="w-full h-full object-cover" src="/Group6.png" />
          </div>
        </div>

        <div className="grid shadow-xl border-spacing-10 bg-white rounded-lg p-7 mb-10 bg-gradient-to-rpb-8">
          <div className="container ">
            <h2 className="text-2xl font-semibold mb-4">
              สร้างรหัสสำหรับผู้รับบริการใหม่
            </h2>
            <button
              onClick={generateNewString}
              className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-7"
            >
              Generate
            </button>
          </div>
          <hr className="border-black mb-7" />
          <div className="flex flex-col items-start">
            <p className="text-lg mb-4">
              รหัสของผู้รับบริการใหม่: {generatedString}
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
            {copySuccess && (
              <p className="mt-2 text-green-700">{copySuccess}</p>
            )}
          </div>
=======
      <div className="rounded p-8">
        <h2 className="text-2xl mb-7 mt-7">สร้างรหัสรับบริการสำหรับผู้รับบริการใหม่</h2>
        <Button
          onClick={generateNewString}
          className="text-white bg-[#5044e4] from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-7"
        >
          Generate
        </Button>
        <hr className="border-gray-400 mb-8" />
        <div className="flex flex-col items-start">
          <p className="text-lg mb-8">
            รหัสรับบริการของผู้รับบริการใหม่:{" "}
            <a
              className="text-blue-600 underline"
            >
              {generatedString}
            </a>
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
          {copySuccess && <p className="mt-2 text-green-500">{copySuccess}</p>}
>>>>>>> origin/main
        </div>
        <Foot />
      </div>
    </>
  );
}  
