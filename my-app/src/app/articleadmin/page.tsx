"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Navbaradmin } from "../component/Navbaradmin";
import { Button } from "flowbite-react";
import axios from "axios";

type Props = {};

interface Article {
    id: string;
    text_content: string | null;
    image_url: string | null;
}

export default function Page({ }: Props) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedFile, setSelectedFile] = useState<File | null>(null); // State to store the selected file
    const [uploadStatus, setUploadStatus] = useState<string>(""); // State to store upload status
    const [textEditorContent, setTextEditorContent] = useState<string>("");

    // Handler for file input change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setSelectedFile(e.target.files[0]);
            console.log("Selected file:", e.target.files[0]);
        }
    };

    // Handler for upload button click
    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Please select a file before uploading.");
            return;
        }

        const apiUrl = "http://localhost:3001/api/img/upload"; // Update with your actual API endpoint
        const formData = new FormData();
        formData.append("logo", selectedFile); // 'logo' should match the key expected by your backend
        formData.append("text_content", textEditorContent); // เพิ่ม text_content ลงใน FormData

        try {
            setUploadStatus("Uploading...");
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Important for file uploads
                },
            });
            setUploadStatus("Upload successful!");
            console.log("Server response:", response.data);
            // คุณอาจต้องการรีเซ็ตฟอร์มหรือทำการอื่นๆ หลังจากอัปโหลดสำเร็จ
        } catch (error) {
            console.error("Can't upload:", error);
            setUploadStatus("Upload failed. Please try again.");
        }
    };

    const handleTextEditorChange = (
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        setTextEditorContent(e.target.value);
    };

    async function showarticle() {
        const apiUrl = `http://localhost:3001/api/img/get`;
        try {
            const response = await axios.get(apiUrl);
            setArticles(response.data);
            console.log(response.data);
        } catch (error) {
            console.log("Can't show article: ", error);
        }
    }

    useEffect(() => {
        showarticle();
    }, []); // เพิ่ม [] เพื่อให้ useEffect ทำงานแค่ครั้งแรกที่ component mount

    return (
        <>
            <Navbaradmin />
            <header className="bg-whit shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-[#8FC1E3]">
                        บทความ
                    </h1>
                </div>
            </header>

            <div>
                {/* เพิ่มบทความ */}
                <div className="bg-whit shadow mx-[100px]  border p-4 mb-4 rounded-lg shadow-md  gap-4 mt-10">
                    <h1 className="my-3 ">เพิ่มบทความ</h1>

                    <input
                        type="file"
                        onChange={handleFileChange}
                        accept="image/*" // Optional: restrict file types
                        className=" rounded-lg shadow-md my-3"
                    />
                    <br />
                    <br />

                    {uploadStatus && <p>{uploadStatus}</p>}

                    <div className="grid grid-cols-2 justify-items-start gap-7 my-7">
                        <textarea
                            placeholder={"โปรดกรอกรายละเอียดการพูดคุย"}
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
                    </div>
                    <Button
                        className="my-3"
                        onClick={handleUpload}>
                        Upload
                    </Button>
                </div>

                {/* แสดงรายการบทความ */}
                <div className="max-w-7xl mx-auto">
                    <div >

                        {articles.length > 0 ? (
                            articles.map((article) => (
                                <div
                                    key={article.id}
                                    className="bg-whit shadow mx-[100px] max-w-7xl border p-4 mb-4 rounded-lg shadow-md grid grid-cols-3 gap-4 mt-10"
                                >


                                    <div className=" ">
                                        {article.image_url ? (
                                            <img
                                                src={article.image_url}
                                                alt={article.id}
                                                className="mt-4 rounded-lg shadow-md w-auto h-auto"
                                                style={{
                                                    maxWidth: "100%",
                                                    height: "auto",
                                                }}
                                            />
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                    </div>
                                    <div className="col-span-2 ">
                                        <p className="font-normal text-gray-700 dark:text-gray-400 mt-5">
                                            {article.text_content || ""}
                                        </p>
                                    </div>


                                </div>
                            ))
                        ) : (
                            <p>No articles available.</p>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
}
