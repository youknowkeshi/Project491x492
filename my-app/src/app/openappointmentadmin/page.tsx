"use client";
import { Button, Card, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
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


type Props = {};

interface getchecktime {
    event_id: string
    start_datetime: string
    end_datetime: string
    room: string
}

export default function Page({ }: Props) {

    const [closeTimeSlot, setCloseTimeSlot] = useState<getchecktime[]>([]);
    const [idcancel, setidcancel] = useState("");
    const [startCancle, setStartCancle] = useState("");
    const [endCancle, setEndCancle] = useState("");
    const [roomCancle, setRoomCancle] = useState("");
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);

    const [loading, setLoading] = useState(false);


    async function getclosetimeslot() {
        const apiUrl = "https://entaneermindbackend.onrender.com/api/admin/getclosetimeslot";
        try {
            const response = await axios.get(apiUrl)
            if (response.data.length > 0) {
                setCloseTimeSlot(response.data);
            } 

        } catch (error) {
            console.log("Can't get information users", error);
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

    const handleCancel = async (start_datetime: string, end_datetime: string, room: string) => {
        setLoading(true)
        if (room === 'conseling_room1') {
            await GetEventIdCalendar(start_datetime, end_datetime, room);
            setLoading(false)
            window.location.reload();
        } else if (room === "conseling_room2") {
            await GetEventIdCalendar2(start_datetime, end_datetime, room);
            setLoading(false)
            window.location.reload();
        }

    };

    useEffect(() => {
        getclosetimeslot()
    })

    return (
        <div>
            <Navbaradmin />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                        รายการวันเวลาที่ปิดรับบริการ
                    </h1>
                </div>
            </header>
            <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">


                {closeTimeSlot.length === 0 ? (
                    <h5 className="mt-11 mb-4 p-4 relative text-center text-xl font-bold">ไม่มีรายการปิดรับบริการ</h5>
                ) : (
                    closeTimeSlot.map((close, index) => (
                        <Card
                            key={index}
                            className="border-r-4 border-l-4 border-x-cyan-300 mt-11 mb-4 p-4 relative"
                        >
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {close.room}
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {close.start_datetime}
                            </p>
                            <p className="font-normal text-gray-700 dark:text-gray-400">
                                {close.end_datetime}
                            </p>

                            <div className="flex flex-row gap-4 absolute bottom-4 right-4">
                                <Button
                                    gradientMonochrome="failure"
                                    onClick={() => {
                                        setidcancel(close.event_id);
                                        setStartCancle(close.start_datetime);
                                        setEndCancle(close.end_datetime);
                                        setRoomCancle(close.room);

                                        // ตั้งค่าเปิด Modal หลังจากตั้งค่าทั้งหมด
                                        setIsConfirmationModalOpen(true);
                                    }}
                                >
                                    เปิดเวลารับบริการ
                                </Button>
                            </div>
                        </Card>
                    ))
                )}

                {isConfirmationModalOpen && (
                    <Dialog
                        open={isConfirmationModalOpen}
                        onOpenChange={setIsConfirmationModalOpen}
                    >
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>เปิดรับบริการ</DialogTitle>
                                <DialogDescription>
                                    คุณได้เลือกการปิดรับบริการวันที่{"  "}

                                    {/* {date?.toLocaleDateString()} at {selectedTimeSlot}. */}
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="sm:justify-end">
                                <Button
                                    className="bg-blue-500 text-white border-blue-500 mt-4"
                                    type="button"
                                    disabled={loading} // ปิดปุ่มเมื่อกำลังโหลด
                                    onClick={() => handleCancel(startCancle, endCancle, roomCancle)}
                                >
                                    {loading ? "กำลังประมวลผล..." : "ยืนยัน"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                )}
            </div>
        </div>
    );
}
