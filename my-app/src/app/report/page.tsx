"use client";
import React, { useState, useEffect, useRef } from "react";
import { MyChartComponents } from "./MyChartComponent";
import { StartDatePicker } from "./startDate";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComponentDrawer } from "../component/Drawer";
import { Navbaradmin } from "../component/Navbaradmin";

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <>
      <div className="min-h-full">
        <Navbaradmin />
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                กราฟแสดงจำนวนผู้รับบริการแต่ละสาขา
              </h1>
            </div>
            <ComponentDrawer />
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mt-5 ">
              <div className="mx-auto flex justify-center">
                <div className="flex flex-wrap gap-4">
                  <StartDatePicker
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                  />
                </div>
              </div>
              <div className="  mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 gap-12 mt-1">
                <MyChartComponents
                  startDate={startDate ?? null}
                  endDate={endDate ?? null}
                />
              </div>

            </div>

          </main>
        </div>
      </div>
    </>
  );
}
