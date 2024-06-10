"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Footer, Navbar } from "flowbite-react";
import axios from "axios";
import { useRouter } from "next/navigation";

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
        const adminCMUAccount = response.data.cmuAccount;

        if (token) {
          setIsLoggedIn(true);
        }
        if (adminCMUAccount === admin) {
          setIsAdmin(true);
        }
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
              isAdmin ? (
                <>
                  <Navbar.Link href="/dashboard" active>
                    Home
                  </Navbar.Link>
                  <Navbar.Link as={Link} href="/register">
                    Register
                  </Navbar.Link>
                  <Navbar.Link href="/appointment">Appointment</Navbar.Link>
                  <Navbar.Link href="/information">Information</Navbar.Link>
                  <Navbar.Link href="/report">Report</Navbar.Link>
                  <Navbar.Link href="/make">Make Appointment</Navbar.Link>
                  <Navbar.Link href="/article">Article</Navbar.Link>
                  <Navbar.Link href="/evaluation-form">Evaluation Form</Navbar.Link>
                  <Navbar.Link href="/graph">Graph</Navbar.Link>
                  <Navbar.Link onClick={signOut}>Logout</Navbar.Link>
                </>
              ) : (
                <>
                  <Navbar.Link href="/dashboard" active>
                    Home
                  </Navbar.Link>
                  <Navbar.Link as={Link} href="/register">
                    Register
                  </Navbar.Link>
                  <Navbar.Link href="/appointment">Appointment</Navbar.Link>
                  <Navbar.Link href="/profile">Profile</Navbar.Link>
                  <Navbar.Link href="/evaluation">Evaluation</Navbar.Link>
                  <Navbar.Link href="/article">Article</Navbar.Link>
                  <Navbar.Link onClick={signOut}>Logout</Navbar.Link>
                </>
              )
            ) : (
              <Navbar.Link href={process.env.NEXT_PUBLIC_CMU_OAUTH_URL}>Login</Navbar.Link>
            )}
          </Navbar.Collapse>
        </Navbar>
      </Navbar>
      <hr className="mt-4" />
    </>
  );
}

export default Nav;
