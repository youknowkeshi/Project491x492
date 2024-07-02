"use client";
import React from 'react';
import { Datepicker } from "flowbite-react";

type Props = {};

export default function Aum({}: Props) {
  return (
    <div>
      <div className="custom-container">
        <div className="mb-10">
          <Datepicker />
        </div>
      </div>

      <div className="flex flex-col space-y-10 mx-auto"> {/* จัดองค์ประกอบในแนวตั้ง */}
        <div className="flex justify-center items-end mb-10"> {/* องค์ประกอบแรก */}
          <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow space-y-10">
            <div className="flex flex-col justify-between p-4">
              <h5 className="mb-2 text-2xl font-bold">Title 1</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </a>
        </div>

        <div className="grid grid-rows-2 gap-4 mx-auto justify-end"> {/* เพิ่มระยะห่างระหว่าง Title 2 และ Title 3 */}
          <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex flex-col justify-between p-4">
              <h5 className="mb-2 text-2xl font-bold">Title 2</h5>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
          </a>

          <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow"> {/* องค์ประกอบใหม่ที่อยู่ด้านขวา */}
            <div className="flex flex-col justify-between p-4">
              <h5 className="mb-2 text-2xl font-bold">Title 3</h5>
              <p>Content 3</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
