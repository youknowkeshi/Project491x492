"use client";
import { useEffect, useState } from "react";
import uniqueString from 'unique-string';
import Nav from "../component/Nav";

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
           <div className="mt-10">

            <h2 className="text-2xl mb-4">Random Access Code Generator</h2>
               <div className="flex flex-row items-start justify-center">
                   
                   <div>
                        <p className="text-lg mb-4">Generated Unique String: {generatedString}</p>
                        <button
                       onClick={generateNewString}
                       className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mb-4"
                        >
                       Generate New Unique String
                   </button>
                   </div>
                   <button
                        onClick={copyToClipboard}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 ml-5 mr-3"
                        >
                        Copy to Clipboard
                    </button>
                    {copySuccess && <p className="mt-2 text-green-500">{copySuccess}</p>}
               </div>
           </div>
       </>
   );
}
