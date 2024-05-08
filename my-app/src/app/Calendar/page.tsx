import React from "react";
import { Calendar } from "antd";
type Props = {};
import Nav from "../component/Nav";
import { Foot } from "../component/Footer";

export default function page({}: Props) {
  return (
    <div>
      <Nav />
      <div className="mt-5 mb-5">
        <Calendar />
      </div>
      <Foot />
    </div>
  );
}
