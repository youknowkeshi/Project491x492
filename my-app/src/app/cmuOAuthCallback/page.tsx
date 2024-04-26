"use client"
import axios, { AxiosError } from "axios";
import { SignInResponse } from "../../pages/api/signIn"
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useState, useEffect } from 'react'

export default function CMUOAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams()
  const code = searchParams?.get("code")
  const [message, setMessage] = useState("");
    
  
  useEffect(() => {
    if (!code) return;

    axios
      .post<SignInResponse>("/api/signIn", { authorizationCode: code })
      .then((resp) => {
        if (resp.data.ok) {
          router.push("./me");
        }
      })
      .catch((error: AxiosError<SignInResponse>) => {
        if (!error.response) {
          setMessage(
            "Cannot connect to CMU OAuth Server. Please try again later."
          );
        } else if (!error.response.data.ok) {
          setMessage(error.response.data.message);
        } else {
          setMessage("Unknown error occurred. Please try again later.");
        }
      });
  }, [code,]);

  return <div className="p-3">{message || "Redirecting ..."}</div>;
}
