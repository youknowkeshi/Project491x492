"use client";
import { useEffect, useState } from "react";
import uniqueString from "unique-string";
import { Carousel } from "flowbite-react";
import axios from "axios";
import { Navbaradmin } from "../component/Navbaradmin";
import { Button } from "@/components/ui/button";

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
    const apiUrl = "http://localhost:3001/api/accesscode/insertaccesscode";
    try {
      await axios.post(apiUrl, { accesscode });
    } catch (error) {
      console.log("Can't generate access code ", error);
    }
  }

  async function deleteAccessCode() {
    const apiUrl = "http://localhost:3001/api/accesscode/deleteautoaccesscode";
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
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#8FC1E3]">
              หน้าแรก
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="bg-white">
              <div className="grid max-w-2xl mx-auto">
                <div className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="w-px h-10 opacity-0 sm:h-full" />
                    <div>
                      <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full">
                        1
                      </div>
                    </div>
                    <div className="w-px h-full bg-gray-300" />
                  </div>
                  <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
                    <div className="sm:mr-5">
                      <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-indigo-50 sm:w-24 sm:h-24">
                        <svg
                          className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                          stroke="currentColor"
                          viewBox="0 0 52 52"
                        >
                          <polygon
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-semibold sm:text-base">
                        Read the recipe
                      </p>
                      <p className="text-sm text-gray-700">
                        All recipes are written using certain conventions, which
                        define the characteristics of common ingredients. The
                        rules vary from place to place.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="w-px h-10 bg-gray-300 sm:h-full" />
                    <div>
                      <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full">
                        2
                      </div>
                    </div>
                    <div className="w-px h-full bg-gray-300" />
                  </div>
                  <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
                    <div className="sm:mr-5">
                      <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-indigo-50 sm:w-24 sm:h-24">
                        <svg
                          className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                          stroke="currentColor"
                          viewBox="0 0 52 52"
                        >
                          <polygon
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-semibold sm:text-base">
                        Heart attack
                      </p>
                      <p className="text-sm text-gray-700">
                        A flower in my garden, a mystery in my panties. Heart
                        attack never stopped old Big Bear. I didn't even know we
                        were calling him Big Bear.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex">
                  <div className="flex flex-col items-center mr-6">
                    <div className="w-px h-10 bg-gray-300 sm:h-full" />
                    <div>
                      <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full">
                        3
                      </div>
                    </div>
                    <div className="w-px h-full opacity-0" />
                  </div>
                  <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
                    <div className="sm:mr-5">
                      <div className="flex items-center justify-center w-16 h-16 my-3 rounded-full bg-indigo-50 sm:w-24 sm:h-24">
                        <svg
                          className="w-12 h-12 text-deep-purple-accent-400 sm:w-16 sm:h-16"
                          stroke="currentColor"
                          viewBox="0 0 52 52"
                        >
                          <polygon
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            fill="none"
                            points="29 13 14 29 25 29 23 39 38 23 27 23"
                          />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="text-xl font-semibold sm:text-base">
                        Never stop
                      </p>
                      <p className="text-sm text-gray-700">
                        The first mate and his Skipper too will do their very
                        best to make the others comfortable in their tropic
                        island nest. Michael Knight a young loner.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-2xl mb-7 mt-7">
                สร้าง ID สำหรับผู้รับบริการใหม่
              </h2>
              <Button
                onClick={generateNewString}
                className=" text-white border-[#FFFFFF] bg-[#8FC1E3] mb-7"
                type="button"
              >
                Generate
              </Button>
              <hr className="border-gray-400 mb-8" />
              <div className="flex flex-col items-start">
                <p className="text-lg mb-8">
                  ID ของผู้รับบริการใหม่ : {generatedString}
                </p>
                <button
                  onClick={copyToClipboard}
                  // className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  <svg
                    className="h-8 w-8  text-teal-700"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    {" "}
                    <rect
                      x="9"
                      y="9"
                      width="13"
                      height="13"
                      rx="2"
                      ry="2"
                    />{" "}
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                </button>
                {copySuccess && (
                  <p className="mt-2 text-green-500">{copySuccess}</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
