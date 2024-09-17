"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";


export default function Home() {
    const searchParams = useSearchParams()
    const code = searchParams && searchParams.get('code')
    const router = useRouter();

    useEffect(() => {
        if (code) {
            OAuth();
        } else {
            console.log("No code found in URL");
        }
    }, []);

    async function OAuth() {
        const apiUrl = 'http://localhost:3001/api/google/redirect';
    
        try {
            const response = await axios.post(apiUrl, { code });
    
            const Info = response.data.info;
            if (!Info) {
                throw new Error('Info not found in API response');
            }
    
            try {
                
                const token = jwt.sign(
                    {
                        id: Info.id,
                        email: Info.email,
                        verified_email: Info.verified_email,
                        name: Info.name
                    },
                    process.env.NEXT_PUBLIC_JWT_SECRET_GOOGLE!,
                    {
                        expiresIn: "1h",
                    }
                );
    
                setCookie("google-oauth-example-token", token, {
                    maxAge: 3600,
                    httpOnly: false, // ตั้งเป็น true ในการผลิต
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",
                    path: "/",
                    domain: "localhost",
                });
    
                router.push("/demo");
            } catch (error) {
                console.error('JWT Signing Error:', error);
            }
    
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
