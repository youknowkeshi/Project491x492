"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter,useSearchParams  } from 'next/navigation';


export default function Home() {
    const [mycode, setMyCode] = useState('');
    const searchParams = useSearchParams()
    const code = searchParams && searchParams.get('code')
    const router = useRouter();

    useEffect(() => {


        if (code) {
            setMyCode(code);
            OAuth();
        }
    }, []);

    async function OAuth() {
        const apiUrl = 'http://localhost:3001/api/google/redirect';

        try {    
            const response = await axios.post(apiUrl, { code });
            console.log('Response:', response.data);
            // router.push("/demo");
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <div className="p-3 vstack gap-3">
            <h1>Hello World</h1>
        </div>
    );
}
