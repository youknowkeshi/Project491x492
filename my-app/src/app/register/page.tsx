"use client";
import {
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
  Textarea,
} from "flowbite-react";
import React, { use, useState, useEffect } from "react";
import nav from "../component/Nav";
import Nav from "../component/Nav";
import Link from "next/link";
import { Select } from "flowbite-react";
import { Foot } from "../component/Footer";
import { useRouter } from "next/navigation";
import axios, { AxiosError, AxiosResponse } from "axios";



type Props = {};

export default function RegisterPage({ }: Props) {
  const router = useRouter();
  const [Id, setId] = useState('');
  const [phone, setphone] = useState('');
  const [major, setmajor] = useState('วิศวกรรมโยธา');
  const [gender, setgender] = useState('Male');
  const [topic, settopic] = useState('');
  const [facebookurl, setfacebookurl] = useState('');
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");

  async function updatedataUsers(personid: string, phone: string, major: string, gender: string, topic: string, facebookurl: string) {

    try {
      const response = await axios.put('http://localhost:3000/api/register', {
        personid: personid,
        phone: phone,
        major: major,
        gender: gender,
        topic: topic,
        facebookurl: facebookurl
      }
      );
      console.log("front: ",response);
      
    } catch (error) {
      console.log("This is error : ", error);
    }
  }

  async function getdatausers() {
    try {
      const response = await axios.get('/api/register')
      setFullName(response.data.firstName + " " + response.data.lastName);
      setStudentId(response.data.studentId ?? "-");


    } catch (err) {
      console.log("This is error: ", err);
    }
  }

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setphone(event.target.value);
  };

  const handleMajorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setmajor(event.target.value)
  }


  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("ค่าที่เลือก: ", event.target.value);
    setgender(event.target.value);
  };

  const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    settopic(event.target.value);
  };

  const handleFacebookUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setfacebookurl(event.target.value);
  };

  function appointment ()  {
    router.push("appointment");
  }

  const handleSaveData = () => {
    updatedataUsers(Id, phone, major, gender, topic, facebookurl)
    appointment()
  };

  useEffect(() => {
    getdatausers()
    
  }, []);

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
                <div className="mb-1">
                  <Label value="Fullname" />
                </div>
                <div>
                  <TextInput
                    id="input-gray"
                    color="gray"
                    placeholder={fullName} disabled
                  />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-5">
                  <div className="">
                    <Label value="Phone" />
                  </div>
                  <div className="">
                    <Label value="StudentID" />
                  </div>
                </div>

                <div className="mb-1 grid grid-cols-2 gap-5">
                  <TextInput
                    id="input-gray"
                    placeholder="091-345xxxx"
                    required
                    color="gray"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                  <TextInput
                    id="input-gray"
                    placeholder={studentId} disabled
                    color="gray"
                  />
                </div>
                <div className="max-w-md mt-5">

                  <div className="mb-1 block">
                    <Label htmlFor="Major" value="Major" />
                  </div>
                  <Select
                    id="Major"
                    required
                    onChange={handleMajorChange}
                  >

                    <option value="วิศวกรรมโยธา">วิศวกรรมโยธา</option>
                    <option value="วิศวกรรมไฟฟ้า">วิศวกรรมไฟฟ้า</option>
                    <option value="วิศวกรรมเครื่องกล">วิศวกรรมเครื่องกล</option>
                    <option value="วิศวกรรมสิ่งแวดล้อม">วิศวกรรมสิ่งแวดล้อม</option>
                    <option value="วิศวกรรมอุตสาหการ">วิศวกรรมอุตสาหการ</option>
                    <option value="วิศวกรรมเหมืองแร่และปิโตรเลียม">วิศวกรรมเหมืองแร่และปิโตรเลียม</option>
                    <option value="วิศวกรรมคอมพิวเตอร์">วิศวกรรมคอมพิวเตอร์</option>
                    <option value="วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์">วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </Select>
                </div>

                <div className="mt-5">
                  <div className="mb-1 block">
                    <Label value="Topic" />
                  </div>
                  <TextInput
                    id="input-gray"
                    placeholder="เครียดกับการทำงาน......"
                    required
                    color="gray"
                    value={topic}
                    onChange={handleTopicChange}
                  />
                </div>
                <div className="mt-5">
                  <div className="mb-1 block">
                    <Label value="Facebook Profile" />
                  </div>
                  <TextInput
                    id="input-gray"
                    placeholder="https://www.facebook.com/parinya.mungrod"
                    required
                    color="gray"
                    value={facebookurl}
                    onChange={handleFacebookUrlChange}
                  />
                </div>
                <div className="mt-5">
                  <div className="mb-1 block">
                    <Label value="Access Code" />
                  </div>
                  <TextInput
                    id="input-gray"
                    placeholder="Get the code from the psychiatrist"
                    required
                    color="gray"
                    value={Id}
                    onChange={handleIdChange}
                  />
                </div>
                <div className="mt-5">
                  <div className="mb-1 block">
                    <Label value="Gender" />
                  </div>
                  <Select
                    id="Major"
                    required
                    onChange={handleGenderChange}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="LGBTQ+">LGBTQ+</option>
                    <option value="Not specified">Not specified</option>

                  </Select>
                </div>

                <div className="mt-5">
                  <input type="checkbox" className="border border-gray-400" />
                  <span className="ml-3">
                    I accept the{" "}
                    <a className="text-green-500 font-semibold">
                      Terms of Use
                    </a>{" "}
                    &{" "}
                    <a className="text-green-500 font-semibold">
                      Privacy Policy
                    </a>
                  </span>
                </div>
                <div className="mt-5">
                  <button className="w-full bg-green-500 py-3 text-center text-white" onClick={handleSaveData}>
                    Register Now
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
