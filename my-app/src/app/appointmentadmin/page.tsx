"use client";
import React from "react";
import { Navbar } from "../component/์Navbar";
import { DatePicker } from "./datepicker";
import { Button } from "@/components/ui/button";

type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <Navbar />
      <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-indigo-700">
              Appointment
            </h1>
          </div>
        </header>
        <main>
          <div className="w-screen">
            <div className="relative mx-auto mt-10 mb-10 max-w-screen-lg overflow-hidden rounded-xl bg-indigo-700 py-32 text-center shadow-xl shadow-gray-300">
              <h1 className="mt-2 px-8 text-3xl font-bold text-white md:text-5xl">
                Book an appointment
              </h1>
              <p className="mt-6 text-lg text-white">
                Get an appointment with our experienced accountants
              </p>
              <img
                className="absolute top-0 left-0 -z-10 h-full w-full object-cover"
                src="https://images.unsplash.com/photo-1504672281656-e4981d70414b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
                alt=""
              />
            </div>
          </div>
          <div className="mx-auto grid max-w-screen-lg  pb-10">
            <div className="">
              <p className=" text-xl font-bold text-blue-900">
                Select a service
              </p>
              <div className="mt-4 grid max-w-3xl gap-x-4 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_1"
                    type="radio"
                    name="radio"
                    checked
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-indigo-700"></span>
                  <label
                    className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-indigo-700 peer-checked:text-white"
                    htmlFor="radio_1"
                  >
                    <span className="mt-2- font-medium">
                      Financial Planning
                    </span>
                    <span className="text-xs uppercase">1 Hour</span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_2"
                    type="radio"
                    name="radio"
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>

                  <label
                    className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
                    htmlFor="radio_2"
                  >
                    <span className="mt-2 font-medium">
                      Retirement Planning
                    </span>
                    <span className="text-xs uppercase">1 Hour</span>
                  </label>
                </div>
                <div className="relative">
                  <input
                    className="peer hidden"
                    id="radio_3"
                    type="radio"
                    name="radio"
                  />
                  <span className="absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white peer-checked:border-emerald-400"></span>

                  <label
                    className="flex h-full cursor-pointer flex-col rounded-lg p-4 shadow-lg shadow-slate-100 peer-checked:bg-emerald-600 peer-checked:text-white"
                    htmlFor="radio_3"
                  >
                    <span className="mt-2 font-medium">Investment Advice</span>
                    <span className="text-xs uppercase">1 Hour</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto grid max-w-screen-lg  pb-10">
            <p className=" text-xl font-bold text-blue-900">Select a date</p>
            <div className="relative mt-4 w-56">
              <DatePicker />
            </div>
          </div>
          <div className="mx-auto grid max-w-screen-lg  pb-10">
            <p className="text-xl font-bold text-blue-900">Select a time</p>
            <div className="mt-4 grid grid-cols-4 gap-2 lg:max-w-xl">
              <button className="rounded-lg bg-indigo-300 px-4 py-2 font-medium text-white active:scale-95">
                12:00
              </button>
              <button className="rounded-lg bg-indigo-300 px-4 py-2 font-medium text-white active:scale-95">
                14:00
              </button>
              <button className="rounded-lg bg-indigo-700 px-4 py-2 font-medium text-white active:scale-95">
                09:00
              </button>
              <button className="rounded-lg bg-indigo-300 px-4 py-2 font-medium text-white active:scale-95">
                12:00
              </button>
              <button className="rounded-lg bg-indigo-300 px-4 py-2 font-medium text-white active:scale-95">
                15:00
              </button>
              <button className="rounded-lg bg-indigo-300 px-4 py-2 font-medium text-white active:scale-95">
                12:00
              </button>
              <button className="rounded-lg bg-indigo-300 px-4 py-2 font-medium text-white active:scale-95">
                14:00
              </button>
              <button className="rounded-lg bg-indigo-300 px-4 py-2 font-medium text-white active:scale-95">
                12:00
              </button>
              <Button className="mt-7 bg-indigo-700">Submit</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
