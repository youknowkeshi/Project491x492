import React from "react";
import { MyChartComponents } from "./MyChartComponent";
import { Nav } from "../component/Nav";
import { StartDatePicker } from "./startDate";
import { Card } from "@/components/ui/card";
import { DropdownCheckboxForm } from "./DropdownCheckbox";
import { Button } from "@/components/ui/button";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <Nav />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Dashboard
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="grid gap-14 grid-cols-2 mt-10">
            <Card className="flex  basis-1/2 px-7 py-7">
              <StartDatePicker />
              <DropdownCheckboxForm />
              <Button variant="destructive">Destructive</Button>
            </Card>
          </div>
          <div className="grid mt-14 gap-14 grid-cols-2 grid-rows-2 ">
            <MyChartComponents />
            <MyChartComponents />
          </div>
        </div>
      </main>
    </>
  );
}
