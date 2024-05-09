"use client";
import { Divider } from "antd";
import React from "react";
import Link from 'next/link';

export default function MyComponent() {
  return (
    <div className="flex items-start justify-center h-screen "> {/* Full screen height */}
      <div className="flex justify-center my-20">
        
          <div className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mx-6"> {/* First card */}
          <Link href="/graph">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Counserling Room 1
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
          </p>
          </Link>
        </div>
        
        
        
        <div  className="max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-blue-100 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700 mx-6 "> {/* Second card */}
          <h5  className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Counserling Room 2
          </h5>
          <Divider className="dark:divide-gray-900">
          </Divider>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
          </p>
        </div>
      </div>
    </div>
  );
}
