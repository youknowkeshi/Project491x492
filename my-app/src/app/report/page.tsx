import React from "react";
import { MyChartComponents } from "./MyChartComponent";
import { Nav } from "../component/Nav";
import { StartDatePicker } from "./startDate";
import { Card } from "@/components/ui/card";

type Props = {};

export default function page({}: Props) {
  return (
    <>
      <Nav />
      <div className="flex flex-row gap-6">
        <Card className="flex mt-14 basis-1/2 ">
          <div className="flex place-content-center">
            <StartDatePicker />
          </div>
        </Card>
      </div>
      <div className="grid gap-14 grid-cols-2 grid-rows-2 mt-14">
        <MyChartComponents />
        <MyChartComponents />
      </div>
    </>
  );
}
