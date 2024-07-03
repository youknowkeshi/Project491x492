"use client";
import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import moment from 'moment-timezone';

import { Modal, Button } from 'flowbite-react';

export default function MyPage() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [currentTime, setCurrentTime] = useState("")
    const nowInThailand = moment().tz('Asia/Bangkok');

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const formatDate = (date: Date | undefined): string => {
        if (!date) {
            return "No date selected";
        }

        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");

        return `${year}-${month}-${day}`;
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

        <div>
            <Button onClick={handleShow}>Open Modal</Button>

            <Modal
                dismissible
                show={!!showModal}
                onClose={handleClose}
            >
                <Modal.Header>Talk details</Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            หัวข้อที่ต้องการพูดคุย :
                        </p>
                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                            รายละเอียดการรับคำปรึกษาครั้งแรก
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
        </div>
    );
}
