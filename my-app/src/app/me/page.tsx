"use client"
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { WhoAmIResponse } from "../../pages/api/whoAmI";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { log } from "util";



function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}



export default function MePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [cmuAccount, setCmuAccount] = useState("");
  const [studentId, setStudentId] = useState("");
  const [organization_name, setorganization_name] = useState("");
  const [itaccounttype_EN, setitaccounttype_EN] = useState("");
  const [checkstudent, setcheckstudent] = useState("")
  const [errorMessage, setErrorMessage] = useState("");

  function getUsers() {
    axios
      .get<{}, AxiosResponse<WhoAmIResponse>, {}>("/api/whoAmI")
      .then((response) => {


        if (response.data.ok) {
          setFullName(response.data.firstName + " " + response.data.lastName);
          setCmuAccount(response.data.cmuAccount);
          setStudentId(response.data.studentId ?? "No Student Id");
          setorganization_name(response.data.organization_name_EN);
          setitaccounttype_EN(response.data.itaccounttype_EN);

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

  async function addUsers(firstname_lastname: string, cmuaccount: string, studentid: string, organization_name: string, accounttype: string) {

    try {
      const response = await axios.post('http://localhost:3000/api/hello', {

        name: firstname_lastname,
        cmuaccount: cmuaccount,
        studentid: studentid,
        organization_name: organization_name,
        accounttype: accounttype
      }
      );
    } catch (error) {
      console.log(error);
    }
  }

  async function searchdata() {
    try {
      const getrespone = await axios.get('http://localhost:3000/api/checkdata')
        .then(response => {
          if (response.data ){
            setcheckstudent(response.data.temp.studentid)
          } else {
          }
        })




    } catch (error) {
      console.log("My error", error)
    }

  }

  function register() {
    router.push("/register");
  }

  function home() {
    router.push("/home");
  }



  useEffect(() => {
    searchdata()
    getUsers()
    if (studentId && fullName && cmuAccount && organization_name && itaccounttype_EN ) {
      if (checkstudent) {
        //console.log("found");
        home()
      } else {
        //console.log("not found");
        addUsers(fullName, cmuAccount, studentId, organization_name, itaccounttype_EN)
        register()
      }

    }

  }, [fullName, cmuAccount, studentId, organization_name, itaccounttype_EN, checkstudent]);



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
      <p>organize: {organization_name}</p>
      <p>{itaccounttype_EN}</p>
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
