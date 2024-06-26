"use client";
import { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function MyPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());

    const formatDate = (date: Date | undefined): string => {
        if (!date) {
            return "No date selected";
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    return (
        <div>
            <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
            />
            <div>{formatDate(date)}</div>
        </div>
    );
}
