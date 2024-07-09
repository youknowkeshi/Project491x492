"use client";
import React, { useState, useEffect , useRef } from "react";
import { Pie, Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   scales,
// } from "chart.js";
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
import { BorderWidthIcon, CalendarIcon } from "@radix-ui/react-icons";
import PieChart from "./PieChart";
import { DatePickerWithRange } from "./DatePicker";
import { data } from "jquery";
import { Chart, BarElement, CategoryScale, LinearScale, ChartOptions, ChartData } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale);
interface chart {
  personid:string;
  major: string;
  gradelevel: string;
  details_consultation: string;
  mental_health_checklist: string;
  start_datetime: string;
  end_datetime:string;

}

// ChartJS.register(
//   ArcElement,
//   Tooltip,
//   Legend,
//   CategoryScale,
//   LinearScale,
//   BarElement
// );

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

    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    informaforgraph();
  }, []);
export default function BarChart() {
    const chartRef = useRef(null)
    useEffect(()=> {
        if(chartRef.current){
            if(chartRef.current.chart){
                chartRef.current.chart.destory()
            }
            const context = chartRef.current.getContext("2d")
            const newChart = new Chart(context,{
                type: "bar",
                data:{
                    Labels: ['john', 'mike'],
                    dataset: [
                        {
                            label: "info",
                        data: [23,56],
                         backgroundColor: [
                        "rgb(255, 99, 256)",
                        "rgb(165, 24, 124)",
                    ],
                    borderColor: [
                        "rgb(231, 126 ,54)",
                        "rgb(136, 56, 210)",
                    ],
                    BorderWidth: 1,
                        },
                      
                    ],
                   
                },
                option:{
                    scales: {
                        x: {
                            type: "category"
                        },
                        y: {
                            beginAtzero: true
                        }
                    }
                }
            });
            chartRef.current.chart = newChart
        }
    
    },[])
  return (
    <div>
      <h2>Bar Chart</h2>
      <canvas ref={chartRef}></canvas>
    </div>

  );
};