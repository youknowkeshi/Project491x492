import { NextResponse ,NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";
import axiosHttpAdapter from 'axios-http-adapter';
import {JWTPayload} from '../types/JWTPayload'
import { pool } from './app/lib/db'


// This function can be marked async if using await inside
export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("cmu-oauth-example-token")?.value;
  if (!token) {
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_CMU_OAUTH_URL}`, req.url));
  }

  // Verify the token
  const response = await verifyAuth(token);
  if (!response.ok) {
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_CMU_OAUTH_URL}`, req.url));
  }
  
}





export const verifyAuth = async (token: string) => {
  try {
    const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`);
    if (!decoded) {
      throw new Error("Invalid token");
    }
    
    return Response.json({ ok: true, message: "Valid token" });
  } catch (error) {
    return Response.json({ ok: false, message: "Invalid token" });
  }
};

// See "Matching Paths" below to learn more
export const config = {
  matcher : [
    "/dashboard/:path*",
    "/register/:path*",
    "/about/:path*",
    "/appointment/:path*",
    "/profile/:path*",
    "/Infomation/:path*",
    "/List/:path*"
    // Add more paths as needed
  ],
};