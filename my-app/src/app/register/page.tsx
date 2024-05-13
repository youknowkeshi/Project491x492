"use client";
import {
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import React from "react";
import nav from "../component/Nav";
import Nav from "../component/Nav";
import Link from "next/link";
import { Select } from "flowbite-react";
import { Foot } from "../component/Footer";

type Props = {};

export default function RegisterPage({}: Props) {
  return (
    <div>
      <Nav />
      <div
        className="min-h-screen py-40 mt-10 mb-7 rounded-md"
        style={{ backgroundImage: "linear-gradient(115deg, #4F6F52, #6BDE75)" }}
      >
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
            <div
              className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1487260211189-670c54da558d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              }}
            >
              <h1 className="text-green-500 text-3xl mb-3">Welcome</h1>
              <div>
                <p className="text-purple">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean suspendisse aliquam varius rutrum purus maecenas ac{" "}
                  <a
                    href="#"
                    className="text-#4F6F52 font-semibold text-green-500"
                  >
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4 text-green-500">Register</h2>
              <p className="mb-4">
                Create your account. It’s free and only take a minute
              </p>
              <form action="#">
                <div className="mt-5">
                  <TextInput
                    id="input-gray"
                    placeholder="First Name and Last Name"
                    required
                    color="gray"
                  />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-5">
                  <TextInput
                    id="input-gray"
                    placeholder="Phone"
                    required
                    color="gray"
                  />
                  <TextInput
                    id="input-gray"
                    placeholder="Student ID"
                    required
                    color="gray"
                  />
                </div>
                <div className="max-w-md mt-5">
                  <Label htmlFor="Major" />
                </div>
                <Select id="Major" required>
                  <option>วิศวกรรมโยธา</option>
                  <option>วิศวกรรมไฟฟ้า</option>
                  <option>วิศวกรรมเครื่องกล</option>
                  <option>วิศวกรรมสิ่งแวดล้อม</option>
                  <option>วิศวกรรมอุตสาหการ</option>
                  <option>วิศวกรรมเหมืองแร่และปิโตรเลียม</option>
                  <option>วิศวกรรมคอมพิวเตอร์</option>
                  <option>วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์</option>
                  <option>อื่นๆ</option>
                </Select>
                <div className="mt-5">
                  <TextInput
                    id="input-gray"
                    placeholder="Topic"
                    required
                    color="gray"
                  />
                </div>
                <div className="mt-5">
                  <TextInput
                    id="input-gray"
                    placeholder="Facebook URL"
                    required
                    color="gray"
                  />
                </div>
                <div className="mt-5">
                  <TextInput
                    id="input-gray"
                    placeholder="Access Code"
                    required
                    color="gray"
                  />
                </div>
                <div className="mt-5">
                  <input type="checkbox" className="border border-gray-400" />
                  <span className="ml-3">
                    I accept the{" "}
                    <a href="#" className="text-green-500 font-semibold">
                      Terms of Use
                    </a>{" "}
                    &{" "}
                    <a href="#" className="text-green-500 font-semibold">
                      Privacy Policy
                    </a>
                  </span>
                </div>
                <div className="mt-5">
                  <button className="w-full bg-green-500 py-3 text-center text-white">
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
}
