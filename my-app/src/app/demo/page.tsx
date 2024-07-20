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
import { ComponentDrawer } from "../component/Drawer"
import { AreaChart ,XAxis ,YAxis ,CartesianGrid, Tooltip , Area} from 'recharts';


const data = [
    {
        "name": "Page A",
        "uv": 4000,
        "pv": 2400,
        "amt": 2400
    },
    {
        "name": "Page B",
        "uv": 3000,
        "pv": 1398,
        "amt": 2210
    },
    {
        "name": "Page C",
        "uv": 2000,
        "pv": 9800,
        "amt": 2290
    },
    {
        "name": "Page D",
        "uv": 2780,
        "pv": 3908,
        "amt": 2000
    },
    {
        "name": "Page E",
        "uv": 1890,
        "pv": 4800,
        "amt": 2181
    },
    {
        "name": "Page F",
        "uv": 2390,
        "pv": 3800,
        "amt": 2500
    },
    {
        "name": "Page G",
        "uv": 3490,
        "pv": 4300,
        "amt": 2100
    }
]



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
    
        <div>
            <ComponentDrawer />
            <AreaChart width={730} height={250} data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                <Area type="monotone" dataKey="pv" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
            </AreaChart>
        </div>

    );
}
