import React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

interface StartDatePickerProps {
    startDatePast: Date | undefined;
    setStartDatePast: (date: Date | undefined) => void;
    endDatePast: Date | undefined;
    setEndDatePast: (date: Date | undefined) => void;
    startDateCurrent: Date | undefined;
    setStartDateCurrent: (date: Date | undefined) => void;
    endDateCurrent: Date | undefined;
    setEndDateCurrent: (date: Date | undefined) => void;
}

export function StartDatePicker2({
    startDatePast,
    setStartDatePast,
    endDatePast,
    setEndDatePast,
    startDateCurrent,
    setStartDateCurrent,
    endDateCurrent,
    setEndDateCurrent,
}: StartDatePickerProps) {
    return (
        <div className="flex gap-5">
            <div className="flex gap-0">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[140px] justify-start text-left font-normal",
                                !startDatePast && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDatePast ? (
                                format(startDatePast, "EEE, d MMM, yyyy")
                            ) : (
                                <span>เริ่มต้น</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={startDatePast}
                            onSelect={setStartDatePast}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[140px] justify-start text-left font-normal",
                                !endDatePast && "text-muted-foreground"
                            )}
                            // Ensure margin-left only for endDate Button
                            style={{ marginLeft: "1rem" }}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDatePast ? format(endDatePast, "EEE, d MMM, yyyy") : <span>สิ้นสุด</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={endDatePast}
                            onSelect={setEndDatePast}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>

            <div className="flex gap-0">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[140px] justify-start text-left font-normal",
                                !startDateCurrent && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {startDateCurrent ? (
                                format(startDateCurrent, "EEE, d MMM, yyyy")
                            ) : (
                                <span>เริ่มต้น</span>
                            )}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={startDateCurrent}
                            onSelect={setStartDateCurrent}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[140px] justify-start text-left font-normal",
                                !endDateCurrent && "text-muted-foreground"
                            )}
                            // Ensure margin-left only for endDate Button
                            style={{ marginLeft: "1rem" }}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {endDateCurrent ? format(endDateCurrent, "EEE, d MMM, yyyy") : <span>สิ้นสุด</span>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={endDateCurrent}
                            onSelect={setEndDateCurrent}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>
            </div>
        </div>

    );
}
