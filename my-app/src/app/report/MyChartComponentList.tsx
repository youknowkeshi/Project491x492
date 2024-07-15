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
    mental_health_checklist: string;
    checklist_count: number;
}

async function graphmajor(startdate: string, enddate: string): Promise<Major[]> {
    const apiUrl = `/api/graphmental_health_checklist`;

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
    checklist_count: {
        color: "#2563eb",
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
                    <CardTitle>Bar Chart - Multiple</CardTitle>
                    <CardDescription>
                        {startDate && endDate && (
                            <>
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(startDate).replace(',', '')}
                                {' - '}
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(endDate).replace(',', '')}
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
                            <Bar dataKey="checklist_count" fill="var(--color-desktop)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                    <div className="flex gap-2 font-medium leading-none">
                        Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
                    </div>
                    <div className="leading-none text-muted-foreground">
                        Showing total visitors for the last 6 months
                    </div>
                </CardFooter>
            </Card>
            <Card className="grid grid-rows-8 gap-1">
                <div className="ml-10 mt-10">
                    {chartData.length > 0 ? (
                        chartData.map((data, index) => (
                            <div key={index}>
                                {data.mental_health_checklist}: {data.checklist_count}
                            </div>
                        ))
                    ) : (
                        'Nothing'
                    )}
                </div>
            </Card>
        </div>
    );
}