"use client";
import React, { useState } from "react";
import { Alert, Button, Calendar, Modal } from "antd";
import type { CalendarProps } from "antd";
import { Dayjs } from "dayjs";
import dayjs from "dayjs";

// const PanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>["mode"]) => {
//   console.log(value.format("YYYY-MM-DD"), mode);
// };

function SelectDate() {
  const [value, setValue] = useState(() => dayjs("2024-01-25"));
  const [selectedValue, setSelectedValue] = useState(() => dayjs("2024-01-25"));

  const onSelect = (newValue: Dayjs) => {
    setValue(newValue);
    setSelectedValue(newValue);
  };
  const onPanelChange = (newValue: Dayjs) => {
    setValue(newValue);
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
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
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
}
export default SelectDate;
