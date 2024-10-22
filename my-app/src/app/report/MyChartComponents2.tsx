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

interface CheckList {
  checklist_category: string;
  checklist_count: number;
}

async function graphlist(
  startdate: string,
  enddate: string
): Promise<CheckList[]> {
  const apiUrl = `https://entaneermindbackend.onrender.com/api/graph/mental-health-checklist`;

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
  checklist_count: {
    color: "#6B84F4",
  },
};

interface MyChartComponentsProps {
  startDate: Date | null;
  endDate: Date | null;
}

export function MyChartComponentsList({
  startDate,
  endDate,
}: MyChartComponentsProps) {
  const [chartData, setChartData] = useState<CheckList[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);

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

  const toggleSort = () => {
    const sortedData = [...chartData].sort((a, b) => {
      if (isSorted) {
        return a.checklist_count - b.checklist_count; // Ascending
      } else {
        return b.checklist_count - a.checklist_count; // Descending
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
        FileSaver.saveAs(png, 'TypesOfMentalHealthChart.png');
      }
    }, [getPng]);

  return (
    <div>
      <Card style={{ margin: "10px 30px 0 0" }}>
        <CardHeader>
          <CardTitle>จำนวนผู้รับบริการแต่ละชนิดของสุขภาพจิต</CardTitle>
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
                {new Intl.DateTimeFormat("th-TH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(startDate)}
                {" - "}
                {new Intl.DateTimeFormat("th-TH", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                }).format(endDate)}
              </>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={chartData} ref={ref}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="checklist_category"
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
                dataKey="checklist_count"
                fill={chartConfig.checklist_count.color}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
