"use client";
import React, { useState } from "react";
import { Alert, Calendar } from "antd";
import type { CalendarProps } from "antd";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

// const PanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
//   console.log(value.format("YYYY-MM-DD"), mode);
// };

function SelectDate() {
  const [value, setValue] = useState(() => dayjs("2017-01-25"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2017-01-25"));

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };

  return (
    <>
      <Alert
        message={`You selected date: ${selectedValue?.format("YYYY-MM-DD")}`}
      />
      <Calendar
        value={value}
        onSelect={onSelect}
        onPanelChange={onPanelChange}
      />
    </>
  );
}
export default SelectDate;
