"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import moment from 'moment-timezone';
import axios from "axios";
import {
    Button,
    Card,
    Checkbox,
    Label,
    TextInput,
    Textarea,
    Select,
    Modal,
} from "flowbite-react";
import {ComponentDrawer} from "../report/Drawer"



export default function MyPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [currentTime, setCurrentTime] = useState("")
    const nowInThailand = moment().tz('Asia/Bangkok');

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const [Id, setId] = useState('');

    const formatDate = (date: Date | undefined): string => {
        if (!date) {
            return "No date selected";
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
    };

    async function afterUseAccesscode(accesscode: string) {
        const apiUrl = "http://localhost:3000/api/accesscode/manual-delete"
        try {
            await axios.put(apiUrl, { accesscode })
        } catch (error) {
            console.log("Can't manual-delete access code : ", error);

        }
    }

    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    };

    useEffect(() => {
        setCurrentTime(nowInThailand.format('HH:mm:ss'))
        console.log('Current time in Thailand:', currentTime);
    }, [])

    return (
        // <div>
        //     <Calendar
        //         mode="single"
        //         selected={date}
        //         onSelect={setDate}
        //         className="rounded-md border"
        //     />
        //     <div>{formatDate(date)}</div>
        // </div>

        // <div>
        //     <Button onClick={handleShow}>Open Modal</Button>

        //     <Modal
        //         dismissible
        //         show={!!showModal}
        //         onClose={handleClose}
        //     >
        //         <Modal.Header>Talk details</Modal.Header>
        //         <Modal.Body>
        //             <div className="space-y-6">
        //                 <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        //                     หัวข้อที่ต้องการพูดคุย :
        //                 </p>
        //                 <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
        //                     รายละเอียดการรับคำปรึกษาครั้งแรก
        //                 </p>
        //             </div>
        //         </Modal.Body>
        //         <Modal.Footer>
        //             <Button
        //                 gradientMonochrome="failure"
        //                 onClick={handleClose}
        //             >
        //                 Close
        //             </Button>
        //         </Modal.Footer>
        //     </Modal>
        // </div>


        <div>
            <ComponentDrawer/>
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
        <div>
            <Button onClick={() => afterUseAccesscode(Id)}>Test</Button>
        </div>
    </div>

    );
}
