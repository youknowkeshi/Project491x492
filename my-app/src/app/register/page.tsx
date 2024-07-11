"use client";
import {
  Button,
  Label,
  TextInput,
  Select,
  Modal,
} from "flowbite-react";

import React, { useState, useEffect } from "react";
import Nav from "../component/Nav";
import { useRouter } from "next/navigation";
import axios from "axios";


export default function RegisterPage() {
  const router = useRouter();
  const [Id, setId] = useState('');
  const [phone, setPhone] = useState('');
  const [major, setMajor] = useState('วิศวกรรมโยธา');
  const [gender, setGender] = useState('Male');
  const [facebookurl, setFacebookUrl] = useState('');
  const [studentId, setStudentId] = useState("");
  const [fullName, setFullName] = useState("");
  const [gradeLevel, setGradeLevel] = useState("ป.ตรี");


  const [checkPhone, setCheckPhone] = useState('');
  const [checkMajor, setCheckMajor] = useState('');
  const [checkGender, setCheckGender] = useState('');
  const [checkFacebookurl, setCheckFacebookUrl] = useState('');
  const [checkGradeLevel, setCheckGradeLevel] = useState("");

  const [showModal, setShowModal] = useState(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [showModalAccessCode, setShowModalAccessCode] = useState(false);
  const handleShowAccessCode = () => setShowModalAccessCode(true);
  const handleCloseAccessCode = () => setShowModalAccessCode(false);
  const [accessCodeCondition, setAccessCodeCondition] = useState("")

  const [showModalFull, setShowModalFull] = useState(false);
  const handleShowFull = () => setShowModalFull(true);
  const handleCloseFull = () => setShowModalFull(false);

  async function updatedataUsers(personid: string, phone: string, major: string, gender: string, facebookurl: string, gradelevel: string) {
    try {
      const response = await axios.put('http://localhost:3000/api/register', {
        personid, phone, major, gender, facebookurl, gradelevel
      });
      console.log("front: ", response);
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
    const apiUrl = "http://localhost:3000/api/register"

    try {
      const response = await axios.post(apiUrl, { studentId });

      setCheckPhone(response.data.data[0].phone)
      setCheckMajor(response.data.data[0].major)
      setCheckGender(response.data.data[0].gender)
      setCheckFacebookUrl(response.data.data[0].facebookurl)
      setCheckGradeLevel(response.data.data[0].gradelevel)

    } catch (error) {
      console.log("Can't check resgister users ", error);
    }
  }

  const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
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

    checkAccessCode(Id)
    if (checkFacebookurl && checkGender && checkGradeLevel && checkMajor && checkPhone) {
      handleShow()
    }
    else if (accessCodeCondition == '0') {
      handleShowAccessCode()
    }
    else {
      if (Id && phone && major && gender && facebookurl && gradeLevel) {
        updatedataUsers(Id, phone, major, gender, facebookurl, gradeLevel).then(() => {
          appointment();
          afterUseAccesscode(Id)
        });
      }else{
        handleShowFull()
      }

    }
  };

  async function deleteAccessCode() {
    const apiUrl = "http://localhost:3000/api/accesscode/auto-delete"
    try {
      await axios.delete(apiUrl)
    } catch (error) {
      console.log("Can't delete access code ", error);
    }
  }

  async function afterUseAccesscode(accesscode: string) {
    const apiUrl = "http://localhost:3000/api/accesscode/manual-delete"
    try {
      await axios.put(apiUrl, { accesscode })
    } catch (error) {
      console.log("Can't manual-delete access code : ", error);

    }
  }

  async function checkAccessCode(accesscode: string) {
    const apiUrl = "http://localhost:3000/api/accesscode/auto-delete"
    try {
      const response = await axios.put(apiUrl, { accesscode })
      const count = response.data.res ? response.data.res.length : 0;

      setAccessCodeCondition(count)
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
    <div>
      <Nav />
      <div
        className="min-h-screen py-40 mt-7  rounded-md"
        style={{
          backgroundImage: "linear-gradient(115deg, #B9F3FC,#F3F8FF,#F9F9F9)",
        }}
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
              <h1 className="text-[#B9F3FC] text-3xl mb-3">Welcome</h1>
              <div>
                <p className="text-purple">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Aenean suspendisse aliquam varius rutrum purus maecenas ac{" "}
                  <a
                    href="#"
                    className="text-#4F6F52 font-semibold text-[#B9F3FC]"
                  >
                    Learn more
                  </a>
                </p>
              </div>
            </div>
            <div className="w-full lg:w-1/2 py-16 px-12">
              <h2 className="text-3xl mb-4 text-[#B9F3FC]">Register</h2>
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
                    placeholder={fullName}
                    disabled
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
                    placeholder={studentId}
                    disabled
                    color="gray"
                  />
                </div>
                <div className="max-w-md mt-5">
                  <div className="mb-1 block">
                    <Label htmlFor="Major" value="Major" />
                  </div>
                  <Select id="Major" required onChange={handleMajorChange}>
                    <option value="วิศวกรรมโยธา">วิศวกรรมโยธา</option>
                    <option value="วิศวกรรมไฟฟ้า">วิศวกรรมไฟฟ้า</option>
                    <option value="วิศวกรรมเครื่องกล">วิศวกรรมเครื่องกล</option>
                    <option value="วิศวกรรมสิ่งแวดล้อม">
                      วิศวกรรมสิ่งแวดล้อม
                    </option>
                    <option value="วิศวกรรมอุตสาหการ">วิศวกรรมอุตสาหการ</option>
                    <option value="วิศวกรรมเหมืองแร่และปิโตรเลียม">
                      วิศวกรรมเหมืองแร่และปิโตรเลียม
                    </option>
                    <option value="วิศวกรรมคอมพิวเตอร์">
                      วิศวกรรมคอมพิวเตอร์
                    </option>
                    <option value="วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์">
                      วิศวกรรมหุ่นยนต์และปัญญาประดิษฐ์
                    </option>
                    <option value="วิศวกรรมบูรณาการ">วิศวกรรมบูรณาการ</option>
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
                  <Select id="gender" required onChange={handleGenderChange}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="LGBTQ+">LGBTQ+</option>
                    <option value="Not specified">Not specified</option>
                  </Select>
                </div>

                <div className="mt-5">
                  <div className="mb-1 block">
                    <Label value="GradeLevel" />
                  </div>
                  <Select
                    id="gradeLevel"
                    required
                    onChange={handleGradeLevelChange}
                  >
                    <option value="ป.ตรี">ป.ตรี</option>
                    <option value="ป.โท">ป.โท</option>
                    <option value="ป.เอก">ป.เอก</option>
                    <option value="อาจารย์">อาจารย์</option>
                    <option value="บุคลากร">บุคลากร</option>
                    <option value="ผู้ปกครอง">ผู้ปกครอง</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </Select>
                </div>

                <div className="mt-5">
                  <input type="checkbox" className="border border-gray-400" />
                  <span className="ml-3">
                    I accept the{" "}
                    <a className="text-[#B9F3FC] font-semibold">Terms of Use</a>{" "}
                    &{" "}
                    <a className="text-[#B9F3FC] font-semibold">
                      Privacy Policy
                    </a>
                  </span>
                </div>
                <div className="mt-5">
                  <button
                    className="w-full bg-[#B9F3FC] py-3 text-center text-white"
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
                      <Button
                        gradientMonochrome="failure"
                        onClick={handleClose}
                      >
                        Close
                      </Button>
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
                      <Button
                        gradientMonochrome="failure"
                        onClick={handleCloseAccessCode}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>


                  <Modal
                    dismissible
                    show={!!showModalFull}
                    onClose={handleCloseFull}
                  >
                    <Modal.Body>
                      <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                          โปรดกรอกข้อมูลให้ครบ
                        </p>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button
                        gradientMonochrome="failure"
                        onClick={handleCloseFull}
                      >
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>

                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>



  );
}
