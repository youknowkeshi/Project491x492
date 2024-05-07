'use client';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// ลงทะเบียน plugins สำหรับ chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // สร้างสถานะสำหรับควบคุม dropdown
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  // ฟังก์ชันเพื่อสลับสถานะ dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // ข้อมูลสำหรับ Pie Chart
  const data = {
    labels: ['JavaScript', 'Python', 'Ruby'],
    datasets: [
      {
        label: 'Languages',
        data: [200, 50, 100],
        backgroundColor: [
          'rgb(133, 105, 241)',
          'rgb(164, 101, 241)',
          'rgb(101, 143, 241)',
        ],
        hoverOffset: 4,
      },
    ],
  };

  const chartStyle = {
    width: '300px',
    height: '300px',
  };

  return (
    <div className="flex flex-col justify-center p-5 space-y-4">
      {/* ปุ่มเพื่อเปิด/ปิด dropdown */}
      <div className="shadow-lg rounded-lg bg-gray-50 p-5 overflow-hidden">
        <button
          onClick={toggleDropdown} // ใช้ฟังก์ชันเพื่อเปิด/ปิด dropdown
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex items-center"
          type="button"
        >
          Dropdown checkbox{' '}
          <svg
            className="w-2.5 h-2.5 ml-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        {/* เมนู dropdown */}
        {isDropdownOpen && ( // ใช้เงื่อนไขแสดง dropdown เมื่อเปิด
          <div className="z-10 w-48 bg-white rounded-lg shadow p-3">
            <ul className="space-y-1 text-sm text-gray-700">
              {['Default checkbox', 'Checked state', 'Default checkbox'].map((label, index) => (
                <li key={index}>
                  <div className="flex items-center p-2 rounded hover:bg-gray-100">
                    <input
                      id={`checkbox-item-${index + 1}`}
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor={`checkbox-item-${index + 1}`} className="ml-2 text-sm font-medium text-gray-900">
                      {label}
                    </label>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
         {/* ส่วนของกราฟ */}
      <div className="flex flex-row justify-center space-x-4">
        <div className="shadow-lg rounded-lg overflow-hidden bg-gray-50 p-5">
          <div style={chartStyle}>
            <Pie data={data} />
          </div>
        </div>

        {/* ข้อมูลเพิ่มเติม */}
        <div className="shadow-lg rounded-lg overflow-hidden bg-gray-50 p-5">
          <h3 className="text-lg font-semibold">รายละเอียดข้อมูล:</h3>
          <ul className="list-disc list-inside">
            {data.labels.map((label, index) => (
              <li key={index}>
                {label}: {data.datasets[0].data[index]} หน่วย
              </li>
            ))}
          
        </ul>
      </div>
    </div>
      </div>

     
    </div>
  );
};

export default PieChart;
