"use client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { SignInResponse } from "../../pages/api/signIn";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { WhoAmIResponse } from "../../pages/api/whoAmI";
import { Button, Modal } from "flowbite-react";
import Loading from "../loading"
import jwt from "jsonwebtoken";
import { setCookie } from "cookies-next";


async function delay() {
  return new Promise((resolve) => {
    setTimeout(resolve);
  });
}



export default function CMUOAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams?.get("code");
  const admin = process.env.NEXT_PUBLIC_ADMIN as string;
  const admin2 = process.env.NEXT_PUBLIC_ADMIN2 as string;
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  async function LogIn() {
    if (!code) return;

    axios
      .post<SignInResponse>("/api/signIn", { authorizationCode: code })
      .then((resp) => {
        if (resp.data.ok) {
          getUsers();

        }
      })
      .catch((error: AxiosError<SignInResponse>) => {
        throw new Error("Unknown error occurred. Please try again later", error);
      });
  }

  function getUsers() {
    axios
      .get<{}, AxiosResponse<WhoAmIResponse>, {}>("/api/whoAmI")
      .then((response) => {
        if (response.data.ok) {
          const fullName =
            response.data.firstName + " " + response.data.lastName;
          const studentId = response.data.studentId ?? '';

          const cmuAccount = response.data.cmuAccount;
          const organization_name = response.data.organization_name_EN;
          const itaccounttype_EN = response.data.itaccounttype_EN;



          if (fullName && cmuAccount && organization_name && itaccounttype_EN) {
            if (admin === cmuAccount || admin2 == cmuAccount) {
              homeadmin();
            } else {
              axios
                .put("http://10.10.12.95:3001/api/user/checklogin", { studentId })
                .then((response) => {
                  // console.log(response.data);
                  
                  if (organization_name == 'Faculty of Engineering') {
                    if (response.data) {
                      home();
                    } else {
                      addUsers(
                        fullName,
                        cmuAccount,
                        studentId,
                        organization_name,
                        itaccounttype_EN
                      );
                      register();
                    }
                  } else {
                    // Faculty that not Engineering
                    handleShow();
                  }
                });

            }
          }
        }
      })
      .catch((error: AxiosError<WhoAmIResponse>) => {
        throw new Error("Unknown error occurred. Please try again later", error);
      });
  }

  async function addUsers(
    firstname_lastname: string,
    cmuaccount: string,
    studentid: string,
    organization_name: string,
    accounttype: string
  ) {
    try {
      await axios.post("http://10.10.12.95:3001/api/user/afterlogin", {
        name: firstname_lastname,
        cmuaccount: cmuaccount,
        studentid: studentid,
        organization_name: organization_name,
        accounttype: accounttype,
      });
    } catch (error) {
      console.log(error);
    }
  }

  function register() {
    router.push("/policy");
  }

  function home() {
    router.push("/dash3");
  }

  function homeadmin() {
    router.push("/List");
  }

  useEffect(() => {
    LogIn();
  }, []);

  return (
    <div className="p-3">

      <Modal dismissible show={!!showModal} onClose={handleClose}>
        <Modal.Body>
          <div className="space-y-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              เว็บไซต์นี้สำหรับคณะวิศวกรรมศาสตร์เท่านั้น
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button gradientMonochrome="failure" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}