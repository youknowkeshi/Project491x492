import React from "react";
import { Calendar } from "antd";
import Nav from "../component/Nav";
import { Foot } from "../component/Footer";
import SelectDate from "./SelectData";
type Props = {};

export default function page({}: Props) {
  return (
    <div>
      <div className="mt-5 mb-5">
        <SelectDate />
      </div>
    </div>
  );
}
