"use client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { SignInResponse } from "../../pages/api/signIn";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { WhoAmIResponse } from "../../pages/api/whoAmI";
import { Button, Modal } from "flowbite-react";

export default function CMUOAuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams?.get("code");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const admin = process.env.NEXT_PUBLIC_ADMIN as string;
  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  function LogIn() {
    if (!code) return;

    axios
      .post<SignInResponse>("/api/signIn", { authorizationCode: code })
      .then((resp) => {
        if (resp.data.ok) {
          getUsers();
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
  }

  function getUsers() {
    axios
      .get<{}, AxiosResponse<WhoAmIResponse>, {}>("/api/whoAmI")
      .then((response) => {
        if (response.data.ok) {
          const fullName =
            response.data.firstName + " " + response.data.lastName;
          const studentId = response.data.studentId;
          const cmuAccount = response.data.cmuAccount;
          const organization_name = response.data.organization_name_EN;
          const itaccounttype_EN = response.data.itaccounttype_EN;

          if (organization_name == "Faculty of Engineering") {
            if (
              studentId &&
              fullName &&
              cmuAccount &&
              organization_name &&
              itaccounttype_EN
            ) {
              console.log("tetstttt");
              if (admin === cmuAccount) {
                logadmin(
                  fullName,
                  cmuAccount,
                  studentId,
                  organization_name,
                  itaccounttype_EN
                );
                home();
              } else {
                axios
                  .get("http://localhost:3000/api/checkdata")
                  .then((response) => {
                    console.log(response.data);

                    if (response.data) {
                      console.log(response.data.temp.studentid);
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
                  });
              }
            }
          } else {
            // Faculty that not Engineering
            handleShow();
          }
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

  async function addUsers(
    firstname_lastname: string,
    cmuaccount: string,
    studentid: string,
    organization_name: string,
    accounttype: string
  ) {
    try {
      await axios.post("http://localhost:3000/api/users", {
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

  async function logadmin(
    firstname_lastname: string,
    cmuaccount: string,
    studentid: string,
    organization_name: string,
    accounttype: string
  ) {
    try {
      axios.post("http://localhost:3000/api/admin", {
        name: firstname_lastname,
        cmuaccount: cmuaccount,
        studentid: studentid,
        organization_name: organization_name,
        accounttype: accounttype,
      });
    } catch (error) {
      console.log("not found admin", error);
    }
  }

  function register() {
    router.push("/register");
  }

  function home() {
    router.push("/dashboard");
  }

  useEffect(() => {
    LogIn();
  }, []);

  return (
    <div className="p-3">
      {message || "loading..."}
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
