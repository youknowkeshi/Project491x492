"use client";
import React, { useState } from "react";

export default function Email() {
  const [result, setResult] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const sendEmail = () => {
    setLoading(true);
    fetch("./api/email", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => setResult(data))
      .catch((error) => setResult(error))
      .finally(() => setLoading(false));
  };
  return (
    <div className="p-4">
      <div className="my-4">{JSON.stringify(result)}</div>
      {loading && <div className="my-4">Processing...</div>}
      <button onClick={sendEmail} className="bg-red-500 ">
        send email
      </button>
    </div>
  );
}
