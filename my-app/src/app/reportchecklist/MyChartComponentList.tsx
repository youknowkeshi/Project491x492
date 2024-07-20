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
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"; // Assuming you have a Button component

interface CheckList {
  mental_health_checklist: string;
  checklist_count: number;
}

async function graphlist(startdate: string, enddate: string): Promise<CheckList[]> {
  const apiUrl = `/api/graphmental_health_checklist`;

  try {
    const response = await axios.put(apiUrl, {
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

  return (
    <div>
      <div>
          <Button onClick={toggleSort} className="bg-[#5044e4]" >
        {isSorted ? "Sort Ascending" : "Sort Descending"}
      </Button>
      </div>
      
      <Card style={{ margin: '10px 30px 0 0' }}>
        <CardHeader>
          <CardTitle>จำนวนผู้รับบริการแต่ละชนิดของสุขภาพจิต</CardTitle>
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
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <XAxis
                dataKey="mental_health_checklist"
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
              <CartesianGrid strokeDasharray="3 3" />
              <Bar
                dataKey="checklist_count"
                fill={chartConfig.checklist_count.color}
                radius={1}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
