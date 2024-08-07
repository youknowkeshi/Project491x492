"use client"
import React from "react";
import { ProfileForm } from "./profileform";
import { Navbaradminroom2 } from "../component/Navbaradminroom2";

// Adjust path as per your file structure

const AnotherComponent = () => {
  return (
    <>
      <Navbaradminroom2 />
      <div
        className="mt-7 px-7 py-7 min-h-screen rounded-md"
        style={{
          // backgroundImage: "linear-gradient(115deg, #B9F3FC,#F3F8FF,#F9F9F9)",
          backgroundColor:"#F3F8FF"
        }}
      >
        <ProfileForm />
      </div>
    </>
  );
};

export default AnotherComponent;
