"use client";
import { Button, Card } from "flowbite-react";
import React from "react";
import { Modal } from "flowbite-react";
import { useState } from "react";

function list() {
  return (
    <div>
      <h1 className="mt-7 text-xl tracking-tight text-gray-900 dark:text-white ml-1">
        Appointment List
      </h1>
      <Card className="mt-7 mb-4 p-4 shadow-md">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Time : 9.00 - 10.00
        </h5>
        <hr></hr>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Name : Pongtanate Namsawat
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Student ID : 630612106
        </p>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Facebook : URL
        </p>
        <Button gradientMonochrome="failure">Cancle</Button>
      </Card>
    </div>
  );
}

export default list;
