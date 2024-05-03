"use client"
import React, { use, useState } from 'react';
import Image from 'next/image';
import { pool } from '../lib/db';
import axios, { AxiosError, AxiosResponse } from "axios";

export default function RegisterPage() {
    const [inputValue, setInputValue] = useState('');
    const [Id, setId] = useState('');
    const [phone, setphone] = useState('');
    const [major, setmajor] = useState('');
    const [gender, setgender] = useState('');
    const [topic, settopic] = useState('');
    const [facebookurl, setfacebookurl] = useState('');



    const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setId(event.target.value);
    };

    const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setphone(event.target.value);
    };

    const handleMajorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setmajor(event.target.value);
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setgender(event.target.value);
    };

    const handleTopicChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        settopic(event.target.value);
    };

    const handleFacebookUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setfacebookurl(event.target.value);
    };



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
        } catch (error) {
            console.log(error);
        }
    }

    const handleSaveData = () => {
        updatedataUsers(Id, phone, major, gender, topic, facebookurl);
        setphone('');
        setmajor('');
        setgender('');
        settopic('');
        setfacebookurl('');
        setId('');
    };

    return (
        <div className="p-3 vstack gap-3">
            <h1>Welcome to Register Page</h1>

            <div>
                <h2> Phone :  &nbsp;
                    <input type="text" value={phone} onChange={handlePhoneChange} placeholder="Enter your value" /> </h2>
            </div>

            <div>
                <h2> Major : &nbsp;
                    <input type="text" value={major} onChange={handleMajorChange} placeholder="Enter your value" /> </h2>
            </div>

            <div>
                <h2> Gender :  &nbsp;
                    <input type="text" value={gender} onChange={handleGenderChange} placeholder="Enter your value" /> </h2>
            </div>

            <div>
                <h2> Topic : &nbsp;
                    <input type="text" value={topic} onChange={handleTopicChange} placeholder="Enter your value" /> </h2>
            </div>

            <div>
                <h2> Facebookurl : &nbsp;
                    <input type="text" value={facebookurl} onChange={handleFacebookUrlChange} placeholder="Enter your value" /> </h2>
            </div>

            <div>
                <h2> Access code : &nbsp;
                    <input type="text" value={Id} onChange={handleIdChange} placeholder="Enter your value" /> </h2>
            </div>
            <button onClick={handleSaveData}>Save Data</button>
        </div>
    );
}
