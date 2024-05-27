"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Footer, Navbar } from "flowbite-react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";


export function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  function signOut() {

    axios.post("/api/signOut").finally(() => {
      router.push("/");
    });
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
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
              <Navbar.Link href="/Evaluation">Evaluation</Navbar.Link>
              <Navbar.Link href="/article">Article</Navbar.Link>
              <Navbar.Link onClick={(e) => {
                e.preventDefault(); // ป้องกันการนำทางโดยอัตโนมัติ
                signOut();
              }}>Logout</Navbar.Link>
            </>
          ) : (
            <Navbar.Link href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}>Login</Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
      <hr className="mt-4"></hr>
    </>
  );
}

export default Nav;
