// AnotherComponent.tsx

import React from "react";
import { ProfileForm } from "./profileform";
import { Navbar } from "../component/์Navbar";

// Adjust path as per your file structure

const AnotherComponent = () => {
  return (
    <>
      <Navbar />
      <div
        className="mt-7 px-7 py-7 min-h-screen rounded-md"
        style={{
          backgroundImage: "linear-gradient(115deg, #B9F3FC,#F3F8FF,#F9F9F9)",
        }}
      >
        <ProfileForm />
      </div>
    </>
  );
};

export default AnotherComponent;
