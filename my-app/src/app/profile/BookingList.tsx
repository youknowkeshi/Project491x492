"use client";

import React, { useState } from "react";
import { Card, Button } from "antd";

function BookingList() {
  const [visible, setVisible] = useState(true);

  const handleCancel = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <Card className="mt-7 relative">
      <div className="flex flex-col md:flex-row items-center">
        <img
          src="https://www.wellingtonregional.com/sites/wellingtonregional.com/files/doctors_visit_1200x900.jpg"
          alt="Doctor Visit"
          className="w-1/2 md:w-1/4 lg:w-1/6 border rounded-lg md:ml-4"
        />

        <div className="flex flex-col gap-4 p-5 text-center md:text-left">
          <h2 className="font-bold text-[18px]">Dr : Pongtante Namsawat</h2>
          <h2>Room 1, Faculty of Engineering</h2>
          <h2>Time : 9.00-10.00</h2>
          <h2>Appointment : 16-Feb-2024</h2>
        </div>
      </div>

      <Button
        type="primary"
        danger
        className="absolute bottom-4 right-4"
        onClick={handleCancel}
      >
        Cancel
      </Button>
    </Card>
  );
}

export default BookingList;
