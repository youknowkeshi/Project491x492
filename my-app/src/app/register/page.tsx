"use client";
import {
  Card,
  Checkbox,
  Label,
  TextInput,
  Textarea,
  Select,
  Modal,
} from "flowbite-react";

import React, { useState, useEffect } from "react";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Navbar } from "../component/์Navbar";
import { Foot } from "../component/Footer";
import { Button } from "@/components/ui/button";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function RegisterPage() {
  const router = useRouter();
  const [Id, setId] = useState("");
  const [phone, setPhone] = useState("");
  const [major, setMajor] = useState("วิศวกรรมโยธา");
  const [gender, setGender] = useState("Male");
  const [facebookurl, setFacebookUrl] = useState("");
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("ชั้นปีที่ 1");

  const [checkPhone, setCheckPhone] = useState("");
  const [checkMajor, setCheckMajor] = useState("");
  const [checkGender, setCheckGender] = useState("");
  const [checkFacebookurl, setCheckFacebookUrl] = useState("");
  const [checkGradeLevel, setCheckGradeLevel] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  //if user not use accesscode for admin
  const [showModalAccessCode, setShowModalAccessCode] = useState(false);
  const handleShowAccessCode = () => setShowModalAccessCode(true);
  const handleCloseAccessCode = () => setShowModalAccessCode(false);

  //if empty text
  const [showModalEmpty, setShowModalEmpty] = useState(false);
  const handleShowEmpty = () => setShowModalEmpty(true);
  const handleCloseEmpty = () => setShowModalEmpty(false);

  const [accessCodeCondition, setAccessCodeCondition] = useState("");

  async function updatedataUsers(
    personid: string,
    studentId: string,
    phone: string,
    major: string,
    gender: string,
    facebookurl: string,
    gradelevel: string
  ) {
    try {
      await axios.put("http://localhost:3001/api/user/firstlogin", {
        personid,
        studentId,
        phone,
        major,
        gender,
        facebookurl,
        gradelevel,
      });
    } catch (error) {
      console.log("This is error: ", error);
    }
  }

  async function getdatausers() {
    try {
      const response = await axios.get("/api/register");
      setFullName(response.data.firstName + " " + response.data.lastName);
      setStudentId(response.data.studentId ?? "-");
      checkregister(response.data.studentId);
    } catch (err) {
      console.log("This is error: ", err);
    }
  }

  async function checkregister(studentId: string) {
    const apiUrl = "http://localhost:3001/api/user/checkuser";

    try {
      const response = await axios.post(apiUrl, { studentId });

      setCheckPhone(response.data[0].phone);
      setCheckMajor(response.data[0].major);
      setCheckGender(response.data[0].gender);
      setCheckFacebookUrl(response.data[0].facebookurl);
      setCheckGradeLevel(response.data[0].gradelevel);
    } catch (error) {
      console.log("Can't check resgister users ", error);
    }
  }

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
    checkAccessCode(event.target.value);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(event.target.value);
  };

  const handleMajorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMajor(event.target.value);
  };

  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(event.target.value);
  };

  const handleGradeLevelChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setGradeLevel(event.target.value);
  };

  const handleFacebookUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFacebookUrl(event.target.value);
  };

  function appointment() {
    //console.log("Navigating to /appointment");
    router.push("/appointment");
  }

  const handleSaveData = () => {
    if (Id && phone && major && gender && facebookurl && gradeLevel) {
      if (
        checkFacebookurl &&
        checkGender &&
        checkGradeLevel &&
        checkMajor &&
        checkPhone
      ) {
        handleShow();
      } else if (accessCodeCondition == "0") {
        handleShowAccessCode();
      } else {
        updatedataUsers(
          Id,
          studentId,
          phone,
          major,
          gender,
          facebookurl,
          gradeLevel
        ).then(() => {
          appointment();
          afterUseAccesscode(Id);
        });
      }
    } else {
      handleShowEmpty();
    }
  };

  async function deleteAccessCode() {
    const apiUrl = "http://localhost:3001/api/accesscode/deleteautoaccesscode";
    try {
      await axios.delete(apiUrl);
    } catch (error) {
      console.log("Can't delete access code ", error);
    }
  }

  async function afterUseAccesscode(accesscode: string) {
    const apiUrl = "http://localhost:3001/api/accesscode/deletemulaccesscode";
    try {
      await axios.put(apiUrl, { accesscode });
    } catch (error) {
      console.log("Can't manual-delete access code : ", error);
    }
  }

  async function checkAccessCode(accesscode: string) {
    const apiUrl = "http://localhost:3001/api/accesscode/checkaccesscode";
    try {
      const response = await axios.put(apiUrl, { accesscode });
      const count = response.data.length;

      setAccessCodeCondition(count);
      if (count <= 0) {
      }
    } catch (error) {
      console.log("Can't generate access code ", error);
    }
  }

  useEffect(() => {
    getdatausers();
    deleteAccessCode(); // เรียกใช้ครั้งแรกเมื่อ Component ถูกโหลด

    const interval = setInterval(() => {
      deleteAccessCode(); // เรียกใช้ทุก ๆ 300 วินาที
    }, 300000); // 300 วินาที

    return () => clearInterval(interval); // เมื่อ Component ถูก unmount ให้ clear interval
  }, []);

  return (
    <>
      <div>
        <Navbar />
        <header className="bg-white shadow">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-[#8FC1E3]">
              ลงทะเบียน
            </h1>
          </div>
        </header>
        <main className="bg-[#F7F9FB]">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="relative isolate px-6 pt-14 pb-14 lg:px-8">
              <div
                className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                aria-hidden="true"
              >
                {/* <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] clip-custom"></div> */}
              </div>
              <div>
                <div className="container mx-auto">
                  <div className="flex flex-col lg:flex-row w-10/12 lg:w-8/12 bg-white rounded-xl mx-auto shadow-lg overflow-hidden">
                    <div
                      className="w-full lg:w-1/2 flex flex-col items-center justify-center p-12 bg-no-repeat bg-cover bg-center"
                      style={{
                        backgroundImage:
                          "url('https://images.unsplash.com/photo-1487260211189-670c54da558d?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                      }}
                    >
                      <h1 className="text-[#8FC1E3] text-3xl mb-3">Welcome</h1>
                      <div>
                        <p className="text-purple">
                          ก่อนลงทะเบียนกรุณาติดต่อนักจิตผ่านเพจ Entaneer mind
                          เพื่อพูดคุยเบื้องต้นและรับรหัสเข้ารับบริการ{" "}
                          <a
                            href="https://www.facebook.com/messages/t/100395738521698"
                            className="text-#4F6F52 font-semibold text-[#8FC1E3]"
                          >
                            click
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="w-full lg:w-1/2 py-16 px-12">
                      <h2 className="text-3xl mb-4 text-[#8FC1E3]">
                        ลงทะเบียน
                      </h2>
                      <p className="mb-4">
                        สร้างบัญชีของคุณ ฟรีและใช้เวลาเพียงไม่กี่นาที
                      </p>
                      <form action="#">
                        <div className="mb-1">
                          <Label value="ชื่อ-สกุล" />
                        </div>
                        <div>
                          <TextInput
                            id="input-gray"
                            color="gray"
                            placeholder={fullName}
                            disabled
                          />
                        </div>
                        <div className="mt-5 grid grid-cols-2 gap-5">
                          <div className="">
                            <Label value="เบอร์โทรศัพท์" />
                          </div>
                          <div className="">
                            <Label value="รหัสนักศึกษา" />
                          </div>
                        </div>

                        <div className="mb-1 grid grid-cols-2 gap-5">
                          <TextInput
                            id="input-gray"
                            placeholder="xxx-xxxxxxx"
                            required
                            color="gray"
                            value={phone}
                            onChange={handlePhoneChange}
                          />
                          <TextInput
                            id="input-gray"
                            placeholder={studentId}
                            disabled
                            color="gray"
                          />
                        </div>
                        <div className="max-w-md mt-5">
                          <div className="mb-1 block">
                            <Label htmlFor="Major" value="เมเจอร์" />
                          </div>
                          <Select
                            id="Major"
                            required
                            onChange={handleMajorChange}
                          >
                            <option value="วิศวกรรมโยธา">วิศวกรรมโยธา</option>
                            <option value="วิศวกรรมไฟฟ้า">วิศวกรรมไฟฟ้า</option>
                            <option value="วิศวกรรมเครื่องกล">
                              วิศวกรรมเครื่องกล
                            </option>
                            <option value="วิศวกรรมสิ่งแวดล้อม">
                              วิศวกรรมสิ่งแวดล้อม
                            </option>
                            <option value="วิศวกรรมอุตสาหการ">
                              วิศวกรรมอุตสาหการ
                            </option>
                            <option value="วิศวกรรมเหมืองแร่และปิโตรเลียม">
                              วิศวกรรมเหมืองแร่และปิโตรเลียม
                            </option>
                            <option value="วิศวกรรมคอมพิวเตอร์">
                              วิศวกรรมคอมพิวเตอร์
                            </option>
                            <option value="วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์">
                              วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์
                            </option>
                            <option value="วิศวกรรมบูรณาการ">
                              วิศวกรรมบูรณาการ
                            </option>
                            <option value="อื่นๆ">อื่นๆ</option>
                          </Select>
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
                            <Label value="รหัสเข้ารับบริการ" />
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
                            <Label value="เพศ" />
                          </div>
                          <Select
                            id="gender"
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
                          <div className="mb-1 block">
                            <Label value="ชั้นปี" />
                          </div>
                          <Select
                            id="gradeLevel"
                            required
                            onChange={handleGradeLevelChange}
                          >
                            <option value="ชั้นปี 1">ชั้นปี 1</option>
                            <option value="ชั้นปี 2">ชั้นปี 2</option>
                            <option value="ชั้นปี 3">ชั้นปี 3</option>
                            <option value="ชั้นปี 4">ชั้นปี 4</option>
                            <option value="มากกว่าชั้นปี 4">
                              มากกว่าชั้นปี 4
                            </option>
                            <option value="ป.โท">ป.โท</option>
                            <option value="ป.เอก">ป.เอก</option>
                            <option value="อาจารย์">อาจารย์</option>
                            <option value="บุคลากร">บุคลากร</option>
                            <option value="ผู้ปกครอง">ผู้ปกครอง</option>
                            <option value="อื่นๆ">อื่นๆ</option>
                          </Select>
                        </div>

                        <div className="mt-5">
                          <input
                            type="checkbox"
                            className="border border-gray-400"
                          />
                          <span className="ml-3">
                            ฉันยอมรับข้อ{" "}
                            <a className="text-[#8FC1E3] font-semibold">
                              กำหนดการใช้งาน นโยบาย
                            </a>{" "}
                            &{" "}
                            <a className="text-[#8FC1E3] font-semibold">
                              ความเป็นส่วนตัว
                            </a>
                          </span>
                        </div>
                        <div className="mt-5">
                          <button
                            className="w-full bg-[#8FC1E3] py-3 text-center text-white hover:bg-[#8FC1E3]"
                            onClick={(e) => {
                              e.preventDefault();
                              handleSaveData();
                            }}
                          >
                            Register Now
                          </button>

                          {/* Condition for registered */}

                          <Modal
                            dismissible
                            show={!!showModal}
                            onClose={handleClose}
                          >
                            <Modal.Body>
                              <div className="space-y-6">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  คุณได้ทำการลงทะเบียนเเล้ว
                                </p>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                          </Modal>

                          {/* Condition for request access code */}
                          <Modal
                            dismissible
                            show={!!showModalAccessCode}
                            onClose={handleCloseAccessCode}
                          >
                            <Modal.Body>
                              <div className="space-y-6">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                  คุณต้องขอรหัสเพื่อลงทะเบียนครั้งแรก
                                </p>
                              </div>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button onClick={handleCloseAccessCode}>
                                Close
                              </Button>
                            </Modal.Footer>
                          </Modal>

                          {/* Condition for empty text*/}
                          <Modal
                            dismissible
                            show={!!showModalEmpty}
                            onClose={handleCloseEmpty}
                          >
                            <Modal.Header />
                            <Modal.Body>
                              <div className="text-center">
                                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                                  โปรดกรอกข้อมูลให้ครบถ้วน
                                </h3>
                              </div>

                              <div className="flex justify-center gap-4">
                                <Button
                                  className="flex justify-center"
                                  variant="destructive"
                                  onClick={handleCloseEmpty}
                                >
                                  Close
                                </Button>
                              </div>
                            </Modal.Body>
                          </Modal>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
                aria-hidden="true"
              >
                {/* <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] clip-custom"></div> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
