"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Footer, Navbar } from "flowbite-react";

export function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
              <Navbar.Link href="/login">Logout</Navbar.Link>
            </>
          ) : (
            <Navbar.Link href="/login">Login</Navbar.Link>
          )}
        </Navbar.Collapse>
      </Navbar>
      <hr className="mt-4"></hr>
    </>
  );
}

export default Nav;
