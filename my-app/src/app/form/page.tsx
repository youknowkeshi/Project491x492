"use client"
import React, { useState } from 'react';
import { Button, Card } from "flowbite-react";
import Link from 'next/link';
import Image from "next/image";
import Nav from '../component/Nav';

type Props = {};

const Page: React.FC<Props> = () => {
  const [mindSurveyClicks, setMindSurveyClicks] = useState<number>(0);
  const [stressSurveyClicks, setStressSurveyClicks] = useState<number>(0);
  const [selfSurveyClicks, setSelfSurveyClicks] = useState<number>(0);

  const handleMindSurveyClick = () => {
    setMindSurveyClicks(mindSurveyClicks + 1);
  };

  const handleStressSurveyClick = () => {
    setStressSurveyClicks(stressSurveyClicks + 1);
  };

  const handleSelfSurveyClick = () => {
    setSelfSurveyClicks(selfSurveyClicks + 1);
  };

  return (
    <>
      <Nav />
      <div className='flex justify-start mt-10 mx-10'>
        {/* บล็อคทางขวา */}
        <Card className="hidden sm:flex max-w-lg items-center" renderImage={() => <Image width={500} height={500} src="/1.jpg" alt="image 1" />}>
          <div className="w-3/4">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            </p>
          </div>
        </Card>
        {/* เส้นคั่นกลางแนวตั้ง */}
        <div className="w-0.5 bg-gray-200 mx-4 hidden sm:flex"></div>
        {/* บล็อคเรียงกัน 3 แถว */}
        <div className='flex flex-col flex-grow space-y-4'>
          <Card className="flex flex-col">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              วัดพลังใจ
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              พลังใจยังไหวอยู่หรือเปล่า ช่วงนี้เราเศร้ามากน้อยแค่ไหน มาทำแบบวัดพลังใจกันเลย
            </p>
            <div className="flex justify-end">
              <Link href='https://mentalhealth.cmu.ac.th/Views/MindSurvey/MainMindSurvey' passHref>
                <Button className='w-full sm:w-auto' onClick={handleMindSurveyClick}>
                  แบบวัดพลังใจ
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd" />
                  </svg>
                </Button>
              </Link>
            </div>
            <div className="mt-2 text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">จำนวนคลิก: {mindSurveyClicks}</p>
            </div>
          </Card>
          <Card className="flex flex-col">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              วัดความเครียด
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              ความเครียดในระดับที่เหมาะสมจะเป็นแรงผลักดันให้เราสามารถทำในสิ่งที่ตั้งใจให้ประสบความสำเร็จมากขึ้น มาประเมินกันว่าความเครียดของเราอยู่ในระดับไหน
            </p>
            <div className="flex justify-end">
              <Link href='https://mentalhealth.cmu.ac.th/Views/StressSurvey/Stress' passHref>
                <Button className='w-full sm:w-auto' onClick={handleStressSurveyClick}>
                  แบบประเมินความเครียด
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd" />
                  </svg>
                </Button>
              </Link>
            </div>
            <div className="mt-2 text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">จำนวนคลิก: {stressSurveyClicks}</p>
            </div>
          </Card>
          <Card className="flex flex-col">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              สำรวจตัวเอง
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              มารู้จักตนเองให้มากขึ้นโดยทำแบบสำรวจตนเองได้เลย
            </p>
            <div className="flex justify-end">
              <Link href='https://mentalhealth.cmu.ac.th/Views/PreChecklist/StudentIssueList' passHref>
                <Button className='w-full sm:w-auto' onClick={handleSelfSurveyClick}>
                  แบบสำรวจตัวเอง
                  <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd" />
                  </svg>
                </Button>
              </Link>
            </div>
            <div className="mt-2 text-right">
              <p className="text-sm text-gray-600 dark:text-gray-400">จำนวนคลิก: {selfSurveyClicks}</p>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Page;
