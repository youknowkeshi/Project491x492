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
  return (
    <div className=" flex">
      <div className="w-[180px] p-0">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[140px] justify-start text-left font-normal",
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
          <PopoverContent className="w-[280px] p-0"> {/* กำหนดความกว้างที่เหมาะสม */}
            <Calendar
              mode="single"
              selected={startDate}
              onSelect={(date) => setStartDate(date ?? undefined)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>


      <div className="w-[180px] p-0">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[140px] justify-start text-left font-normal",
                !endDate && "text-muted-foreground ml-4"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {endDate ? format(endDate, "EEE, d MMM, yyyy") : <span>สิ้นสุด</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[280px] p-0"> {/* กำหนดความกว้างที่เหมาะสม */}
            <Calendar
              mode="single"
              selected={endDate}
              onSelect={(date) => setEndDate(date ?? undefined)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

    </div>
  );
}
