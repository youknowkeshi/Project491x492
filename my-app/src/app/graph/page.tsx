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
import { Checkbox, Label, Navbar, Modal } from "flowbite-react";
import Nav from "../component/Nav";
import { Foot } from "../component/Footer";
import { Save } from "lucide-react";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import PieChart from "./PieChart";
import { DatePickerWithRange } from "./DatePicker";

interface chart {
  personid:string;
  major: string;
  gradelevel: string;
  details_consultation: string;
  mental_health_checklist: string;
  start_datetime: string;
  end_datetime:string;

}

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

// export function DatePickerWithRange({
//   className,
// }: React.HTMLAttributes<HTMLDivElement>) {
//   const [date, setDate] = useState<DateRange | undefined>({
//     from: new Date(2022, 0, 20),
//     to: addDays(new Date(2022, 0, 20), 20),
//   });

//   return (
//     <div className={cn("grid gap-2", className)}>
//       <Popover>
//         <PopoverTrigger asChild>
//           <Button
//             id="date"
//             variant={"outline"}
//             className={cn(
//               "w-[300px] justify-start text-left font-normal",
//               !date && "text-muted-foreground"
//             )}
//           >
//             <CalendarIcon className="mr-2 h-4 w-4" />
//             {date?.from ? (
//               date.to ? (
//                 <>
//                   {format(date.from, "LLL dd, y")} -{" "}
//                   {format(date.to, "LLL dd, y")}
//                 </>
//               ) : (
//                 format(date.from, "LLL dd, y")
//               )
//             ) : (
//               <span>Pick a date</span>
//             )}
//           </Button>
//         </PopoverTrigger>
//         <PopoverContent className="w-auto p-0" align="start">
//           <Calendar
//             initialFocus
//             mode="range"
//             defaultMonth={date?.from}
//             selected={date}
//             onSelect={setDate}
//             numberOfMonths={2}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// }
type PieChartData = {
  labels: string[];
  datasets: {
    data: number[];
    backgroundColor: string[];
  }[];
};

