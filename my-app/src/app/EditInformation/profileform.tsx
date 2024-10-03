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
import { useSearchParams ,useRouter} from "next/navigation";
// import { useRouter } from 'next/router';
import {

  Card,
  Checkbox,
  Label,
  TextInput,
  Textarea,
  Select,
  Modal,
} from "flowbite-react";

import Multiselect from 'multiselect-react-dropdown';

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
  const router = useRouter();
  const [textEditorContent, setTextEditorContent] = useState("");
  const searchParams = useSearchParams();
  const id = searchParams ? searchParams.get("id") || null : null;
  const [infor, setInfor] = useState<Information | null>(null); // Change to single object instead of array
  const [checkList, setCheckList] = useState<string>("")
  const [riskLevel, setRiskLevel] = useState("-")
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const optionsList = [
    "คะแนนแบบวัดพลังใจสูง",
    "มีอารมณ์เศร้าอย่างต่อเนื่องหรือเป็นโรคซึมเศร้า(วินิจฉัยโดยแพทย์)",
    "ความเศร้าโศกจากการสูญเสีย(ทั้งระยะสั้นและเรื้อรัง)",
    "บาดแผลทางใจ/ประสบการณ์เลวร้ายในวัยเด็ก",
    "มีความคิดฆ่าตัวตาย/คิดเกี่ยวกับความตาย/ความคิดทำร้ายตัวเอง",
    "ปัญหาการปรับตัว/ ขาดทักษะทางสังคม",
    "ปัญหาความสัมพันธ์ภายในครอบครัว",
    "ปัญหาความสัมพันธ์กับคนรัก",
    "ปัญหาความสัมพันธ์เพื่อน",
    "พฤติกรรมเสพติด(สารเสพติด/การพนัน/เพศสัมพันธ์)",
    "ปัญหาสุขภาพจิตที่มีอาการในกลุ่มวิตกกังวล",
    "มีอาการเจ็บป่วยทางกายซึ่งเป็นผลมาจากปัญหาทางจิตใจ",
    "ปัญหาการเรียน/หมดไฟในการเรียน/อยากเปลี่ยนคณะ",
    "ต้องการเข้าใจหรือพัฒนาตนเอง/ค้นหาเป้าหมายหรือความหมายชีวิต",
    "ปัญหาบุคลิกภาพ",
    "อื่นๆ"
  ];



  const combineOptions = (options: string | null | undefined): string[] => {
    // ตรวจสอบค่า options ว่าเป็น null หรือ undefined หรือไม่
    if (options === null || options === undefined) {
      return [];
    }
  
    // ใช้ regex แยกตามช่องว่าง, คอมม่า, เครื่องหมายปีกกา, และเครื่องหมายคำพูด
    const optionsArray = options.split(/[\s,{}"']+/);
  
    // กรองค่าออกจากอาร์เรย์ที่ไม่เป็นค่าว่าง
    const filteredOptions = optionsArray.filter(option => option.trim() !== "");
  
    // คืนค่าเป็นอาร์เรย์ของคำที่กรองแล้ว
    return filteredOptions;
  };
  
  // ใช้ฟังก์ชัน combineOptions กับ optionsListdisable
  const combinedOptions = combineOptions(checkList);


  const onSelect = (selectedList: string[], selectedItem: string) => {
    // ใช้ Set เพื่อให้ค่าไม่ซ้ำกัน
    const updatedValues = Array.from(new Set([...selectedValues, ...selectedList]));
    setSelectedValues(updatedValues);
  };

  const onRemove = (selectedList: string[], removedItem: string) => {
    // ลบค่าที่ถูกลบออกจาก selectedValues
    setSelectedValues(selectedList);
  };

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
    const apiUrl = `https://entaneermindbackend.onrender.com/api/infor/detailinfor/${id}`;
    try {
      const response = await axios.post(apiUrl, { id });

      setInfor(response.data[0]); // Assuming you expect only one object
      setTextEditorContent(response.data[0].details_consultation)
      setCheckList(response.data[0].mental_health_checklist)
      // setSelectedValues(response.data[0].mental_health_checklist)
      setRiskLevel(response.data[0].mental_risk_level)
    } catch (error) {
      console.log("Can't get data", error);
    }
  }


  async function updatesingledata(
    details_consultation: string,
    mental_health_checklist: string[],
    mental_risk_level: string,
    event_id: string
  ) {
    const apiUrl = `https://entaneermindbackend.onrender.com/api/infor/editinfor/${id}`;
    try {
      await axios.put(apiUrl, {
        details_consultation,
        mental_health_checklist,
        mental_risk_level,
        event_id,
      });
      window.location.reload();

    } catch (error) {
      console.log("", error);
    }
  }

  // const handlechecklistChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  //   setCheckList(event.target.value);
  // };

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
                    <Input placeholder={infor.major} {...field} disabled />
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
                  <option value="-">-</option>
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

                <div>
                  <Multiselect
                    isObject={false}
                    onKeyPressFn={function noRefCheck() { }}
                    onRemove={onRemove}
                    onSearch={function noRefCheck() { }}
                    onSelect={onSelect}
                    options={optionsList}
                    selectedValues={combinedOptions}

                  />
                </div>
                <div>
                </div>
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
                  style={{
                    resize: "none", // ปิดการขยายขนาดกล่อง
                    overflowY: "auto", // แสดงแถบเลื่อนเมื่อข้อความยาวเกินกล่อง
                    height: "150px", // กำหนดความสูงคงที่ของกล่อง
                  }}
                />

              </FormControl>
            </div>

            <Button
              type="submit"
              onClick={(event) => {
                event.preventDefault();
                if (id) {
                  updatesingledata(textEditorContent, selectedValues, riskLevel, id);
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
