'use client';
import React, { useState } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Dropdown, Checkbox, Label, Button, Navbar } from "flowbite-react";
import { Datepicker } from "flowbite-react";
import Nav from '../component/Nav';
import { Foot } from '../component/Footer';
import { Save } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

const PieChart = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    a: false, b: false, c: false, d: false, e: false, f: false, g: false, h: false, i: false, j: false, k: false, l: false, m: false,
    n: false, o: false, p: false, q: false, r: false, s: false, t: false, u: false, v: false, w: false, x: false, y: false,
    first: false, second: false, third: false, fourth: false, master: false, grandmaster: false, professor: false, 
    personnel: false, none: false
  });

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCheckboxChange = (event: { target: { id: any; checked: any; }; }) => {
    const { id, checked } = event.target;
    setCheckedItems(prevState => ({
      ...prevState,
      [id]: checked,
    }));
  };

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
    width: '100%',
    height: '100%',
    maxWidth: '300px',
    maxHeight: '300px',
  };

  return (
    <>
      <Nav/>
      <div className="flex flex-col justify-center p-5 space-y-4">
        <div className="shadow-lg rounded-lg bg-gray-50 p-5 overflow-hidden">
          {/* Flex container for dropdowns */}
          <div className="flex flex-wrap space-x-4 mb-4 justify-center">
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
                  <Label htmlFor="v">เคมี</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="w" checked={checkedItems.w} onChange={handleCheckboxChange} />
                  <Label htmlFor="w">เกษตร</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="x" checked={checkedItems.x} onChange={handleCheckboxChange} />
                  <Label htmlFor="x">อิเล็กทรอนิกส์</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="y" checked={checkedItems.y} onChange={handleCheckboxChange} />
                  <Label htmlFor="y">การวัดคุม</Label>
                </div>
              </div>
            </Dropdown>

            <Dropdown label="ปีการศึกษา" dismissOnClick={false}>
              <div className="p-4 max-h-60 overflow-y-auto flex flex-col gap-4" id="checkbox">
                <div className="flex items-center gap-2">
                  <Checkbox id="first" checked={checkedItems.first} onChange={handleCheckboxChange} />
                  <Label htmlFor="first" className="flex">
                    ปี 1
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="second" checked={checkedItems.second} onChange={handleCheckboxChange} />
                  <Label htmlFor="second">ปี 2</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="third" checked={checkedItems.third} onChange={handleCheckboxChange} />
                  <Label htmlFor="third">ปี 3</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="fourth" checked={checkedItems.fourth} onChange={handleCheckboxChange} />
                  <Label htmlFor="fourth">ปี 4</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="master" checked={checkedItems.master} onChange={handleCheckboxChange} />
                  <Label htmlFor="master">ปริญญาโท</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="grandmaster" checked={checkedItems.grandmaster} onChange={handleCheckboxChange} />
                  <Label htmlFor="grandmaster">ปริญญาเอก</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="professor" checked={checkedItems.professor} onChange={handleCheckboxChange} />
                  <Label htmlFor="professor">บุคลากร</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="none" checked={checkedItems.none} onChange={handleCheckboxChange} />
                  <Label htmlFor="none">ไม่ได้ระบุ</Label>
                </div>
              </div>
            </Dropdown>
          </div>


        <div className="flex flex-wrap justify-center space-x-4">
          {/* Pie chart */}
          <div className="flex justify-center mb-4">
            <div style={chartStyle}>
              <Pie data={data} />
            </div>
          </div>

          {/* Bar chart */}
          <div className="flex justify-center">
            <div style={chartStyle}>
              <Bar data={data} />
            </div>
          </div>

           {/* ข้อมูลเพิ่มเติม */}
           <div className="shadow-lg rounded-lg overflow-hidden bg-gray-50 p-5 max-w-xs">
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

          

          <div className="mt-4 ">
            <Button color="gray" pill={true}>
              <Save className="h-5 w-5 mr-2" />
              บันทึก
            </Button>
          </div>
        </div>
      </div>
      <Foot/>
    </>
  );
};

export default PieChart;
