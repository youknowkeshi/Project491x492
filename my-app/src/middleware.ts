import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";




// This function can be marked async if using await inside
export default async function middleware(req: NextRequest) {
  const token = req.cookies.get("cmu-oauth-example-token")?.value;
  const token_google = req.cookies.get("google-oauth-example-token")?.value;
  const url = req.url;


  if (!token && !token_google && url.includes("/dashboard")) {
    return NextResponse.redirect(new URL(`${process.env.NEXT_PUBLIC_CMU_OAUTH_URL}`, req.url));
  }

  // Verify the token
  let response, response_google

  if (token) {
    response = await verifyAuth(token);
  }

  if (token_google) {
    response_google = await verifyAuthGoogle(token_google);
  }


  if ((response && !response.ok) && (response_google && !response_google.ok)) {
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

export const verifyAuthGoogle = async (token: string) => {
  try {
    const decoded = jwt.verify(token, `${process.env.NEXT_PUBLIC_JWT_SECRET_GOOGLE}`);
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
  matcher: [
    "/article/:path*",
    "/about/:path*",
    "/appointment/:path*",
    "/appointmentadmin/:path*",
    // "/accessCode/:path*",
    "/dashboard/:path*",
    "/EditInformation/:path*",
    "/Evaluationform/:path*",
    "/Infomation/:path*",
    "/List/:path*",
    "/profile/:path*",
    "/register/:path*",
    "/report/:path*",
    "/reportchecklist/:path*",
    "/reportevaluation/:path*",
    "/reportgradelevel/:path*",
    "/UserInfomation/:path*",
    // Add more paths as needed

  ],
};