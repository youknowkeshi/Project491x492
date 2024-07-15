"use client"
import React, { useState, useEffect } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';

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
    facebookUrl: z.string().url(),   // Example validation for URL format
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Example validation for date format (YYYY-MM-DD)
    studentId: z.string().min(5).max(10), // Example validation for student ID
    room: z.string().min(2).max(50),
    topic: z.string().min(2).max(50),
    textEditorContent: z.string(), // Validation for text editor content
});

export function ProfileForm() {
    // State for text editor content
    const [textEditorContent, setTextEditorContent] = useState("");
    const searchParams = useSearchParams();
    const id = searchParams ? searchParams.get('id') || null : null;
    const [infor, setInfor] = useState<Information | null>(null); // Change to single object instead of array

    // Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            major: "",
            phone: "",
            facebookUrl: "",
            date: "",
            studentId: "",
            textEditorContent: "",
        },
    });

    // Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
        console.log("Text Editor Content:", textEditorContent); // Log the text editor content
    }

    // Function to handle text editor content change
    function handleTextEditorChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setTextEditorContent(e.target.value);
    }

    async function Getsingledata() {
        const apiUrl = `/api/informationusers/${id}`;
        try {
            const response = await axios.get(apiUrl);
            setInfor(response.data); // Assuming you expect only one object
        } catch (error) {
            console.log("Can't get data", error);
        }
    }

    async function updatesingledata(details_consultation:string, mental_health_checklist:string, mental_risk_level:string,event_id:string) {
        const apiUrl = `/api/informationusers/${id}`
        try{
            await axios.put(apiUrl,{details_consultation,mental_health_checklist,mental_risk_level,event_id})

        }catch(error){
            console.log("",error);
            
        }
    }

    useEffect(() => {
        if (id) {
            Getsingledata();
        }
    }, [id]);

    if (!infor) return <div>Loading...</div>; // Handle case where data is still loading or `infor` is null

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-7">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder={infor.firstname_lastname} {...field} disabled />
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
                                        <Input placeholder={infor.major} {...field} />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your surname.
                                    </FormDescription> */}
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
                                    {/* <FormDescription>
                                        Please enter your phone number.
                                    </FormDescription> */}
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
                                        <Input placeholder={infor.facebookurl} {...field} disabled />
                                    </FormControl>
                                    {/* <FormDescription>
                                        Please enter your Facebook profile URL.
                                    </FormDescription> */}
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
                                        <Input placeholder={infor.start_datetime} {...field} disabled />
                                    </FormControl>
                                    {/* <FormDescription>
                                        Please enter a date in the format YYYY-MM-DD.
                                    </FormDescription> */}
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
                                    {/* <FormDescription>
                                        Please enter your student ID.
                                    </FormDescription> */}
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
                                        <Input placeholder={infor.room} {...field} 
                                        disabled
                                        />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your surname.
                                    </FormDescription> */}
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
                                        <Input placeholder={infor.topic} {...field} 
                                        disabled
                                        />
                                    </FormControl>
                                    {/* <FormDescription>
                                        This is your surname.
                                    </FormDescription> */}
                                </FormItem>
                            )}
                        />
                        <FormItem> {/* Text Editor Field */}
                            <FormLabel>รายละเอียดการพูดคุย</FormLabel>
                            <FormControl>
                                <textarea
                                    placeholder={infor.details_consultation ? infor.details_consultation : 'โปรดกรอกรายละเอียดการพูดคุย'}
                                    value={textEditorContent}
                                    onChange={handleTextEditorChange}
                                    className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                    rows={4}
                                />
                            </FormControl>
                            <FormDescription>
                                Edit and save text content here.
                            </FormDescription>
                            
                            <Button type="submit">Submit</Button>
                        </FormItem>
                        
                    </div>
                </form>
            </Form>
        </>
    );
}