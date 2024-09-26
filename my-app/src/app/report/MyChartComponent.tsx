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
import { Button } from "@/components/ui/button";

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

  useEffect(() => {
    const fetchData = async () => {
      if (startDate && endDate) {
        const data = await graphmajor(
          startDate.toISOString().split("T")[0],
          endDate.toISOString().split("T")[0]
        );
        setChartData(data);
      }
    };
    fetchData();
  }, [startDate, endDate]);

  return (
    <div >
      <div>
        <Button onClick={toggleSort} className="bg-[#5044e4]" >
          เรียงลำดับ
        </Button>
      </div>

      <Card style={{ margin: '10px 30px 0 0' }}>
        <CardHeader>
          <CardTitle>จำนวนผู้รับบริการแต่ละสาขา</CardTitle>
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
            <BarChart accessibilityLayer data={chartData}>
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
