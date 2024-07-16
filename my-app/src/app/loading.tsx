import React from "react";

type Props = {};

export default function loading({}: Props) {
  return (
    <div>
      <div className="relative flex justify-center items-centerrr">
        <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
        <img
          src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
          className="rounded-full h-28 w-28 "
        ></img>
      </div>
    </div>
  );
}
