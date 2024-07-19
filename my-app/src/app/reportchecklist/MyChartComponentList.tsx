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
      <Card>
        <CardHeader>
          <CardTitle>จำนวนผู้รับบริการแต่ละชนิดของสุขภาพจิต</CardTitle>
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
            <BarChart data={chartData} 
          
            >
              <CartesianGrid vertical={false} 
              />
              <XAxis
                dataKey="mental_health_checklist"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 50)  } 
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
