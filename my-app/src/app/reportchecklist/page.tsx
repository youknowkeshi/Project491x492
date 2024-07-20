"use client";
import React, { useState, useEffect, useRef } from "react";

import { StartDatePicker } from "./startDate";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MyChartComponentsList } from "./MyChartComponentList";
import { ComponentDrawer } from "../component/Drawer";
import { Navbar } from "../component/์Navbar";
import { AreaChartList } from "./AreaChart";
import { StartDatePicker2 } from "./startDatecompare"

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [startDatePast, setStartDatePast] = useState<Date | undefined>();
  const [endDatePast, setEndDatePast] = useState<Date | undefined>();
  const [startDateCurrent, setStartDateCurrent] = useState<Date | undefined>();
  const [endDateCurrent, setEndDateCurrent] = useState<Date | undefined>();

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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="min-h-full">
        <Navbar />
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                กราฟแสดงจำนวนผู้รับบริการแต่ละชนิดของสุขภาพจิต
              </h1>
            </div>
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

                  <div className="relative" ref={dropdownRef}>
                    <Button
                      id="dropdownSearchButton"
                      onClick={toggleDropdown}
                      variant={"outline"}
                      type="button"
                    >
                      เลือกชนิดของสุขภาพจิต
                      <svg
                        className="w-2.5 h-2.5 ms-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </Button>
                    {isOpen && (
                      <div
                        id="dropdownSearch"
                        className="z-10 bg-white rounded-lg shadow w-60 dark:bg-gray-700 absolute mt-2"
                      >
                        <div className="p-3">
                          <label
                            htmlFor="input-group-search"
                            className="sr-only"
                          >
                            Search
                          </label>
                          <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                              <svg
                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                />
                              </svg>
                            </div>
                            <input
                              type="text"
                              id="input-group-search"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              placeholder="Search user"
                            />
                          </div>
                        </div>
                        <ul
                          className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
                          aria-labelledby="dropdownSearchButton"
                        >
                          {[
                            "Bonnie Green",
                            "Jese Leos",
                            "Michael Gough",
                            "Robert Wall",
                            "Joseph Mcfall",
                            "Leslie Livingston",
                            "Roberta Casas",
                          ].map((user, index) => (
                            <li key={index}>
                              <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                <input
                                  id={`checkbox-item-${index + 11}`}
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                />
                                <label
                                  htmlFor={`checkbox-item-${index + 11}`}
                                  className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                                >
                                  {user}
                                </label>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <a
                          href="#"
                          className="flex items-center p-3 text-sm font-medium text-red-600 border-t border-gray-200 rounded-b-lg bg-gray-50 dark:border-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-red-500 hover:underline"
                        >
                          <svg
                            className="w-4 h-4 me-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 18"
                          >
                            <path d="M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z" />
                          </svg>
                          Delete user
                        </a>
                      </div>
                    )}
                  </div>
                  <Button className="bg-[#5044e4]"> เลือก </Button>
                </div>
              </div>


              <div className="  mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 gap-12 ">
                <MyChartComponentsList
                  startDate={startDate ?? null}
                  endDate={endDate ?? null}
                />

              </div>
              <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 mt-5 ">
                <div className="mx-auto flex justify-center">
                  <div className="flex flex-wrap gap-10">
                    <StartDatePicker2
                      startDatePast={startDatePast}
                      setStartDatePast={setStartDatePast}
                      endDatePast={endDatePast}
                      setEndDatePast={setEndDatePast}
                      startDateCurrent={startDateCurrent}
                      setStartDateCurrent={setStartDateCurrent}
                      endDateCurrent={endDateCurrent}
                      setEndDateCurrent={setEndDateCurrent}
                    />
                  </div>
                </div>
              </div>


              <div className="  mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 gap-12 ">
                <AreaChartList
                  startDatePast={startDatePast ?? null}
                  endDatePast={endDatePast ?? null}
                  startDateCurrent={startDateCurrent ?? null}
                  endDateCurrent={endDateCurrent ?? null}
                />
              </div >

            </div>
            <ComponentDrawer />
          </main>
        </div>
      </div>
    </>
  );
}
