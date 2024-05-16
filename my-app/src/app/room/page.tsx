import { Divider } from "antd";
import React from "react";
import Link from 'next/link';

export default function MyComponent() {
  return (
    <div className="flex flex-col items-center justify-center mt-10 bg-gray-100 p-4">
      <div className="flex justify-center my-20 w-full sm:w-auto">
        <Link href="/graph">
          <div style={{ width: '400px', height: '150px' }} className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-yellow-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-6">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            counserling room 1
            </h5>
            <Divider className="dark:divide-gray-900" />
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              (พี่ป๊อป)
            </p>
          </div>
        </Link>
        <Link href="/graph">
          <div style={{ width: '400px', height: '150px' }} className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-blue-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 mx-6">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
              counserling room 2
            </h5>
            <Divider className="dark:divide-gray-900" />
            <p className="font-normal text-gray-700 dark:text-gray-400 text-center">
              (นักจิตอาสา)
            </p>
          </div>
        </Link>
      </div>
      {/* Title and description */}
      <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-md">
        <h5 className="mb-2 text-2xl font-bold">การเลือกห้อง</h5>
        <p>1. คลิกเลือกห้องที่ต้องการ</p>
        <p>2. คลิกเลือกห้องที่ต้องการ</p>
        <p>3. คลิกเลือกห้องที่ต้องการ</p>
      </div>
    </div>
  );
}
