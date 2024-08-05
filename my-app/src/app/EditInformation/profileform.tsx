"use client";
import React, { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,

} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import {

  Card,
  Checkbox,
  Label,
  TextInput,
  Textarea,
  Select,
  Modal,
} from "flowbite-react";

interface Information {
  personid: string;
  firstname_lastname: string;
  studentid: string;
  phone: string;
  major: string;
  gender: string;
  topic: string;
  facebookurl: string;
  details_consultation: string | null;
  mental_health_checklist: string | null;
  mental_risk_level: string | null;
  start_datetime: string;
  end_datetime: string;
  room: string;
}

const formSchema = z.object({
  username: z.string().min(2).max(50),
  major: z.string().min(2).max(50),
  phone: z.string().min(8).max(15), // Example validation for phone number
  facebookUrl: z.string().url(), // Example validation for URL format
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Example validation for date format (YYYY-MM-DD)
  studentId: z.string().min(5).max(10), // Example validation for student ID
  room: z.string().min(2).max(50),
  topic: z.string().min(2).max(50),

});

export function ProfileForm() {
  // State for text editor content
  const [textEditorContent, setTextEditorContent] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get("id") || null : null;
  const [infor, setInfor] = useState<Information | null>(null); // Change to single object instead of array
  const [checkList, setCheckList] = useState("คะแนนแบบวัดพลังใจสูง")
  const [riskLevel, setRiskLevel] = useState("1")


  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      major: "",
      phone: "",
      facebookUrl: "",
      date: "",
      studentId: ""
    },
  });


  // Function to handle text editor content change
  function handleTextEditorChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setTextEditorContent(e.target.value);
  }

  async function Getsingledata() {
    const apiUrl = `http://localhost:3001/api/infor/detailinfor/${id}`;
    try {
      const response = await axios.post(apiUrl,{id});
   
      setInfor(response.data[0]); // Assuming you expect only one object
    } catch (error) {
      console.log("Can't get data", error);
    }
  }

  async function updatesingledata(
    details_consultation: string,
    mental_health_checklist: string,
    mental_risk_level: string,
    event_id: string
  ) {
    const apiUrl = `http://localhost:3001/api/infor/editinfor/${id}`;
    try {
      await axios.put(apiUrl, {
        details_consultation,
        mental_health_checklist,
        mental_risk_level,
        event_id,
      });
    } catch (error) {
      console.log("", error);
    }
  }

  const handlechecklistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCheckList(event.target.value);
  };

  const handlerisklevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRiskLevel(event.target.value);
  };



  useEffect(() => {
    if (id) {
      Getsingledata();
    }
  }, [id]);

  if (!infor) return <div></div>; // Handle case where data is still loading or `infor` is null

  return (
    <>
      <Form {...form}>
        <form className="space-y-8">
          <div className="grid grid-cols-2 gap-7">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={infor.firstname_lastname}
                      {...field}
                      disabled
                    />
                  </FormControl>
                  {/* <FormDescription>
                                        This is your public display name.
                                    </FormDescription> */}
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Major</FormLabel>
                  <FormControl>
<<<<<<< HEAD
<<<<<<< HEAD
                    <Input placeholder={infor.major} {...field} disabled />
=======
                    <Input placeholder={infor.major} {...field} />
>>>>>>> origin/mhog-dev
=======
                    <Input placeholder={infor.major} {...field} disabled />
>>>>>>> origin/mhog-dev
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder={infor.phone} {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="facebookUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={infor.facebookurl}
                      {...field}
                      disabled
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={infor.start_datetime}
                      {...field}
                      disabled
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="studentId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Student ID</FormLabel>
                  <FormControl>
                    <Input placeholder={infor.studentid} {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="room"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Room</FormLabel>
                  <FormControl>
                    <Input placeholder={infor.room} {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="topic"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic</FormLabel>
                  <FormControl>
                    <Input placeholder={infor.topic} {...field} disabled />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-2 gap-7">
            <div>
              <div className="max-w-md mt-5">
                <div className="mb-1 block">
                  <Label htmlFor="ระดับความเสี่ยง" value="ระดับความเสี่ยง" />
                </div>
                <Select
                  id="ระดับความเสี่ยง"
                  required
                  value={riskLevel}
                  onChange={handlerisklevelChange}
                >
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">
                    3
                  </option>
                  <option value="4">
                    4
                  </option>
                  <option value="5">
                    5
                  </option>

                </Select>
              </div>
            </div>
            <div>
              <div className="max-w-md mt-5">
                <div className="mb-1 block">
                  <Label htmlFor="ประเภทของสุขภาพจิต" value="ประเภทของสุขภาพจิต" />
                </div>
                <Select
                  id="ประเภทของสุขภาพจิต"
                  required
                  value={checkList}
                  onChange={handlechecklistChange}
                >
                  <option value="คะแนนแบบวัดพลังใจสูง">คะแนนแบบวัดพลังใจสูง</option>
                  <option value="มีอารมณ์เศร้าอย่างต่อเนื่องหรือเป็นโรคซึมเศร้า(วินิจฉัยโดยแพทย์)">มีอารมณ์เศร้าอย่างต่อเนื่องหรือเป็นโรคซึมเศร้า(วินิจฉัยโดยแพทย์)</option>
                  <option value="ความเศร้าโศกจากการสูญเสีย(ทั้งระยะสั้นและเรื้อรัง)"> ความเศร้าโศกจากการสูญเสีย(ทั้งระยะสั้นและเรื้อรัง)</option>
                  <option value="บาดแผลทางใจ/ประสบการณ์เลวร้ายในวัยเด็ก">บาดแผลทางใจ/ประสบการณ์เลวร้ายในวัยเด็ก</option>
                  <option value="มีความคิดฆ่าตัวตาย/คิดเกี่ยวกับความตาย/ความคิดทำร้ายตัวเอง">มีความคิดฆ่าตัวตาย/คิดเกี่ยวกับความตาย/ความคิดทำร้ายตัวเอง</option>
                  <option value="ปัญหาการปรับตัว/ ขาดทักษะทางสังคม">ปัญหาการปรับตัว/ ขาดทักษะทางสังคม</option>
                  <option value="ปัญาหาความสัมพันธ์ภายในครอบครัว">ปัญหาความสัมพันธ์ภายในครอบครัว</option>
                  <option value="ปัญาหาความสัมพันธ์กับคนรัก">ปัญหาความสัมพันธ์กับคนรัก</option>
                  <option value="ปัญาหาความสัมพันธ์เพื่อน">ปัญหาความสัมพันธ์เพื่อน</option>
                  <option value="พฤติกรรมเสพติด(สารเสพติด, การพนัน, เพศสัมพันธ์)">พฤติกรรมเสพติด(สารเสพติด, การพนัน, เพศสัมพันธ์)</option>
                  <option value="ปัญหาสุขภาพจิตที่มีอาการในกลุ่มวิตกกังวล">ปัญหาสุขภาพจิตที่มีอาการในกลุ่มวิตกกังวล</option>
                  <option value="มีอาการเจ็บป่วยทางกายซึ่งเป็นผลมาจากปัญหาทางจิตใจ">มีอาการเจ็บป่วยทางกายซึ่งเป็นผลมาจากปัญหาทางจิตใจ</option>
                  <option value="ปัญหาการเรียน/หมดไฟในการเรียน/อยากเปลี่ยนคณะ">ปัญหาการเรียน/หมดไฟในการเรียน/อยากเปลี่ยนคณะ</option>
                  <option value="ต้องการเข้าใจหรือพัฒนาตนเอง/ค้นหาเป้าหมายหรือความหมายชีวิต">ต้องการเข้าใจหรือพัฒนาตนเอง/ค้นหาเป้าหมายหรือความหมายชีวิต</option>
                  <option value="ปัญหาบุคลิกภาพ">ปัญหาบุคลิกภาพ</option>
                  <option value="อื่นๆ">อื่นๆ</option>
                </Select>
              </div>
            </div>
          </div>


          <FormItem>
            <div>
              <FormLabel>รายละเอียดการพูดคุย</FormLabel>
              <FormControl>
                <textarea
                  placeholder={
                    infor.details_consultation
                      ? infor.details_consultation
                      : "โปรดกรอกรายละเอียดการพูดคุย"
                  }
                  value={textEditorContent}
                  onChange={handleTextEditorChange}
                  className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  rows={8}
                />
              </FormControl>
              <FormDescription>
                Edit and save text content here.
              </FormDescription>
            </div>

            <Button
              type="submit"
              onClick={() => {
                if (id) {
                  updatesingledata(textEditorContent , checkList  ,riskLevel , id);
                } 
              }}
            >
              บันทึก
            </Button>
          </FormItem>
        </form>
      </Form>
    </>
  );
}
