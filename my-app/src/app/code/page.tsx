"use client";
import { useEffect, useState } from "react";
import uniqueString from 'unique-string';
import Nav from "../component/Nav";
import { Carousel } from "flowbite-react";

export default function MePage() {
    const [generatedString, setGeneratedString] = useState("");
    const [copySuccess, setCopySuccess] = useState("");

    const generateNewString = () => {
        setGeneratedString(uniqueString());
        setCopySuccess("");
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(generatedString);
            setCopySuccess("Copied!");
        } catch (err) {
            setCopySuccess("Failed to copy!");
        }
    };

    return (
        <>
            <Nav />
            <div className=" rounded p-8">
            <div className=' h-32 sm:h-48 xl:h-60 2xl:h-72'>
                <Carousel>
                <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
                <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
                </Carousel>
            </div>
                <h2 className="text-2xl mb-8">Random Access Code Generator</h2>
                <button
                    onClick={generateNewString}
                    className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-8"
                >
                    Generate 
                </button>
                <hr className="border-gray-400 mb-8"/>
                <div className="flex flex-col items-start">
                    <p className="text-lg mb-8">Generated Unique String: {generatedString}</p>
                    <button
                        onClick={copyToClipboard}
                        // className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700"
                    ><svg className="h-8 w-8  text-teal-700"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
                        
                    </button>
                    {copySuccess && <p className="mt-2 text-green-500">{copySuccess}</p>}
                </div>
            </div>
        </>
    );
}
