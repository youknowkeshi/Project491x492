"use client"
import React, { useState } from 'react'
import { Nav } from '../component/Nav'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'

const formSchema = z.object({
  username: z.string().min(2).max(50),
  surname: z.string().min(2).max(50),
  phone: z.string().min(8).max(15), // Example validation for phone number
  facebookUrl: z.string().url(),   // Example validation for URL format
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/), // Example validation for date format (YYYY-MM-DD)
  studentId: z.string().min(5).max(10), // Example validation for student ID
  textEditorContent: z.string(), // Validation for text editor content
})

export function ProfileForm() {
    // State for text editor content
    const [textEditorContent, setTextEditorContent] = useState("");

    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        username: "",
        surname: "",
        phone: "",
        facebookUrl: "",
        date: "",
        studentId: "",
        textEditorContent: "",
      },
    })
   
    // 2. Define a submit handler.
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
    
    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-7"> {/* Adjusted to grid layout with 2 columns */}
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="surname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Surname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Surname" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your surname.
                                    </FormDescription>
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
                                        <Input placeholder="Phone Number" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please enter your phone number.
                                    </FormDescription>
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
                                        <Input placeholder="Facebook Profile URL" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please enter your Facebook profile URL.
                                    </FormDescription>
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
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please enter a date in the format YYYY-MM-DD.
                                    </FormDescription>
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
                                        <Input placeholder="Student ID" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Please enter your student ID.
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <FormItem> {/* Text Editor Field */}
                            <FormLabel>รายละเอียดการพูดคุย</FormLabel>
                            <FormControl>
                                <textarea
                                    placeholder="Write something..."
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
    )
}
