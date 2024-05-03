"use client"
import { useEffect, useState } from "react";
import uniqueString from 'unique-string';

export default function MePage() {
    const [generatedString, setGeneratedString] = useState("");


    const generateNewString = () => {
        setGeneratedString(uniqueString());
    };

    return (
        <div className="p-3">
            <p>Generated Unique String: {generatedString}</p>
            <button onClick={generateNewString}>Generate New Unique String</button>
        </div>
    );
}
