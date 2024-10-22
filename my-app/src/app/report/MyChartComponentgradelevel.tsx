import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import axios from "axios";
import { useEffect, useState, useCallback } from "react"; // เพิ่ม useCallback เข้ามาด้วย
import { Button } from "@/components/ui/button";
import { useCurrentPng } from 'recharts-to-png'; // ใช้ useCurrentPng จาก recharts-to-png
import FileSaver from 'file-saver'; // ใช้ FileSaver

interface gradelevel {
  gradelevel: string;
  gradelevel_count: number;
}
interface bachelordegre {
  class_year: string;
  count_class_year: number;
}

async function graphlist(
  startdate: string,
  enddate: string
): Promise<gradelevel[]> {
  const apiUrl = `https://entaneermindbackend.onrender.com/api/graph/appointment-for-grade-level`;

  try {
    const response = await axios.post(apiUrl, {
      startdate,
      enddate,
    });
    return response.data;
  } catch (error) {
    console.error("Can't get graphlist", error);
    return [];
  }
}

async function graphbachelordegre(
  startdate: string,
  enddate: string
): Promise<bachelordegre[]> {
  const apiUrl = `https://entaneermindbackend.onrender.com/api/graph/graphappointmentforbachelordegree`;

  try {
    const response = await axios.post(apiUrl, {
      startdate,
      enddate,
    });   
    return response.data;
  } catch (error) {
    console.error("Can't get graphlist", error);
    return [];
  }
}

const chartConfig: ChartConfig = {
  gradelevel_count: {
    color: "#6B84F4",
  },
  bachelordegre: {
    color: "#6B84F4",
  },
};

interface MyChartComponentsProps {
  startDate: Date | null;
  endDate: Date | null;
}

export function MyChartComponentgradelevel({
  startDate,
  endDate,
}: MyChartComponentsProps) {
  const [chartData, setChartData] = useState<gradelevel[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const toggleSort = () => {
    const sortedData = [...chartData].sort((a, b) => {
      if (isSorted) {
        return a.gradelevel_count - b.gradelevel_count; // Ascending
      } else {
        return b.gradelevel_count - a.gradelevel_count; // Descending
      }
    });
    setChartData(sortedData);
    setIsSorted(!isSorted);
  };

    // สร้างตัวดึง PNG จากกราฟที่เราสร้างขึ้น
    const [getPng, { ref, isLoading }] = useCurrentPng();

    // ฟังก์ชันการดาวน์โหลด PNG เมื่อคลิกปุ่ม
    const handleDownload = useCallback(async () => {
      const png = await getPng();
  
      // ตรวจสอบว่าค่า png ไม่ใช่ undefined
      if (png) {
        // บันทึก PNG ด้วย FileSaver
        FileSaver.saveAs(png, 'GradeLevelChart.png');
      }
    }, [getPng]);

  useEffect(() => {
    const fetchData = async () => {
      if (startDate && endDate) {
        const data = await graphlist(
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0]
        );
        setChartData(data);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  return (
    <div>
      <Card style={{ margin: "10px 30px 0 0" }}>
        <CardHeader>
          <CardTitle>จำนวนผู้รับบริการแต่ละชั้นปี</CardTitle>
          <div className="flex justify-between w-full">
            <div>
              <Button onClick={toggleSort} className="bg-[#5044e4] mt-5">
                เรียงลำดับ
              </Button>
            </div>
            <div>
              <Button
                onClick={handleDownload}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
              >
                {isLoading ? 'กำลังบันทึก' : 'บันทึกกราฟ'}
              </Button>
            </div>
          </div>
          <CardDescription>
            {startDate && endDate && (
              <>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                  .format(startDate)
                  .replace(",", "")}
                {" - "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                  .format(endDate)
                  .replace(",", "")}
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData} ref={ref}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="gradelevel"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 50)}
                interval={0}
                angle={30}
                textAnchor="start"
                height={140}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="gradelevel_count"
                fill={chartConfig.gradelevel_count.color}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}

export function MyChartComponentbachelordegre({
  startDate,
  endDate,
}: MyChartComponentsProps) {
  const [chartData, setChartData] = useState<bachelordegre[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const toggleSort = () => {
    const sortedData = [...chartData].sort((a, b) => {
      if (isSorted) {
        return a.count_class_year - b.count_class_year; // Ascending
      } else {
        return b.count_class_year - a.count_class_year; // Descending
      }
    });
    setChartData(sortedData);
    setIsSorted(!isSorted);
  };


    // สร้างตัวดึง PNG จากกราฟที่เราสร้างขึ้น
    const [getPng, { ref, isLoading }] = useCurrentPng();

    // ฟังก์ชันการดาวน์โหลด PNG เมื่อคลิกปุ่ม
    const handleDownload = useCallback(async () => {
      const png = await getPng();
  
      // ตรวจสอบว่าค่า png ไม่ใช่ undefined
      if (png) {
        // บันทึก PNG ด้วย FileSaver
        FileSaver.saveAs(png, 'BachelorDegreeChart.png');
      }
    }, [getPng]);

  useEffect(() => {
    const fetchData = async () => {
      if (startDate && endDate) {
        const data = await graphbachelordegre(
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0]
        );
        setChartData(data);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  return (
    <div>
      <Card style={{ margin: "10px 30px 0 0" }}>
        <CardHeader>
          <CardTitle>จำนวนผู้รับบริการแต่ละปีการศึกษา</CardTitle>
          <div className="flex justify-between w-full">
            <div>
              <Button onClick={toggleSort} className="bg-[#5044e4] mt-5">
                เรียงลำดับ
              </Button>
            </div>
            <div>
              <Button
                onClick={handleDownload}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5"
              >
                {isLoading ? 'กำลังบันทึก' : 'บันทึกกราฟ'}
              </Button>
            </div>
          </div>
          <CardDescription>
            {startDate && endDate && (
              <>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                  .format(startDate)
                  .replace(",", "")}
                {" - "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
                  .format(endDate)
                  .replace(",", "")}
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart  accessibilityLayer data={chartData} ref={ref}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="class_year"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 50)}
                interval={0}
                angle={30}
                textAnchor="start"
                height={140}
              />
              <YAxis />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="count_class_year"
                fill={chartConfig.bachelordegre.color}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
