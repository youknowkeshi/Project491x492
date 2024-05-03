"use client"
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { WhoAmIResponse } from "../../pages/api/whoAmI";





export default async function Home() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    function signOut() {
        //Call sign out api without caring what is the result
        //It will fail only in case of client cannot connect to server
        //This is left as an exercise for you. Good luck.
        axios.post("/api/signOut").finally(() => {
          router.push("/");
        });
    }
    
  return (
    <div className="p-3 vstack gap-3">

      <h1>Welcome to home</h1>
      <button className="btn btn-danger mb-3" onClick={signOut}>
        {errorMessage ? "Go back" : "Sign out"}
      </button>
      
      
    </div>
  );
}

