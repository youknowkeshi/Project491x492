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

interface Major {
  major: string;
  major_count: number;
}

async function graphmajor(
  startdate: string,
  enddate: string
): Promise<Major[]> {
  const apiUrl = `/api/graphappointmentformajor`;

  try {
    const response = await axios.put(apiUrl, {
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
    color: "#2563eb",
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
    <div className="grid grid-cols-2 gap-10">
      <Card>
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
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar
                dataKey="major_count"
                fill="var(--color-desktop)"
                radius={4}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
      <Card className="overflow-y-auto" style={{ maxHeight: "400px" }}>
        <div className="ml-10 mt-10">
          {chartData.length > 0
            ? chartData.map((data, index) => (
                <div key={index}>
                  {data.major}: {data.major_count}
                </div>
              ))
            : ""}
        </div>
      </Card>
    </div>
  );
}
