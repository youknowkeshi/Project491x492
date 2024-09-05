"use client"
import React, { useState, useEffect } from "react";
import { Navbaradmin } from "../component/Navbaradmin";
import { Carousel, FileInput, Label, Button } from "flowbite-react";
import axios from "axios";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,

} from "@/components/ui/form";


type Props = {};

interface Article {
    text: string;
    img_url: string;
}

export default function Page({ }: Props) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setSelectedFile(event.target.files[0]);
        }
    };

    const showArticles = async () => {
        const apiUrl = '/api/article';
        try {
            const response = await axios.get(apiUrl);
            setArticles(response.data);
        } catch (error) {
            console.log("Can't show articles: ", error);
        }
    };

    const addArticle = async (text: string, img_url: string) => {
        const apiUrl = '/api/article';
        try {
            await axios.post(apiUrl, { text, img_url });
            showArticles(); // Refresh the article list after adding a new one
        } catch (error) {
            console.log("Can't add article: ", error);
        }
    };



    const addimg = async (sourceFile: File) => {
        const apiUrl = 'http://localhost:3001/api/admin/addimg';
        const formData = new FormData();
        formData.append('file', sourceFile);
        console.log("dffdf", formData);


        try {
            await axios.put(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log("File uploaded successfully");
        } catch (error) {
            console.log("Can't add image: ", error);
        }
    };

    const handleSubmit = async () => {
        if (selectedFile) {
            await addimg(selectedFile);
        } else {
            console.log("No file selected");
        }
    };

    useEffect(() => {
        // showArticles();
        console.log("hello", selectedFile);

    }, [selectedFile]);

    return (
        <>
            <Navbaradmin />
            <div className="mt-7 h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                    <img
                        src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
                        alt="..."
                    />
                </Carousel>
            </div>
            <form className="w-full max-w-sm">
                <div>

                    <div className="md:w-2/3">
                        <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Jane Doe"/>
                    </div>
                </div>
            </form>

            {/* <FormItem>
            <div>
              <FormLabel>รายละเอียดการพูดคุย</FormLabel>
              <FormControl>
                <textarea

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
              
               
            >
              บันทึก
            </Button>
          </FormItem> */}

            <div className="grid grid-cols-2 justify-items-start gap-7 mt-7">
                <div>
                    <div>
                        <Label htmlFor="file-upload-helper-text" value="Upload file" />
                    </div>
                    <FileInput
                        id="file-upload-helper-text"
                        helperText="SVG, PNG, JPG or GIF (MAX. 800x400px)."
                        onChange={handleFileChange}
                    />
                    {selectedFile && <p>Selected file: {selectedFile.type}</p>}
                    <Button onClick={handleSubmit} className="mt-4">Submit</Button>
                </div>
                <div>
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        Noteworthy technology acquisitions 2021
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400 mt-5">
                        Here are the biggest enterprise technology acquisitions of 2021 so
                    </p>
                </div>
            </div>
        </>
    );
}
