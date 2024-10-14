"use client";
import * as React from "react";
import { Button, Card, Modal } from "flowbite-react";
import { useState } from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import axios from "axios";
import moment from 'moment-timezone';
import { Navbaradmin } from "../component/Navbaradmin";
import { useRouter } from 'next/navigation'; // นำเข้า useRouter
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { event } from "jquery";


type Props = {};

type Event = {
  event_id: string;
  start_datetime: string;
  end_datetime: string;
  room: string;
  personid: string;
  topic: string;
  firstname_lastname: string;
  studentid: string;
  phone: string;
  major: string;
  gender: string;
  facebookurl: string;
  role: string;
  organization_name: string;
  cmuaccount: string;
  accounttype: string;
  gradelevel: string;
};


export default function Page({ }: Props) {
  const [openModal, setOpenModal] = useState(false);
  const handleShow = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [informationUsers, setInformationUsers] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const nowInThailand = moment().tz('Asia/Bangkok').format('YYYY-MM-DD');
  const [pastDetail, setPastDetail] = useState("")
  const [idcancel, setidcancel] = useState("");
  const [startCancle, setStartCancle] = useState("");
  const [endCancle, setEndCancle] = useState("");
  const [roomCancle, setRoomCancle] = useState("");
  const [facebookCancle, setFaceboolCancle] = useState("");
  const [nameCancle, setNameCancle] = useState("");
  const [event_id, setEvent_Id] = useState<Event[]>([]);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [senderMail, setSenderMail] = useState("entaneermindfriend1@gmail.com");
  const [senderName, setSenderEmail] = useState("EntaneerMindFriend");
  const [subjectMail, setSubjectMail] = useState("แจ้งเตือนมีนัดกับ EntaneerMindFriend");
  const [cmuaccount, setCmuaccount] = useState("");






  async function informationUser(selectedDate: Date) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/infor/list";
    try {
      const response = await axios.post(apiUrl, {
        date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "null",
      });
      if (response.data.length > 0) {
        setInformationUsers(response.data);
        // console.log(response.data);

      } else {
        setInformationUsers([])
      }


    } catch (error) {
      console.log("Can't get information users", error);
    }
  }



  async function detailUser(studentid: string, selectdete: string) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/infor/listdetail";
    try {
      const response = await axios.post(apiUrl, {
        studentid
      });


      if (response.data[0]) {
        setPastDetail(response.data[0].details_consultation)
      }



      // setPastDetail(response.data[1]?.details_consultation || '');
    } catch (error) {
      console.log("Can't get information users");
    }
  }

  async function DeleteEvents(event_id: string) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/appointment/cancel";
    try {
      await axios.delete(apiUrl, {
        data: { event_id },
      });
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function DeleteEvents2(event_id: string) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/appointment2/cancel";
    try {
      await axios.delete(apiUrl, {
        data: { event_id },
      });
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function DeleteEventsCalendar(event_id: string) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/google/deleteevent";
    try {
      await axios.put(apiUrl, {
        event_id,
      });
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function DeleteEventsCalendar2(event_id: string) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/google/deleteevent2";
    try {
      await axios.put(apiUrl, {
        event_id,
      });
    } catch (error) {
      console.log("Can't Delete Event ", error);
    }
  }

  async function GetEventIdCalendar(
    start_datetime: string,
    end_datetime: string,
    room: string
  ) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/appointment/getidcalendar";
    try {
      const response = await axios.put(apiUrl, {
        start_datetime,
        end_datetime,
        room,
      });
      const eventsid = response.data[0].event_id;
      if (eventsid) {


        DeleteEventsCalendar(eventsid);
      }
    } catch (error) {
      console.log("Can't GET EventId ", error);
    }
  }

  async function GetEventIdCalendar2(
    start_datetime: string,
    end_datetime: string,
    room: string
  ) {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/appointment2/getidcalendar";
    try {
      const response = await axios.put(apiUrl, {
        start_datetime,
        end_datetime,
        room,
      });
      const eventsid = response.data[0].event_id;
      if (eventsid) {
        DeleteEventsCalendar2(eventsid);
      }
    } catch (error) {
      console.log("Can't GET EventId ", error);
    }
  }

  async function reminderappoint() {
    const apiUrl = "https://entaneermindbackend.onrender.com/api/user/getmailandtime";
    try {
      const response = await axios.get(apiUrl);
      setEvent_Id(response.data);
      setIsConfirmationModalOpen(true)
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function remindsendmail() {
    const apiUrl = `/api/email`

    try {
      setLoading(true)

      for (const event of event_id) {
        await axios.post(apiUrl, {
          cmuaccount: event.cmuaccount,
          firstname_lastname: event.firstname_lastname,
          // start_datetime: event.start_datetime,
          // end_datetime: event.end_datetime,
          // room: event.room,
          sendername: senderName,
          sendermail: senderMail,
          subject: subjectMail,
          message: `สวัสดีครับ คุณ ${event.firstname_lastname}<br><br><br>คุณได้ทำการนัดหมายเพื่อเข้ารับคำปรึกษากับทาง EntaneerMindFriend ในวันและเวลาต่อไปนี้:<br>${isCurrentAppointment(event.start_datetime)}<br>สถานที่: คณะวิศวกรรมศาสตร์อาคารเรียนรวม 3 ชั้น ห้อง ${event.room}<br>หากท่านไม่สามารถมาพบตามเวลาที่นัดหมายได้ กรุณาแจ้งให้ทราบล่วงหน้าผ่านเพจ EntaneerMindFriend และโปรดทำการยกเลิกนัดหมายผ่านทางเว็บไซต์<br><br>ขอบคุณครับ`,
        });
      }

      setLoading(false);
      window.location.reload()

    } catch (error: any) {
      console.log(`Remind Error: ${error}`);
      throw new Error(`Remind Error: ${error}`);
    }

  }


  async function cancelsendmail(start_datetime: string, room: string, firstname_lastname: string, cmuaccount: string) {
    const apiUrl = `/api/email`

    try {
      setLoading(true)

      await axios.post(apiUrl, {
        cmuaccount: cmuaccount,
        firstname_lastname: firstname_lastname,
        // start_datetime: event.start_datetime,
        // end_datetime: event.end_datetime,
        // room: event.room,
        sendername: senderName,
        sendermail: senderMail,
        subject: subjectMail,
        message: `สวัสดีครับ คุณ ${firstname_lastname}<br><br><br>เนื่องจาก EntaneerMindFriend ไม่สะดวกในวันและเวลาต่อไปนี้:<br>${isCurrentAppointment(start_datetime)}<br>สถานที่: คณะวิศวกรรมศาสตร์อาคารเรียนรวม 3 ชั้น ห้อง ${room}<br>หากท่านไม่สามารถมาพบตามเวลาที่นัดหมายได้ กรุณาแจ้งให้ทราบล่วงหน้าผ่านเพจ EntaneerMindFriend และโปรดทำการยกเลิกนัดหมายผ่านทางเว็บไซต์<br><br>ขอบคุณครับ`,
      });

      setLoading(false);
      window.location.reload()

    } catch (error: any) {
      console.log(`Remind Error: ${error}`);
      throw new Error(`Remind Error: ${error}`);
    }

  }

  const handleCancel = async (start_datetime: string, end_datetime: string, event_id: string, room: string, firstname_lastname: string, cmuaccount: string) => {

    if (room === 'conseling_room1') {
      setLoading(true)
      await Promise.all([
        GetEventIdCalendar(start_datetime, end_datetime, room),
        DeleteEvents(event_id),
        cancelsendmail(start_datetime, room, firstname_lastname, cmuaccount)
      ]);
      setLoading(false)
      await window.location.reload();
    } else if (room === "conseling_room2") {
      setLoading(true)
      await Promise.all([
        GetEventIdCalendar2(start_datetime, end_datetime, room),
        DeleteEvents2(event_id),
        cancelsendmail(start_datetime, room, firstname_lastname, cmuaccount),
      ]);
      setLoading(false)
      await window.location.reload();
    }

    // GetEventIdCalendar(start_datetime, end_datetime);
    // await DeleteEvents(event_id);
    // window.location.reload()
  };

  const handleSelectDate = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      informationUser(selectedDate);
    }
  };

  const handleOpenModal2 = async (user: any) => {
    setSelectedUser(user);
    await detailUser(user.studentid, user.start_datetime);
  };

  const handleCloseModal2 = () => {
    setSelectedUser(null);
    setPastDetail("");
  };

  const isWeekend = (day: Date) => {
    const dayOfWeek = day.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
  };

  const isCurrentAppointment = (start_datetime: string): string => {
    const [date, timeWithZone] = start_datetime.split('T');
    const time = timeWithZone.substring(0, 5);
    const formattedTime = time.startsWith('0') ? time.slice(1) : time;
    const finalTime = formattedTime.endsWith(':') ? formattedTime.slice(0, -1) : formattedTime;

    return `${date} ${finalTime}`;
  };


  React.useEffect(() => {
    informationUser(new Date(nowInThailand))
  }, [])

  return (
    <div>
      <Navbaradmin />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            รายการนัด
          </h1>
        </div>
      </header>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-row mt-7 gap-7">

          <Popover>
            <PopoverTrigger asChild>
              <Button
                color={"gray"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !date && "text-muted-foreground",
                  "bg-neutral-100 hover:bg-cyan-300 text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>เลือกวัน</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelectDate}
                // disabled={(day) =>
                //   isWeekend(day)
                // }
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button
            gradientDuoTone="cyanToBlue"
            onClick={() => reminderappoint()}
          > เตือนนัดล่วงหน้า </Button>
        </div>

        {isConfirmationModalOpen && (
          <Dialog
            open={isConfirmationModalOpen}
            onOpenChange={setIsConfirmationModalOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>นัดหมายวันพรุ่งนี้มีดังนี้</DialogTitle>
                <DialogDescription>

                  {event_id.length === 0 ? (
                    <h5 className="mt-11 mb-4 p-4 relative text-center text-xl font-bold">
                      วันนี้ไม่มีรายการนัด
                    </h5>
                  ) : (
                    <div>
                      <ul>
                        {event_id.slice(0, 6).map((time, index) => (
                          <li key={index}>
                            <strong>ชื่อ : </strong> {time.firstname_lastname}
                            <strong> วันเวลา : </strong> {isCurrentAppointment(time.start_datetime)}
                            <strong> ห้อง : </strong> {time.room}
                          </li>
                        ))}
                        {event_id.length > 6 && <li>และรายการอื่น</li>}
                      </ul>
                    </div>
                  )}

                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="sm:justify-end">
                <Button
                  className="bg-blue-500 text-white border-blue-500 mt-4"
                  type="button"
                  disabled={loading} // ปิดปุ่มเมื่อกำลังโหลด
                  onClick={() => remindsendmail()}
                >
                  {loading ? "กำลังประมวลผล..." : "ยืนยัน"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        {informationUsers.length === 0 ? (
          <h5 className="mt-11 mb-4 p-4 relative text-center text-xl font-bold">วันนี้ไม่มีรายการนัด</h5>
        ) : (
          informationUsers.map((user, index) => (
            <Card
              key={index}
              className="border-r-4 border-l-4 border-x-cyan-300 mt-11 mb-4 p-4 relative"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                เวลา : {format(new Date(user.start_datetime), "HH:mm")} -{" "}
                {format(new Date(user.end_datetime), "HH:mm")}
              </h5>
              <hr />
              <p className="font-normal text-gray-700 dark:text-gray-400">
                ชื่อ : {user.firstname_lastname}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                รหัสนักศึกษา : {user.studentid}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                เมเจอร์ : {user.major}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                หัวข้อที่ต้องการพูดคุย : {user.topic}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                ชื่อ facebook : {user.facebookurl}
              </p>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                ห้องให้คำปรึกษาที่ : {user.room}
              </p>
              <div className="flex flex-row gap-4 absolute bottom-4 right-4">
                <Button
                  outline
                  gradientDuoTone="cyanToBlue"
                  onClick={() => handleOpenModal2(user)}
                >
                  รายละเอียด
                </Button>
                <Button
                  gradientMonochrome="failure"
                  onClick={() => {
                    setidcancel(user.event_id);
                    setStartCancle(user.start_datetime);
                    setEndCancle(user.end_datetime);
                    setRoomCancle(user.room);
                    setFaceboolCancle(user.facebookurl)
                    setNameCancle(user.firstname_lastname)
                    setCmuaccount(user.cmuaccount)
                    // ตั้งค่าเปิด Modal หลังจากตั้งค่าทั้งหมด
                    handleShow();
                  }}
                >
                  ยกเลิกนัด
                </Button>
              </div>
              <Modal
                dismissible
                show={!!openModal}
              >
                <Modal.Header />
                <Modal.Body>
                  <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                      หากคุณต้องการยกเลิกนัดโปรดติดต่อที่ facebook ของ {nameCancle} ก่อน{" "}
                      <a
                        href={`https://www.facebook.com/${facebookCancle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline"
                      >
                        https://www.facebook.com/{facebookCancle}
                      </a>
                    </p>
                  </div>
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    onClick={() => handleCancel(startCancle, endCancle, idcancel, roomCancle, nameCancle, cmuaccount)}
                    disabled={loading}
                    color="failure"
                  >
                   {loading ? "กำลังประมวลผล..." : "ยืนยัน"}
                  </Button>
                  <Button onClick={handleClose}
                    color="gray">ปิด</Button>
                </Modal.Footer>
              </Modal>
            </Card>
          ))
        )}

        {selectedUser && (
          <Modal dismissible show={!!selectedUser} onClose={handleCloseModal2}>
            <Modal.Header>รายละเอียดการปรึกษา</Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  บันทึกการปรึกษาก่อนหน้านี้ : {pastDetail || '-'}
                </p>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button gradientMonochrome="failure" onClick={handleCloseModal2}>
                ปิด
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </div>
    </div>
  );
}
