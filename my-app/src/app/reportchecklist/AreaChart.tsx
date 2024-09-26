import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from "recharts";
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
    checklist_count_past: number;
    checklist_count_current: number;
}

async function graphareachecklist(startdatepast: string, enddatepast: string
    , startdatecurrent: string, enddatecurrent: string): Promise<CheckList[]> {
    const apiUrl = `/api/graphmental_health_checklist`;

    try {
        const response = await axios.post(apiUrl, {
            startdatepast,
            enddatepast,
            startdatecurrent,
            enddatecurrent,
        });
        return response.data;
    } catch (error) {
        console.error("Can't get graphlist", error);
        return [];
    }
}

const chartConfig: ChartConfig = {
    checklist_count_past: {
        color: "#6B84F4",
    },
    checklist_count_current: {
        color: "#ff0000",
    },
};

interface MyChartComponentsProps {
    startDatePast: Date | null;
    endDatePast: Date | null;
    startDateCurrent: Date | null;
    endDateCurrent: Date | null;
}

export function AreaChartList({
    startDatePast,
    endDatePast,
    startDateCurrent,
    endDateCurrent
}: MyChartComponentsProps) {
    const [chartData, setChartData] = useState<CheckList[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            if (startDatePast && endDatePast && startDateCurrent &&  endDateCurrent) {
                const data = await graphareachecklist(
                    startDatePast.toISOString().split("T")[0] ,
                    endDatePast.toISOString().split("T")[0] ,
                    startDateCurrent.toISOString().split("T")[0] ,
                    endDateCurrent.toISOString().split("T")[0] ,
                );
                setChartData(data);
            }
        };
        fetchData();
    }, [startDatePast , endDatePast , startDateCurrent , endDateCurrent]);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>จำนวนผู้รับบริการแต่ละชนิดของสุขภาพจิต เปรียบเทียบ</CardTitle>
                    <CardDescription>
                        {startDatePast && endDatePast && (
                            <>
                                {new Intl.DateTimeFormat("th-TH", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })
                                    .format(startDatePast)
                                    .replace(",", "")}
                                {" - "}
                                {new Intl.DateTimeFormat("th-TH", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                })
                                    .format(endDatePast)
                                    .replace(",", "")}
                            </>
                        )}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <AreaChart width={1000} height={700} data={chartData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id="colorPast" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.checklist_count_past.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.checklist_count_past.color} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorCurrnet"x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.checklist_count_current.color} stopOpacity={0.8} />
                                <stop offset="95%" stopColor={chartConfig.checklist_count_current.color} stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <XAxis dataKey="mental_health_checklist"
                            angle={-30}
                            textAnchor="end"
                            height={180}
                        />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area type="monotone" dataKey="checklist_count_past" stroke={chartConfig.checklist_count_past.color} fillOpacity={1} fill="url(#colorPast)" />
                        <Area type="monotone" dataKey="checklist_count_current" stroke={chartConfig.checklist_count_current.color} fillOpacity={1} fill="url(#colorCurrnet)" />
                    </AreaChart>
                </CardContent>
            </Card>
        </div>
    );
}
