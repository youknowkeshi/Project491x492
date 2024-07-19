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

interface CheckList {
    topic: string;
    click_count: number;
}

async function evaluationform(startdate: string, enddate: string): Promise<CheckList[]> {
    const apiUrl = `/api/clickevaluationform`;



    try {
        const response = await axios.put(apiUrl, {
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

export function Evaluationform({
    startDate,
    endDate,
}: MyChartComponentsProps) {
    const [chartData, setChartData] = useState<CheckList[]>([]);

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
        <div >
            <Card>
                <CardHeader>
                    <CardTitle>จำนวนผู้รับบริการแต่ละชนิดของสุขภาพจิต</CardTitle>
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
                                dataKey="topic"
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
                            <Bar dataKey="click_count" fill={chartConfig.checklist_count.color}  radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}