"use client"
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { WhoAmIResponse } from "../../pages/api/whoAmI";
import { NextRequest, NextResponse } from "next/server";



function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}



export default function MePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [cmuAccount, setCmuAccount] = useState("");
  const [studentId, setStudentId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function getUsers(){
    axios
    .get<{}, AxiosResponse<WhoAmIResponse>, {}>("/api/whoAmI")
    .then((response) => {
      
      
      if (response.data.ok) {
        setFullName(response.data.firstName + " " + response.data.lastName);
        setCmuAccount(response.data.cmuAccount);
        setStudentId(response.data.studentId ?? "No Student Id");
        
        
      }

      
    })
    .catch((error: AxiosError<WhoAmIResponse>) => {
      if (!error.response) {
        setErrorMessage(
          "Cannot connect to the network. Please try again later."
        );
      } else if (error.response.status === 401) {
        setErrorMessage("Authentication failed");
      } else if (error.response.data.ok === false) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Unknown error occurred. Please try again later");
      }
    });
    
    
  }

  async function addUsers( name: string, email: string) {

    try {
      const response = await axios.post('http://localhost:3000/api/hello', {
        name: name,
        email: email,
      });
      // res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
      // res.status(error.response.status).json({ message: error.message });
    }
  }
  

  useEffect(() => {
  
   
    getUsers()

    if(studentId && fullName &&cmuAccount){
      addUsers(fullName,cmuAccount)
    }

    
      
      
  }, [fullName, cmuAccount, studentId]);



  function signOut() {
    //Call sign out api without caring what is the result
    //It will fail only in case of client cannot connect to server
    //This is left as an exercise for you. Good luck.
    axios.post("/api/signOut").finally(() => {
      router.push("/");
    });

  



  }

  return (
    <div className="p-3">
      <h1>Hi, {fullName}</h1>
      <p>{cmuAccount}</p>
      <p>{studentId}</p>
      <p className="text-danger">{errorMessage}</p>

      <button className="btn btn-danger mb-3" onClick={signOut}>
        {errorMessage ? "Go back" : "Sign out"}
      </button>

      <p className="text-muted fs-6">
        This is a protected route. You can try to view this page without token.
        It will fail.
      </p>
    </div>
  );
}
