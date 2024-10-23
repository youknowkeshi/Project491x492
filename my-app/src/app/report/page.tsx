"use client";
import React, { useState, useEffect, useRef } from "react";
import { MyChartComponents } from "./MyChartComponent";
import { StartDatePicker } from "./startDate";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ComponentDrawer } from "../component/Drawer";
import { Navbaradmin } from "../component/Navbaradmin";
import { MyChartComponentsList } from "./MyChartComponents2";
import { Evaluationform } from "./Evaluatuinform";
import {
  MyChartComponentbachelordegre,
  MyChartComponentgradelevel,
} from "./MyChartComponentgradelevel";

export default function Page() {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();



  return (
    <>
      <div className="min-h-full">
        <Navbaradmin />
        <div>
          <header className="bg-white shadow">
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-[#8FC1E3]">
                แสดงกราฟ
              </h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mt-5 ">
              <div className="mx-auto flex justify-start">
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
              <div className="  mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 gap-12 mt-1 ">
                <MyChartComponentsList
                  startDate={startDate ?? null}
                  endDate={endDate ?? null}
                />
              </div>
              <div className="  mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 gap-12 ">
                <MyChartComponentgradelevel
                  startDate={startDate ?? null}
                  endDate={endDate ?? null}
                />
              </div>
              <div className="  mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 gap-12 ">
                <MyChartComponentbachelordegre 
                  startDate={startDate ?? null}
                  endDate={endDate ?? null}
                />
              </div>
              <div className="  mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 gap-12 mt-1">
                <Evaluationform
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
