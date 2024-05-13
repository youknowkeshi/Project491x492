"use client";
import React from "react";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Footer, Navbar } from "flowbite-react";

export function Nav() {
  return (
    <div>
      <Navbar fluid rounded>
        <Footer.Brand
          href="https://flowbite.com"
          src="https://upload.wikimedia.org/wikipedia/commons/4/4f/SVG_Logo.svg"
          alt="Flowbite Logo"
          name="Entaneer Mind"
        />
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/dashboard" active>
            Home
          </Navbar.Link>
          <Navbar.Link as={Link} href="/register">
            Register
          </Navbar.Link>
          <Navbar.Link href="#">Appointment</Navbar.Link>
          <Navbar.Link href="/Calendar">Calendar</Navbar.Link>
          <Navbar.Link href="/Evaluation">Evaluation</Navbar.Link>
          <Navbar.Link href="https://oauth.cmu.ac.th/Login.aspx">
            Login
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
      <hr></hr>
    </div>
  );
}

export default Nav;
