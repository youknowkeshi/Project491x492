"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Dropdown, Footer, Navbar } from "flowbite-react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export function Nav() {
  const admin = process.env.NEXT_PUBLIC_ADMIN as string;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();

  function signOut() {
    axios.post("/api/signOut").finally(() => {
      router.push("/");
    });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/register");
        const token = response.data.ok;
        if (token) {
          setIsLoggedIn(true);
        }
        // if (adminCMUAccount === admin) {
        //   setIsAdmin(true);
        // }
      } catch (err) {
        console.log("This is error: ", err);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar fluid rounded>
        <div className="flex items-center md">
          <Footer.Brand
            href="https://flowbite.com"
            src="/logo.svg"
            alt="Flowbite Logo"
            name="Entaneer Mind"
          />
        </div>
        <Navbar.Toggle />
        <Navbar fluid rounded>
          <Navbar.Collapse>
            {isLoggedIn ? (
              <>
                <Navbar.Link href="/dashboard" active>
                  Home
                </Navbar.Link>
                <Navbar.Link as={Link} href="/register">
                  Register
                </Navbar.Link>
                <Navbar.Link href="/appointment">Appointment</Navbar.Link>
                <Navbar.Link href="/profile">Profile</Navbar.Link>
                <Dropdown label="Dropdown" inline>
                  <Dropdown.Item>
                    <Navbar.Link href="/Evaluationform">Evaluation</Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Navbar.Link href="/article">Article</Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Navbar.Link href="/accessCode">
                      สร้างรหัสสำหรับผู้รับบริการใหม่
                    </Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Navbar.Link href="/List">List</Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Navbar.Link href="/UserInfomation">UserInfo</Navbar.Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Navbar.Link onClick={signOut}>Logout</Navbar.Link>
                  </Dropdown.Item>
                </Dropdown>
              </>
            ) : (
              <Navbar.Link href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}>
                Login
              </Navbar.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Navbar>
      <div className="mt-4" />
    </>
  );
}

export default Nav;
