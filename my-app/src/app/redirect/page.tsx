"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter, useSearchParams } from 'next/navigation';
import { setCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import Loading from "../loading"


export default function Home() {
    const searchParams = useSearchParams()
    const code = searchParams && searchParams.get('code')
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (code) {
            OAuth();
        } else {
            console.log("No code found in URL");
        }
    }, []);

    if (isLoading) {
        return <Loading /> // ข้อความหรือ spinner เมื่อกำลังโหลด
    }

    async function OAuth() {
        const apiUrl = 'https://entaneermindbackend.onrender.com/api/google/redirect';

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
                        expiresIn: "24h",
                    }
                );

                setCookie("google-oauth-example-token", token, {
                    maxAge: 3600,
                    httpOnly: true, // ตั้งเป็น true ในการผลิต
                    sameSite: "lax",
                    secure: process.env.NODE_ENV === "production",
                    path: "/",
                    domain: "https://project491x492.vercel.app",
                });

                router.push("/List");
            } catch (error) {
                console.error('JWT Signing Error:', error);
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }




    return (
        <div className="p-3 vstack gap-3">

        </div>
    );
}
