"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import { Navbaradmin } from "../component/Navbaradmin";
import { Button } from "flowbite-react";
import axios from "axios";
import { Carousel, Modal, TextInput } from "flowbite-react";
import { CiImageOn } from "react-icons/ci";
import { FaTrash } from "react-icons/fa";

type Props = {};

interface Article {
    id: string;
    text_content: string | null;
    image_url: string[] | null; // เปลี่ยนจาก image_url เป็น image_urls
}

export default function Page({ }: Props) {
    const [articles, setArticles] = useState<Article[]>([]);
    const [selectedFile, setSelectedFile] = useState<File[]>([]); // State to store the selected file
    const [uploadStatus, setUploadStatus] = useState<string>(""); // State to store upload status
    const [textEditorContent, setTextEditorContent] = useState<string>("");
    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    // Handler for file input change
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const filesArray = Array.from(e.target.files);
            setSelectedFile(filesArray);
            console.log("Selected files:", filesArray);
        }
    };

    // Handler for upload button click
    const handleUpload = async () => {
        if (selectedFile.length === 0 && !textEditorContent) {
            alert("Please select files before uploading.");
            return;
        }

        const apiUrl = "http://localhost:3001/api/img/upload"; // Update with your actual API endpoint
        const formData = new FormData();

        // เพิ่มไฟล์ทั้งหมดลงใน FormData
        selectedFile.forEach((file) => {
            formData.append("logo", file); // 'logos' ควรตรงกับ key ที่ backend คาดหวัง
        });
        formData.append("text_content", textEditorContent); // เพิ่ม text_content ลงใน FormData

        try {
            setUploadStatus("Uploading...");
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    "Content-Type": "multipart/form-data", // Important for file uploads
                },
            });
            setUploadStatus("Upload successful!");
            window.location.reload();
            // console.log("Server response:", response.data);
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
           
            
            // console.log(response.data);

        } catch (error) {
            console.log("Can't show article: ", error);
        }
    }

    async function deletearticle(id: string) {
        const apiUrl = `http://localhost:3001/api/img/delimgtest`;
        try {
            await axios.put(apiUrl, { id });
            
            window.location.reload();
        } catch (error) {
            console.log("Can't delete: ", error);
        }
    }

    useEffect(() => {
        showarticle(); 
    }, []); // เพิ่ม [] เพื่อให้ useEffect ทำงานแค่ครั้งแรกที่ component mount

    return (
        <>
            <Navbaradmin />
            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-[#8FC1E3]">บทความ</h1>
                </div>
            </header>

            <div className="px-4">
                <div
                    className="bg-white shadow border p-4 mb-4 rounded-lg my-10 mx-auto max-w-lg cursor-pointer"
                    onClick={handleShow}
                >
                    <TextInput id="email1" type="email" placeholder="เพิ่มบทความใหม่ ..." readOnly />
                    <hr className="border-t-2 border-gray-300 my-4" />
                    <div>
                        <label className="bg-white text-gray-800 px-4 py-2 rounded-lg cursor-pointer inline-flex items-center gap-2 w-full hover:bg-gray-300 transition-colors duration-300">
                            <CiImageOn className="text-3xl" />
                            เพิ่มรูปภาพใหม่
                        </label>
                    </div>
                </div>

                <Modal dismissible show={!!showModal} onClose={handleClose}>
                    <Modal.Body>
                        <div className="grid grid-cols-1 gap-4">
                            <textarea
                                placeholder={"เพิ่มบทความใหม่"}
                                value={textEditorContent}
                                onChange={handleTextEditorChange}
                                className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                                style={{
                                    resize: "none",
                                    height: "150px",
                                }}
                            />
                            <div className="flex flex-col gap-2">
                                <label className="bg-white text-gray-800 px-4 py-2 rounded-lg cursor-pointer inline-flex items-center gap-2 hover:bg-gray-300 transition-colors duration-300">
                                    <CiImageOn className="text-3xl" />
                                    เลือกรูปภาพ
                                    <input
                                        type="file"
                                        onChange={handleFileChange}
                                        accept="image/*"
                                        className="hidden"
                                        multiple
                                    />
                                </label>
                                {selectedFile.length > 0 ? (
                                    <p className="mt-3 text-gray-600">: {selectedFile.map(file => file.name).join(', ')}</p>
                                ) : <p className="mt-3 text-gray-600">: ยังไม่ได้เลือก</p>}
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="bg-[#ff0000] hover:bg-gray-300 hover:text-white transition-colors duration-300" onClick={handleClose}>Close</Button>
                        <Button className="bg-[#a5cde8] hover:bg-gray-300 hover:text-white transition-colors duration-300" onClick={handleUpload}>อัปโหลด</Button>
                    </Modal.Footer>
                </Modal>

                {/* แสดงรายการบทความ */}
                <div className="max-w-7xl mx-auto">
                    {articles.length > 0 ? (
                        articles.map((article) => (
                            <div key={article.id} className="bg-white shadow border p-4 mb-4 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4 relative">
                                <div>
                                  
                                    {article.image_url && article.image_url.length > 0 ? (
                                        article.image_url.map((url: string, index: number) => (
                                            // <p key={index}>{url}</p>
                                              <img
                                                key={index}
                                                src={url}
                                                alt={`Image ${index + 1} of article ${article.id}`}
                                                className="mt-4 rounded-lg shadow-md w-full h-auto object-cover"
                                            /> 
                                        ))
                                    ) : null}

                                   

                                </div>
                                <div className="col-span-2 mx-8 my-8">
                                    <p className="font-normal text-gray-700 dark:text-gray-400 mt-5">{article.text_content || ""}</p>
                                </div>
                                <Button onClick={() => deletearticle(article.id)} className="absolute top-3 right-3 h-8 w-8 bg-[#ff0000]">
                                    <FaTrash className="mb-2 " />
                                </Button>
                            </div>
                        ))
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
        </>
    );

}
