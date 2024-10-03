import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
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

interface CheckList {
  topic: string;
  click_count: number;
}

async function evaluationform(startdate: string, enddate: string): Promise<CheckList[]> {
    const apiUrl = `https://entaneermindbackend.onrender.com/api/graph/graphevaluation`;

  try {
    const response = await axios.post(apiUrl, {
      startdate,
      enddate,
    });
    return response.data;
  } catch (error) {
    console.error("Can't get evaluationform", error);
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

export function Evaluationform({ startDate, endDate }: MyChartComponentsProps) {
  const [chartData, setChartData] = useState<CheckList[]>([]);
  const [isSorted, setIsSorted] = useState<boolean>(false);

  const toggleSort = () => {
    const sortedData = [...chartData].sort((a, b) => {
      if (isSorted) {
        return a.click_count - b.click_count; // Ascending
      } else {
        return b.click_count - a.click_count; // Descending
      }
    });
    setChartData(sortedData);
    setIsSorted(!isSorted);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (startDate && endDate) {
        const data = await evaluationform(
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
          <CardTitle>จำนวนผู้รับบริการแต่ละชนิดของสุขภาพจิต</CardTitle>
          <div>
            <Button onClick={toggleSort} className="bg-[#5044e4]">
              {isSorted ? "Sort Ascending" : "Sort Descending"}
            </Button>
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
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="topic"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 50)}
                interval={0}
                angle={30}
                textAnchor="start"
                height={140}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="click_count"
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
