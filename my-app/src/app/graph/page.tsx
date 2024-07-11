"use client";
import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { Dropdown, Checkbox, Label, Button, Navbar } from "flowbite-react";
import { Datepicker } from "flowbite-react";
import { Foot } from "../component/Footer";
import { Save } from "lucide-react";
import axios from "axios";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const PieChart = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [checkedItems, setCheckedItems] = useState({
    Willpower_test_score: false,
    sad_mood: false,
    Have_behaviors: false,
    Social_skills: false,
    Relationship_problems_with_friends: false,
    substance_use: false,
    Panic: false,
    physical_symptoms: false,
    Study_problems: false,
    Relationship_loved: false,
    relationships_family: false,
    Grieving_loss: false,
    emotional_wound: false,
    Personality_problems: false,
    self_development: false,
    computer: false,
    mechanical: false,
    electrical: false,
    industrial: false,
    civil: false,
    Environmental: false,
    Mining: false,
    Ai: false,
    Integrated: false,
    first: false,
    second: false,
    third: false,
    fourth: false,
    master: false,
    grandmaster: false,
    professor: false,
    personnel: false,
    none: false,
  });

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCheckboxChange = (event: {
    target: { id: any; checked: any };
  }) => {
    const { id, checked } = event.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [id]: checked,
    }));
  };

  const chartStyle = {
    width: "100%",
    height: "100%",
    maxWidth: "300px",
    maxHeight: "300px",
  };

  // const [chartData, setChartData] = useState<ChartData<'bar' | 'pie', number[], unknown> | null>(null);

  async function informaforgraph() {
    try {
      const apiURL = "http://localhost:3000/api/graph";
      const response = await axios.get(apiURL);
      const data = response.data;
      console.log(response.data);

      // สมมติว่าข้อมูลที่ได้รับมาจาก API มีโครงสร้างที่เหมาะสม
      // const transformedData = {
      //   labels: data.labels, // ตั้งค่าป้ายชื่อ
      //   datasets: [
      //     {
      //       label: 'Sample Data',
      //       data: data.values, // ตั้งค่าข้อมูล
      //       backgroundColor: [
      //         'rgb(133, 105, 241)',
      //         'rgb(164, 101, 241)',
      //         'rgb(101, 143, 241)',
      //         'rgb(101, 153, 141)',
      //       ],
      //       hoverOffset: 4,
      //     },
      //   ],
      // };
      // setChartData(transformedData);
      console.log(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    informaforgraph();
  }, []);

  return (
    <>
      <div className="flex flex-col justify-center p-5 space-y-4">
        <div className="shadow-lg rounded-lg bg-gray-50 p-5 overflow-hidden">
          {/* Flex container for dropdowns */}
          <div className="flex flex-wrap space-x-4 mb-4 justify-center">
            <Datepicker></Datepicker>
            <Dropdown label="ประเด็นสุขภาพจิต" dismissOnClick={false}>
              <div
                className="p-4 max-h-60 overflow-y-auto flex flex-col gap-4"
                id="checkbox"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Willpower_test_score"
                    checked={checkedItems.Willpower_test_score}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="Willpower_test_score" className="flex">
                    คะแนนแบบวัดพลังใจ
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="sad_mood"
                    checked={checkedItems.sad_mood}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="sad_mood">
                    มีอารมณ์เศร้าอย่างต่อเนื่องหรือมีอาการโรคซึมเศร้า(วินิจฉัยโดยแพทย์)
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Have_behaviors"
                    checked={checkedItems.Have_behaviors}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="Have_behaviors">
                    มีพฤติกรรม/ความคิด เกี่ยวกับความตาย
                    ฆ่าตัวตายหรือทำร้ายตัวเอง
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Social_skills"
                    checked={checkedItems.Social_skills}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="Social_skills">
                    การปรับตัว/ขนาดทักษะทางสังคม
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Relationship_problems_with_friends"
                    checked={checkedItems.Relationship_problems_with_friends}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="Relationship_problems_with_friends">
                    ปัญหาความสัมพันธ์กับเพื่อน
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="substance_use"
                    checked={checkedItems.substance_use}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="substance_use">การใช้สารเสพติด</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Panic"
                    checked={checkedItems.Panic}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="Panic">วิตกกังวล/แพนิค</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="physical_symptoms"
                    checked={checkedItems.physical_symptoms}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="physical_symptoms">
                    มีอาการทางกายซึ่งอาจเป็นผลมาจากสภาวะทางจิตใจ
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Study_problems"
                    checked={checkedItems.Study_problems}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="Study_problems">
                    ปัญหาการเรียน/หมดไฟในการเรียน/อยากเปลี่ยนคณะ
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Relationship_loved"
                    checked={checkedItems.Relationship_loved}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="Relationship_loved">
                    ปัญหาความสัมพันธ์กับคนรัก
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="relationships_family"
                    checked={checkedItems.relationships_family}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="relationships_family">
                    ปัญหาความสัมพันธ์ภายในครอบครัว
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Grieving_loss"
                    checked={checkedItems.Grieving_loss}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="Grieving_loss">เศร้าโศกจากการสูญเสีย</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="emotional_wound"
                    checked={checkedItems.emotional_wound}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="emotional_wound">
                    บาดแผลทางใจ/ประสบการาณ์เลวร้ายในวัยเด็ก
                  </Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Personality_problems"
                    checked={checkedItems.Personality_problems}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="Personality_problems">ปัญหาบุคลิกภาพ</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="self_development"
                    checked={checkedItems.self_development}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="self_development">การพัฒนาตนเอง</Label>
                </div>
              </div>
            </Dropdown>
            <Dropdown label="สาขาวิชา" dismissOnClick={false}>
              <div className="p-4 max-h-60 overflow-y-auto" id="checkbox">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="computer"
                    checked={checkedItems.computer}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="computer">วิศวกรรมคอมพิวเตอร์</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="mechanical"
                    checked={checkedItems.mechanical}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="mechanical">วิศวกรรมเครื่องกล</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="electrical"
                    checked={checkedItems.electrical}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="electrical">วิศวกรรมไฟฟ้า</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="industrial"
                    checked={checkedItems.industrial}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="industrial">วิศวกรรมอุตสาหการ</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="civil"
                    checked={checkedItems.civil}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="civil">วิศวกรรมโยธา</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Environmental"
                    checked={checkedItems.Environmental}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="Environmental">วิศวกรรมสิ่งแวดล้อม</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Mining"
                    checked={checkedItems.Mining}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="Mining">วิศวกรรมเหมืองแร่และวัสดุ</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Ai"
                    checked={checkedItems.Ai}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="Ai">ปัญญาประดิษฐ์</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="Integrated"
                    checked={checkedItems.Integrated}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="Integrated">
                    วิศวกรรมการจัดการและโลจิสติกส์
                  </Label>
                </div>
              </div>
            </Dropdown>
            <Dropdown label="ชั้นปี" dismissOnClick={false}>
              <div className="p-4 max-h-60 overflow-y-auto" id="checkbox">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="first"
                    checked={checkedItems.first}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="first">ชั้นปีที่ 1</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="second"
                    checked={checkedItems.second}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="second">ชั้นปีที่ 2</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="third"
                    checked={checkedItems.third}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="third">ชั้นปีที่ 3</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="fourth"
                    checked={checkedItems.fourth}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="fourth">ชั้นปีที่ 4</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="master"
                    checked={checkedItems.master}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="master">ปริญญาโท</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="grandmaster"
                    checked={checkedItems.grandmaster}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="grandmaster">ปริญญาเอก</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="professor"
                    checked={checkedItems.professor}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="professor">อาจารย์</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="personnel"
                    checked={checkedItems.personnel}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="personnel">บุคลากร</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="none"
                    checked={checkedItems.none}
                    onChange={handleCheckboxChange}
                  />
                  <Label htmlFor="none">บุคคลภายนอก</Label>
                </div>
              </div>
            </Dropdown>
          </div>
          <div className="flex justify-center">
            <Button className="flex items-center">
              <Save className="mr-2 h-4 w-4" />
              บันทึก
            </Button>
          </div>
        </div>
        {/* Chart rendering section */}
        {/* <div style={chartStyle}>
          {chartData ? (
            <>
              <Pie data={chartData} />
              <Bar data={chartData} />
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div> */}
      </div>
      <Foot />
    </>
  );
};

export default PieChart;
