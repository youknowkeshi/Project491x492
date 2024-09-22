import React, { useEffect, useState } from "react";
import { format, subMonths, setDate, isAfter } from "date-fns"; // Import necessary functions
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
  startDate: Date | undefined;
  setStartDate: (date: Date | undefined) => void;
  endDate: Date | undefined;
  setEndDate: (date: Date | undefined) => void;
}

export function StartDatePicker({
  startDate,
  setStartDate,
  endDate,
  setEndDate,
}: StartDatePickerProps) {
  // Get today's date
  const today = new Date();

  // Automatically set start date to 1 month before today's date
  useEffect(() => {
    if (!endDate) {
      // Set end date to today
      setEndDate(today);
    }

    if (!startDate && endDate) {
      // Set start date to 1 month before end date
      const defaultStartDate = subMonths(endDate, 1);
      setStartDate(defaultStartDate);
    }
  }, [startDate, endDate, setStartDate, setEndDate, today]);

  return (
    <div className="flex gap-0">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[160px] justify-start text-left font-normal",
              !startDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {startDate ? (
              format(startDate, "EEE, d MMM, yyyy")
            ) : (
              <span>เริ่มต้น</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={startDate}
            onSelect={setStartDate}
            initialFocus
            // Disable future dates
            disabled={(date) => isAfter(date, today)}
          />
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[160px] justify-start text-left font-normal",
              !endDate && "text-muted-foreground"
            )}
            // Ensure margin-left only for endDate Button
            style={{ marginLeft: "1rem" }}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {endDate ? (
              format(endDate, "EEE, d MMM, yyyy")
            ) : (
              <span>สิ้นสุด</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={endDate}
            onSelect={setEndDate}
            initialFocus
            // Disable future dates
            disabled={(date) => isAfter(date, today)}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
