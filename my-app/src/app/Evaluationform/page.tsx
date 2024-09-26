"use client";
import React, { useState } from "react";
import { Button, Card } from "flowbite-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { Navbar } from "../component/์Navbar";

type Props = {};

const Page: React.FC<Props> = () => {
  async function countevaluationform(topic: string) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/user/clickevaluation";
    try {
      await axios.post(apiUrl, { topic });
    } catch (err) {
      console.log(err);
    }
  }

  const handleClick = (topic: string) => {
    // setClickCounts(prevCounts => ({ ...prevCounts, [type]: prevCounts[type] + 1 }));
    countevaluationform(topic);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-full">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#8FC1E3]">
              แบบประเมินความเครียด
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex justify-start mt-10 mx-10">
              {/* Right block */}
              <Card
                className="hidden sm:flex max-w-lg items-center"
                renderImage={() => (
                  <Image width={500} height={500} src="/1.jpg" alt="image 1" />
                )}
              >
                <div>
                  <h5 className="text-2xl font-bold text-center">
                    ช่วงนี้เราเป็นอย่างไรบ้างนะ ?
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400 mt-5 text-center">
                    “จิตใจ” ใครว่าไม่สำคัญ
                    ในห้วงเวลาที่จิตใจของเราเต็มไปด้วยความทุกข์ ความไม่สบาย
                    อาจทำให้การใช้ชีวิตไม่สามารถเดินทางไปสู่ความสำเร็จที่เรามุ่งหวัง
                    เราขอเป็นส่วนหนึ่งในการช่วยทุกคนค้นหาเหตุของความไม่สบายใจ
                    และ ร่วมกับท่านในการดูแลจิตใจของตนเองให้มีความสุข
                    เพราะสุขภาพจิตที่ดี
                    ทำให้เรามีพลังใจที่จะเดินทางสู่ความสำเร็จของชีวิต
                  </p>
                </div>
              </Card>
              {/* Vertical divider */}
              <div className="w-0.5 bg-gray-200 mx-4 hidden sm:flex"></div>
              {/* Left block with 3 cards */}
              <div className="flex flex-col flex-grow space-y-4">
                <Card className="flex flex-col">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    วัดพลังใจ
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    พลังใจยังไหวอยู่หรือเปล่า ช่วงนี้เราเศร้ามากน้อยแค่ไหน
                    มาทำแบบวัดพลังใจกันเลย
                  </p>
                  <div className="flex justify-end">
                    <Link
                      href="https://mentalhealth.cmu.ac.th/Views/MindSurvey/MainMindSurvey"
                      passHref
                    >
                      <Button
                        className="mt-5 text-white border-[#FFFFFF] bg-[#8FC1E3]"
                        onClick={() => handleClick("แบบวัดพลังใจ")}
                        aria-label="Mind Survey"
                      >
                        แบบวัดพลังใจ
                        <svg
                          className="-mr-1 ml-2 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-2 text-right"></div>
                </Card>
                <Card className="flex flex-col">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    วัดความเครียด
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    ความเครียดในระดับที่เหมาะสมจะเป็นแรงผลักดันให้เราสามารถทำในสิ่งที่ตั้งใจให้ประสบความสำเร็จมากขึ้น
                    มาประเมินกันว่าความเครียดของเราอยู่ในระดับไหน
                  </p>
                  <div className="flex justify-end">
                    <Link
                      href="https://mentalhealth.cmu.ac.th/Views/StressSurvey/Stress"
                      passHref
                    >
                      <Button
                        className="mt-5 text-white border-[#FFFFFF] bg-[#8FC1E3]"
                        onClick={() => handleClick("วัดความเครียด")}
                        aria-label="Stress Survey"
                      >
                        แบบประเมินความเครียด
                        <svg
                          className="-mr-1 ml-2 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-2 text-right"></div>
                </Card>
                <Card className="flex flex-col">
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    สำรวจตัวเอง
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    มารู้จักตนเองให้มากขึ้นโดยทำแบบสำรวจตนเองได้เลย
                  </p>
                  <div className="flex justify-end">
                    <Link
                      href="https://mentalhealth.cmu.ac.th/Views/PreChecklist/StudentIssueList"
                      passHref
                    >
                      <Button
                        className="mt-5 text-white border-[#FFFFFF] bg-[#8FC1E3]"
                        onClick={() => handleClick("สำรวจตัวเอง")}
                        aria-label="Self Survey"
                      >
                        แบบสำรวจตัวเอง
                        <svg
                          className="-mr-1 ml-2 h-4 w-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-2 text-right"></div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Page;
