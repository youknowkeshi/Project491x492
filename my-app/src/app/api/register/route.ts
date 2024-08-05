import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../../../../types/JWTPayload"
import { ok } from "assert";
import moment from 'moment-timezone';

type SuccessResponse = {
  ok: true;
  cmuAccount: string;
  firstName: string;
  lastName: string;
  studentId?: string;
  itaccounttype_id: string;
  itaccounttype_EN: string;
  organization_code: string;
  organization_name_EN: string;
};

type ErrorResponse = {
  ok: false;
  message: string;
};

export type WhoAmIResponse = SuccessResponse | ErrorResponse;



// get token for check
export async function GET(req: NextRequest,
  res: NextResponse<WhoAmIResponse>) {

  const token = getCookie("cmu-oauth-example-token", { req, res });

  if (typeof token !== "string")
    return NextResponse.json({ ok: false, message: "Invalid token" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;



    return NextResponse.json({
      ok: true,
      cmuAccount: decoded.cmuAccount,
      firstName: decoded.firstName,
      lastName: decoded.lastName,
      studentId: decoded.studentId,
      itaccounttype_id: decoded.itaccounttype_id,
      itaccounttype_EN: decoded.itaccounttype_EN,
      organization_code: decoded.organization_code,
      organization_name_EN: decoded.organization_name_EN,

    });

  } catch (error) {
    return NextResponse.json({ ok: false, message: "Invalid token" });
  }
}


// check data in database that have
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const { studentId } = req;

    const text = 'SELECT * FROM users WHERE studentid = $1';
    const values = [studentId];
    const client = await pool.connect();

    try {
      const res = await client.query(text, values);
      return NextResponse.json( res.rows ); // Access rows from the result
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (error) {
    console.error('Error executing query:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}

// update data register in table users 
export async function PUT(req: NextRequest, res: NextResponse<WhoAmIResponse>) {
  const token = getCookie("cmu-oauth-example-token", { req, res });

  if (typeof token !== "string") {
    return NextResponse.json({ ok: false, message: "Invalid token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;

    const request = await req.json();
    const { personid, phone, major, gender, facebookurl ,gradelevel} = request;
    const studentId = decoded.studentId;
    const role = "users";
    const date = moment().tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ssZ");

    if (!personid || !phone || !major || !gender || !facebookurl || !gradelevel) {
      return new Response('Missing required fields', { status: 400 });
    }

    if (!studentId) {
      return new Response('Missing studentId', { status: 400 });
    }

    const text = `UPDATE users SET personid =$1, phone = $3, major = $4, gender = $5, facebookurl = $6 , role = $7 
    , gradelevel = $8 ,timestamp_column = $9 WHERE studentId = $2;`;
    const values = [personid, studentId, phone, major, gender, facebookurl, role, gradelevel, date];

    const client = await pool.connect();

    try {
      const res = await client.query(text, values);

      if (res.rowCount === 0) {
        console.log("User not found");
        return new Response('User not found', { status: 404 });
      }

      return new Response('User updated successfully', { status: 200 });
    } finally {
      client.release();
    }

  } catch (error) {
    console.error("Error: ", error);
    return NextResponse.json({ ok: false, message: "Invalid token" });
  }
}
