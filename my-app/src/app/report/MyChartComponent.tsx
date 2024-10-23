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

interface Major {
  major: string;
  major_count: number;
}

async function graphmajor(
  startdate: string,
  enddate: string
): Promise<Major[]> {
  const apiUrl = `https://entaneermindbackend.onrender.com/api/graph/graphappointmentformajor`;

  try {
    const response = await axios.post(apiUrl, {
      startdate,
      enddate,
    });
    return response.data;
  } catch (error) {
    console.error("Can't get graphmajor", error);
    return [];
  }
}

const chartConfig: ChartConfig = {
  major_count: {
    color: "#6B84F4",
  },
};

interface MyChartComponentsProps {
  startDate: Date | null;
  endDate: Date | null;
}

export function MyChartComponents({
  startDate,
  endDate,
}: MyChartComponentsProps) {
  const [chartData, setChartData] = useState<Major[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const toggleSort = () => {
    const sortedData = [...chartData].sort((a, b) => {
      if (isSorted) {
        return a.major_count - b.major_count; // Ascending
      } else {
        return b.major_count - a.major_count; // Descending
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
      FileSaver.saveAs(png, 'MajormyChart.png');
    }
  }, [getPng]);

  function formatToLocalISOString(dateString: Date): string {
    const date = new Date(dateString);
    const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000); // ปรับให้เป็นเวลาโซนท้องถิ่น
    const isoString = localDate.toISOString().split('.')[0]; // ตัดมิลลิวินาทีออก
    const timezoneOffset = -date.getTimezoneOffset(); // โซนเวลาในนาที
    const sign = timezoneOffset >= 0 ? '+' : '-';
    const hours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
    const minutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
    
    return `${isoString}${sign}${hours}:${minutes}`;
}

  useEffect(() => {
    const fetchData = async () => {
      if (startDate && endDate) {
        const data = await graphmajor(
          formatToLocalISOString(startDate),
          formatToLocalISOString(endDate)
        );
        setChartData(data);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  return (
    <div >


      <Card style={{ margin: '10px 30px 0 0' }} >
        <CardHeader>
          <CardTitle>จำนวนผู้รับบริการแต่ละสาขา</CardTitle>
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
                dataKey="major"
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
                dataKey="major_count"
                fill={chartConfig.major_count.color}
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