type BarChartData = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
  }[];
};
type CheckedItems = {
  showGraphsCheckbox: boolean;
  [key: string]: boolean; // เพิ่มบรรทัดนี้เพื่อรองรับคีย์อื่นๆ
};
const Graph = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);


  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    setCheckedItems(prevState => ({
      ...prevState,
      [id]: checked,
    }));

    if (checked) {
      setShowGraphs(true);
      informaforgraph();
    } else {
      setShowGraphs(false);
    }
  };

  const [temp, setTemp] = useState<chart[]>([])
  const [openModal, setOpenModal] = useState(false);
  const [pieData, setPieData] = useState<PieChartData | null>(null);
  const [barData, setBarData] = useState<BarChartData | null>(null);
  const [showGraphs, setShowGraphs] = useState(false);
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({
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

  async function informaforgraph() {
    try {
      const apiURL = "http://localhost:3000/api/graph";
      const response = await axios.get(apiURL);
      const data = response.data;
      console.log(response.data);

      setTemp(data)

      // setPieData({
      //   labels: data.pie.labels,
      //   datasets: [
      //     {
      //       data: data.pie.values,
      //       backgroundColor: data.pie.colors,
      //     },
      //   ],
      // });

      // setBarData({
      //   labels: data.bar.labels,
      //   datasets: [
      //     {
      //       label: data.bar.label,
      //       data: data.bar.values,
      //       backgroundColor: data.bar.colors,
      //     },
      //   ],
      // });
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    informaforgraph();
  }, []);

  return (
    <>

      
      <Nav />

      <div>
      {temp.length > 0 ? (
        temp.map((item, index) => (
          <div key={index}>
            <p>Person ID: {item.personid}</p>
            <p>Major: {item.major}</p>
            <p>Grade Level: {item.gradelevel}</p>
            <p>Details Consultation: {item.details_consultation}</p>
            <p>Mental Health Checklist: {item.mental_health_checklist}</p>
            <p>Start DateTime: {item.start_datetime}</p>
            <p>End DateTime: {item.end_datetime}</p>
          </div>
        ))
      ) : (
        <div>No data available</div>
      )}
    </div>
      <div className="flex flex-col justify-center p-5 space-y-4">
        <div className="shadow-lg rounded-lg bg-gray-50 p-5 overflow-hidden">
          <div className="flex flex-wrap space-x-4 mb-4 justify-center">
            <div className="container mx-auto">
              <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                <div className="w-full lg:w-full flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center">
                  <h1 className="text-green-500 text-3xl mb-3">Welcome</h1>
                  <div className="flex gap-4">
                    <DatePickerWithRange></DatePickerWithRange>
                    <Button onClick={() => setOpenModal(true)}>
                      กรุณาเลือก
                    </Button>
                  </div>
                  <Modal
                    className=""
                    show={openModal}
                    size={"7xl"}
                    onClose={() => setOpenModal(false)}
                  >
                    <Modal.Header>กรุณาเลือก</Modal.Header>
                    <Modal.Body>
                      <div className="space-y-7">
                        <div className="flex justify-between">
                          <div className="w-1/3 pr-2">
                            <Label className="block text-lg font-medium text-gray-700 mb-4">
                              ประเด็นสุขภาพจิต
                            </Label>
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
                                <Label
                                  htmlFor="Willpower_test_score"
                                  className="flex"
                                >
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
                                  checked={
                                    checkedItems.Relationship_problems_with_friends
                                  }
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
                                <Label htmlFor="substance_use">
                                  การใช้สารเสพติด
                                </Label>
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
                                  อาการทางกาย
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="Study_problems"
                                  checked={checkedItems.Study_problems}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="Study_problems">
                                  ปัญหาการเรียน
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
                                  ปัญหาความสัมพันธ์ในครอบครัว
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="Grieving_loss"
                                  checked={checkedItems.Grieving_loss}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="Grieving_loss">
                                  เศร้าโศกต่อการสูญเสีย
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="emotional_wound"
                                  checked={checkedItems.emotional_wound}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="emotional_wound">
                                  มีบาดแผลทางใจ/มีประสบการณ์ที่กระทบกระเทือนจิตใจอย่างรุนแรง
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="Personality_problems"
                                  checked={checkedItems.Personality_problems}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="Personality_problems">
                                  ปัญหาบุคลิกภาพ
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="self_development"
                                  checked={checkedItems.self_development}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="self_development">
                                  การพัฒนาตัวเอง
                                </Label>
                              </div>
                            </div>
                          </div>
                          <div className="w-1/3 pr-2">
                            <Label className="block text-lg font-medium text-gray-700 mb-4">
                              ปัญหาด้านการเรียน
                            </Label>
                            <div
                              className="p-4 max-h-60 overflow-y-auto flex flex-col gap-4"
                              id="checkbox"
                            >
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="computer"
                                  checked={checkedItems.computer}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="computer">
                                  วิศวกรรมคอมพิวเตอร์
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="mechanical"
                                  checked={checkedItems.mechanical}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="mechanical">
                                  วิศวกรรมเครื่องกล
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="electrical"
                                  checked={checkedItems.electrical}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="electrical">
                                  วิศวกรรมไฟฟ้า
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="industrial"
                                  checked={checkedItems.industrial}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="industrial">
                                  วิศวกรรมอุตสาหการ
                                </Label>
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
                                <Label htmlFor="Environmental">
                                  วิศวกรรมสิ่งแวดล้อม
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="Mining"
                                  checked={checkedItems.Mining}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="Mining">
                                  วิศวกรรมเหมืองแร่
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="Ai"
                                  checked={checkedItems.Ai}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="Ai">
                                  วิศวกรรมปัญญาประดิษฐ์
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="Integrated"
                                  checked={checkedItems.Integrated}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="Integrated">
                                  วิศวกรรมหุ่นยนต์และระบบอัตโนมัติ
                                </Label>
                              </div>
                            </div>
                          </div>
                          <div className="w-1/3 pr-2">
                            <Label className="block text-lg font-medium text-gray-700 mb-4">
                              ระดับชั้น
                            </Label>
                            <div
                              className="p-4 max-h-60 overflow-y-auto flex flex-col gap-4"
                              id="checkbox"
                            >
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
                                <Label htmlFor="master">มหาบัณฑิต</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="grandmaster"
                                  checked={checkedItems.grandmaster}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="grandmaster">ดุษฎีบัณฑิต</Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="professor"
                                  checked={checkedItems.professor}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="professor">
                                  อาจารย์/เจ้าหน้าที่
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="personnel"
                                  checked={checkedItems.personnel}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="personnel">
                                  บุคลากรภายนอก/ศิษย์เก่า
                                </Label>
                              </div>
                              <div className="flex items-center gap-2">
                                <Checkbox
                                  id="none"
                                  checked={checkedItems.none}
                                  onChange={handleCheckboxChange}
                                />
                                <Label htmlFor="none">
                                  ไม่ใช่บุคลากร/นักศึกษา
                                </Label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-full flex justify-end">
                          <Button
                            color="gray"
                            onClick={() => setOpenModal(false)}
                          >
                            Done
                          </Button>
                        </div>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
          </div>
          {/* chart */}
          <div className="flex flex-row justify-start p-5 gap-y-4">
            <div className="shadow-lg rounded-lg bg-gray-50 p-5 overflow-hidden">
              <div>
                <label>
                  <input
                    type="checkbox"
                    id="showGraphsCheckbox"
                    checked={checkedItems["showGraphsCheckbox"] || false}
                    onChange={handleCheckboxChange}
                  />
                  Show Graphs
                </label>

                {showGraphs && pieData && barData && (
                  <div>
                    <Pie data={pieData} />
                    <Bar data={barData} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Graph;
