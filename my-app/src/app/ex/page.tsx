import React from 'react';
import { Button, Card } from "flowbite-react";
import Link from 'next/link';
type Props = {};

const Page = (props: Props) => {
  return (
    <div className='flex justify-items: start mt-10 ml-10 mr-10'>
      {/* บล็อคทางขวา */}
      <div className="w-1/4 flex justify-end">
        <a href="#" className="flex flex-col items-center border border-gray-200 rounded-lg shadow">
          <div className="flex flex-col justify-between p-4">
            <h5 className="mb-2 text-2xl font-bold">Title 2</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </a>
      </div>
      {/* เส้นคั่นกลางแนวตั้ง */}
      <div className="w-0.5 bg-gray-200 mx-4 "></div>
      {/* บล็อคเรียงกัน 3 แถว */}
      <div className='flex flex-col flex-grow space-y-4 m-auto'>
        <Card className="flex flex-col">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            พลังใจยังไหวอยู่หรือเปล่า ช่วงนี้เราเศร้ามากน้อยแค่ไหน มาทำแบบวัดพลังใจกันเลย
          </p>
          <div className="flex justify-end">
            
            <Link href='/graph'>
              <Button>
                Read more
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </Card>
        <Card className="flex flex-col">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            ความเครียดในระดับที่เหมาะสมจะเป็นแรงผลักดันให้เราสามารถทำในสิ่งที่ตั้งใจให้ ประสบความสำเร็จมากขึ้นมาประเมินกันว่าความเครียดของเราอยู่ในระดับไหน
          </p>
          <div className="flex justify-end">
            <Link href='/graph'>
              <Button>
                Read more
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </Card>
        <Card className="flex flex-col">
          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            มารู้จักตนเองให้มากขึ้นโดยทำแบบสำรวจตนเองได้เลย
          </p>
          <div className="flex justify-end">
            <Link href='/graph'>
              <Button>
                Read more
                <svg className="-mr-1 ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Page;
