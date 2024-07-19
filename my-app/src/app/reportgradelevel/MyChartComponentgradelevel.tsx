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

interface gradelevel {
    gradelevel: string;
    gradelevel_count: number;
}
interface bachelordegre {
    class_year: string;
    count_class_year: number;
}

async function graphlist(startdate: string, enddate: string): Promise<gradelevel[]> {
    const apiUrl = `/api/graphappointmentforgradelevl`;

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

async function graphbachelordegre(startdate: string, enddate: string): Promise<bachelordegre[]> {
    const apiUrl = `/api/graphappointmentforbachelordegree`;

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
    gradelevel_count: {
        color: "#6B84F4",
    },
    bachelordegre: {
        color: "#1a33eb",
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
        <div >
            <Card>
                <CardHeader>
                    <CardTitle>จำนวนผู้รับบริการแต่ละชั้นปี</CardTitle>
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
                                dataKey="gradelevel"
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
                            <Bar dataKey="gradelevel_count" fill={chartConfig.gradelevel_count.color}  radius={4} />
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
        <div >
            <Card>
                <CardHeader>
                    <CardTitle>จำนวนผู้รับบริการแต่ละปีการศึกษา</CardTitle>
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
                                dataKey="class_year"
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
                            <Bar dataKey="count_class_year" fill={chartConfig.bachelordegre.color}  radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}
