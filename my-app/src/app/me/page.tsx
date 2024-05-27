"use client"
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { WhoAmIResponse } from "../../pages/api/whoAmI";
import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";




export default function MePage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [cmuAccount, setCmuAccount] = useState("");
  const [studentId, setStudentId] = useState("");
  const [organization_name, setorganization_name] = useState("");
  const [itaccounttype_EN, setitaccounttype_EN] = useState("");
  const [checkstudent, setcheckstudent] = useState("")
  const [errorMessage, setErrorMessage] = useState("");
  const [admindata, setadmindata] = useState("")
  const admin = process.env.NEXT_PUBLIC_ADMIN as string


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
      const response = await axios.post('http://localhost:3000/api/users', {

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

  async function logadmin(firstname_lastname: string, cmuaccount: string, studentid: string, organization_name: string, accounttype: string) {
    try {
      axios.post('http://localhost:3000/api/admin', {

        name: firstname_lastname,
        cmuaccount: cmuaccount,
        studentid: studentid,
        organization_name: organization_name,
        accounttype: accounttype
      }
      );
    } catch (error) {
      console.log("not found admin", error);

    }
  }

  async function admincheck() {
    try {
      axios.put('http://localhost:3000/api/admin', { cmuaccount: cmuAccount })
        .then(response => {
          if (response.data.length > 0) {
            setadmindata(response.data[0].cmuaccount)
          } else {
            console.log("Not found");
          }
        })
    } catch (error) {
      console.log("Error : ", error);

    }
  }

  async function searchdata() {
    try {
      axios.get('http://localhost:3000/api/checkdata')
        .then(response => {
          if (response.data) {
            console.log(response.data.temp.studentid);

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
    router.push("/dashboard");
  }



  function role() {
    getUsers()





    if (studentId && fullName && cmuAccount && organization_name && itaccounttype_EN) {
      if (admin === cmuAccount) {
        logadmin(fullName, cmuAccount, studentId, organization_name, itaccounttype_EN)
        home()
      } else {
        axios.get('http://localhost:3000/api/checkdata')
          .then(response => {
            if (response.data) {
              console.log(response.data.temp.studentid);
              home()
            } else {
              addUsers(fullName, cmuAccount, studentId, organization_name, itaccounttype_EN)
              register()
            }
          })
      }
    }
  }




  useEffect(() => {
    role()
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
    <div>loading...</div>
  );
}
