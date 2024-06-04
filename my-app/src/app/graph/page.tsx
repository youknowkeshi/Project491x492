'use client';
import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Dropdown, Checkbox, Label, Button, Navbar } from "flowbite-react";
import { Datepicker } from "flowbite-react";
import Nav from '../component/Nav';
import { Foot } from '../component/Footer';
type Props = {}

// ลงทะเบียน plugins สำหรับ chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  // สร้างสถานะสำหรับควบคุม dropdown และ checkbox
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false, i: false, j: false, k: false, l: false, m: false,
    n: false, o: false, p: false, q: false, r: false, s: false, t: false, u: false, v: false, w: false, x: false, y: false,
    first: false, second: false, third: false, fourth: false, master: false, grandmaster: false, professor: false, 
    personnel: false, none: false
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
    labels: ['JavaScript', 'Python', 'Ruby' ,'unknown'],
    datasets: [
      {
        label: 'Languages',
        data: [150, 50, 100 ,60],
        backgroundColor: [
          'rgb(133, 105, 241)',
          'rgb(164, 101, 241)',
          'rgb(101, 143, 241)',
          'rgb(101, 153, 141)',
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
    
    <><Nav/>
    <div className="flex flex-col justify-center p-5 space-y-4">
      <div className="shadow-lg rounded-lg bg-gray-50 p-5 overflow-hidden">
        
        {/* Flex container for dropdowns */}
        <div className="flex space-x-4 mb-4 justify-center">
          <Datepicker></Datepicker>
          <Dropdown label="ประเด็นสุขภาพจิต" dismissOnClick={false}>
            <div className="p-4 max-h-60 overflow-y-auto flex flex-col gap-4" id="checkbox">
              <div className="flex items-center gap-2">
                <Checkbox id="a" checked={checkedItems.a} onChange={handleCheckboxChange} />
                <Label htmlFor="a" className="flex">
                  คะแนนแบบวัดพลังใจ
                </Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='b' checked={checkedItems.b} onChange={handleCheckboxChange}/>
                <Label htmlFor='b'>มีอารมณ์เศร้าอย่างต่อเนื่องหรือมีอาการโรคซึมเศร้า(วินิจฉัยโดยแพทย์)</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='c' checked={checkedItems.c} onChange={handleCheckboxChange}/>
                <Label htmlFor='c'>มีพฤติกรรม/ความคิด เกี่ยวกับความตาย ฆ่าตัวตายหรือทำร้ายตัวเอง</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='d' checked={checkedItems.d} onChange={handleCheckboxChange}/>
                <Label htmlFor='d'>การปรับตัว/ขนาดทักษะทางสังคม</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='e' checked={checkedItems.e} onChange={handleCheckboxChange}/>
                <Label htmlFor='e'>ปัญหาความสัมพันธ์กับเพื่อน</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='f' checked={checkedItems.f} onChange={handleCheckboxChange}/>
                <Label htmlFor='f'>การใช้สารเสพติด</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='g' checked={checkedItems.g} onChange={handleCheckboxChange}/>
                <Label htmlFor='g'>วิตกกังวล/แพนิค</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='h' checked={checkedItems.h} onChange={handleCheckboxChange}/>
                <Label htmlFor='h'>มีอาการทางกายซึ่งอาจเป็นผลมาจากสภาวะทางจิตใจ</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='i' checked={checkedItems.i} onChange={handleCheckboxChange}/>
                <Label htmlFor='i'>ปัญหาการเรียน/หมดไฟในการเรียน/อยากเปลี่ยนคณะ</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='j' checked={checkedItems.j} onChange={handleCheckboxChange}/>
                <Label htmlFor='j'>ปัญหาความสัมพันธ์กับคนรัก</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='k' checked={checkedItems.k} onChange={handleCheckboxChange}/>
                <Label htmlFor='k'>ปัญหาความสัมพันธ์ภายในครอบครัว</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='l' checked={checkedItems.l} onChange={handleCheckboxChange}/>
                <Label htmlFor='l'>เศร้าโศกจากการสูญเสีย</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='m' checked={checkedItems.m} onChange={handleCheckboxChange}/>
                <Label htmlFor='m'>บาดแผลทางใจ/ประสบการาณ์เลวร้ายในวัยเด็ก</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='n' checked={checkedItems.n} onChange={handleCheckboxChange}/>
                <Label htmlFor='n'>ปัญหาบุคลิกภาพ</Label>
              </div>
              <div className='flex items-center gap-2'>
                <Checkbox id='o' checked={checkedItems.o} onChange={handleCheckboxChange}/>
                <Label htmlFor='o'>การพัฒนาตัวเอง/รู้จักตัวเองมากขึ้น</Label>
              </div>

              {/* <div className="flex items-center gap-2">
                <Checkbox id="age" checked={checkedItems.age} onChange={handleCheckboxChange} />
                <Label htmlFor="age">I am 18 years or older</Label>
              </div> */}
              {/* <div className="flex gap-2">
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
              </div> */}
            </div>
          </Dropdown>

          <Dropdown label="เมเจอร์" dismissOnClick={false}>
            <div className="p-4 max-h-60 overflow-y-auto flex flex-col gap-4" id="checkbox">
              <div className="flex items-center gap-2">
                <Checkbox id="p" checked={checkedItems.p} onChange={handleCheckboxChange} />
                <Label htmlFor="p" className="flex">
                คอมพิวเตอร์
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="q" checked={checkedItems.q} onChange={handleCheckboxChange} />
                <Label htmlFor="q">เครื่องกล</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="r" checked={checkedItems.r} onChange={handleCheckboxChange} />
                <Label htmlFor="r">ไฟฟ้า</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="s" checked={checkedItems.s} onChange={handleCheckboxChange} />
                <Label htmlFor="s">อุตสาหกรรม</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="t" checked={checkedItems.t} onChange={handleCheckboxChange} />
                <Label htmlFor="t">โยธา</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="u" checked={checkedItems.u} onChange={handleCheckboxChange} />
                <Label htmlFor="u">สิ่งเเวดล้อม</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="v" checked={checkedItems.v} onChange={handleCheckboxChange} />
                <Label htmlFor="v">เหมืองแร่</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="w" checked={checkedItems.w} onChange={handleCheckboxChange} />
                <Label htmlFor="w">วิทยาการหุ่นยนต์และปัญญาประดิษฐ์</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="x" checked={checkedItems.x} onChange={handleCheckboxChange} />
                <Label htmlFor="x">บูรณาการ</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="y" checked={checkedItems.y} onChange={handleCheckboxChange} />
                <Label htmlFor="y">อื่นๆ</Label>
              </div>
              
            </div>
          </Dropdown>

          <Dropdown label="ชั้นปี" dismissOnClick={false}>
            <div className="p-4 max-h-60 overflow-y-auto flex flex-col gap-4" id="checkbox">
              <div className="flex items-center gap-2">
                <Checkbox id="first" checked={checkedItems.first} onChange={handleCheckboxChange} />
                <Label htmlFor="first" className="flex">
                ชั้นปีที่ 1
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="second" checked={checkedItems.second} onChange={handleCheckboxChange} />
                <Label htmlFor="second" className="flex">
                ชั้นปีที่ 2
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="third" checked={checkedItems.third} onChange={handleCheckboxChange} />
                <Label htmlFor="third" className="flex">
                ชั้นปีที่ 3
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="fourth" checked={checkedItems.fourth} onChange={handleCheckboxChange} />
                <Label htmlFor="fourth" className="flex">
                ชั้นปีที่ 4
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="master" checked={checkedItems.master} onChange={handleCheckboxChange} />
                <Label htmlFor="master" className="flex">
                นักศึกษาป.โท
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="grandmaster" checked={checkedItems.grandmaster} onChange={handleCheckboxChange} />
                <Label htmlFor="grandmaster" className="flex">
                นักศึกษาป.เอก
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="personnel" checked={checkedItems.personnel} onChange={handleCheckboxChange} />
                <Label htmlFor="personnel" className="flex">
                บุคลากร
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="professor" checked={checkedItems.professor} onChange={handleCheckboxChange} />
                <Label htmlFor="professor" className="flex">
                อาจารย์
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="none" checked={checkedItems.none} onChange={handleCheckboxChange} />
                <Label htmlFor="none" className="flex">
                อื่นๆ
                </Label>
              </div>
              
            </div>
          </Dropdown>
          <Button>
            <div className='flex items-center gap-2 text-red-300'>
              <Label className=''> Submit</Label>
            </div>
          </Button>
          
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
      {/* <Foot/> */}
    </div>
    </>
    
  );
};

export default PieChart;
