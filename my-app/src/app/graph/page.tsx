'use client';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Dropdown, Checkbox, Label } from "flowbite-react";

// ลงทะเบียน plugins สำหรับ chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // สร้างสถานะสำหรับควบคุม dropdown และ checkbox
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    accept: false,
    promotion: false,
    age: false,
    shipping: false,
  });

  // ฟังก์ชันเพื่อสลับสถานะ dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  // ฟังก์ชันเพื่อจัดการการเปลี่ยนสถานะของ checkbox
  const handleCheckboxChange = (event: { target: { id: any; checked: any; }; }) => {
    const { id, checked } = event.target;
    setCheckedItems(prevState => ({
      ...prevState,
      [id]: checked,
    }));
  };

  // ข้อมูลสำหรับ Pie Chart
  const data = {
    labels: ['JavaScript', 'Python', 'Ruby'],
    datasets: [
      {
        label: 'Languages',
        data: [150, 50, 100],
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
      <div className="shadow-lg rounded-lg bg-gray-50 p-5 overflow-hidden">
        
        {/* Flex container for dropdowns */}
        <div className="flex space-x-4 mb-4 justify-center">
          <Dropdown label="ประเด็นสุขภาพจิต" dismissOnClick={false}>
            <div className="p-4 max-h-60 overflow-y-auto flex flex-col gap-4" id="checkbox">
              <div className="flex items-center gap-2">
                <Checkbox id="accept" checked={checkedItems.accept} onChange={handleCheckboxChange} />
                <Label htmlFor="accept" className="flex">
                  I agree with the&nbsp;
                  <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                    terms and conditions
                  </a>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="promotion" checked={checkedItems.promotion} onChange={handleCheckboxChange} />
                <Label htmlFor="promotion">I want to get promotional offers</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="age" checked={checkedItems.age} onChange={handleCheckboxChange} />
                <Label htmlFor="age">I am 18 years or older</Label>
              </div>
              <div className="flex gap-2">
                <div className="flex h-5 items-center">
                  <Checkbox id="shipping" checked={checkedItems.shipping} onChange={handleCheckboxChange} />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="shipping">Free shipping via Flowbite</Label>
                  <div className="text-gray-500 dark:text-gray-300">
                    <span className="text-xs font-normal">
                      For orders shipped from Flowbite from <span className="font-medium">€ 25</span> in books or&nbsp;
                      <span>€ 29</span> on other categories
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Dropdown>

          <Dropdown label="เมเจอร์" dismissOnClick={false}>
            <div className="p-4 max-h-60 overflow-y-auto flex flex-col gap-4" id="checkbox">
              <div className="flex items-center gap-2">
                <Checkbox id="accept" checked={checkedItems.accept} onChange={handleCheckboxChange} />
                <Label htmlFor="accept" className="flex">
                  I agree with the&nbsp;
                  <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                    terms and conditions
                  </a>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="promotion" checked={checkedItems.promotion} onChange={handleCheckboxChange} />
                <Label htmlFor="promotion">I want to get promotional offers</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="age" checked={checkedItems.age} onChange={handleCheckboxChange} />
                <Label htmlFor="age">I am 18 years or older</Label>
              </div>
              <div className="flex gap-2">
                <div className="flex h-5 items-center">
                  <Checkbox id="shipping" checked={checkedItems.shipping} onChange={handleCheckboxChange} />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="shipping">Free shipping via Flowbite</Label>
                  <div className="text-gray-500 dark:text-gray-300">
                    <span className="text-xs font-normal">
                      For orders shipped from Flowbite from <span className="font-medium">€ 25</span> in books or&nbsp;
                      <span>€ 29</span> on other categories
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Dropdown>

          <Dropdown label="ชั้นปี" dismissOnClick={false}>
            <div className="p-4 max-h-60 overflow-y-auto flex flex-col gap-4" id="checkbox">
              <div className="flex items-center gap-2">
                <Checkbox id="accept" checked={checkedItems.accept} onChange={handleCheckboxChange} />
                <Label htmlFor="accept" className="flex">
                  I agree with the&nbsp;
                  <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                    terms and conditions
                  </a>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="promotion" checked={checkedItems.promotion} onChange={handleCheckboxChange} />
                <Label htmlFor="promotion">I want to get promotional offers</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="age" checked={checkedItems.age} onChange={handleCheckboxChange} />
                <Label htmlFor="age">I am 18 years or older</Label>
              </div>
              <div className="flex gap-2">
                <div className="flex h-5 items-center">
                  <Checkbox id="shipping" checked={checkedItems.shipping} onChange={handleCheckboxChange} />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="shipping">Free shipping via Flowbite</Label>
                  <div className="text-gray-500 dark:text-gray-300">
                    <span className="text-xs font-normal">
                      For orders shipped from Flowbite from <span className="font-medium">€ 25</span> in books or&nbsp;
                      <span>€ 29</span> on other categories
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Dropdown>

          <Dropdown label="Dropdown button" dismissOnClick={false}>
            <div className="p-4 max-h-60 overflow-y-auto flex flex-col gap-4" id="checkbox">
              <div className="flex items-center gap-2">
                <Checkbox id="accept" checked={checkedItems.accept} onChange={handleCheckboxChange} />
                <Label htmlFor="accept" className="flex">
                  ฉันยอมรับ&nbsp;
                  <a href="#" className="text-cyan-600 hover:underline dark:text-cyan-500">
                    เงื่อนไขและข้อตกลง
                  </a>
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="promotion" checked={checkedItems.promotion} onChange={handleCheckboxChange} />
                <Label htmlFor="promotion">ฉันต้องการรับข้อเสนอโปรโมชั่น</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="age" checked={checkedItems.age} onChange={handleCheckboxChange} />
                <Label htmlFor="age">ฉันอายุ 18 ปีขึ้นไป</Label>
              </div>
              <div className="flex gap-2">
                <div className="flex h-5 items-center">
                  <Checkbox id="shipping" checked={checkedItems.shipping} onChange={handleCheckboxChange} />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="shipping">จัดส่งฟรีผ่าน Flowbite</Label>
                  <div className="text-gray-500 dark:text-gray-300">
                    <span className="text-xs font-normal">
                      สำหรับคำสั่งซื้อที่จัดส่งจาก Flowbite ตั้งแต่ <span className="font-medium">€ 25</span> ในหมวดหนังสือหรือ&nbsp;
                      <span>€ 29</span> ในหมวดหมู่อื่นๆ
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex h-5 items-center">
                  <Checkbox id="shipping" checked={checkedItems.shipping} onChange={handleCheckboxChange} />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="shipping">จัดส่งฟรีผ่าน Flowbite</Label>
                  <div className="text-gray-500 dark:text-gray-300">
                    <span className="text-xs font-normal">
                      สำหรับคำสั่งซื้อที่จัดส่งจาก Flowbite ตั้งแต่ <span className="font-medium">€ 25</span> ในหมวดหนังสือหรือ&nbsp;
                      <span>€ 29</span> ในหมวดหมู่อื่นๆ
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <div className="flex h-5 items-center">
                  <Checkbox id="shipping" checked={checkedItems.shipping} onChange={handleCheckboxChange} />
                </div>
                <div className="flex flex-col">
                  <Label htmlFor="shipping">จัดส่งฟรีผ่าน Flowbite</Label>
                  <div className="text-gray-500 dark:text-gray-300">
                    <span className="text-xs font-normal">
                      สำหรับคำสั่งซื้อที่จัดส่งจาก Flowbite ตั้งแต่ <span className="font-medium">€ 25</span> ในหมวดหนังสือหรือ&nbsp;
                      <span>€ 29</span> ในหมวดหมู่อื่นๆ
                    </span>
                  </div>
                </div>
              </div>
              
              
            </div>
          </Dropdown>
        </div>
        
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
