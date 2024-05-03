import { NextResponse ,NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import axios from "axios";


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


  // const respone = await axios.get('http://localhost:3000/api/checkdata')
  // const condition = respone.data.temp.studentid || null

  

  // if(!condition){
  //   return NextResponse.redirect(new URL(`/register`, req.url));
  // }
}

// export const checkpath = async () => {

// }



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
  matcher: "/me/:path*",
  // matcher:`${process.env.redirect_uri}`,
};