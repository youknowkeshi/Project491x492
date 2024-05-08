import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../../../../types/JWTPayload"
import { ok } from "assert";

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



// export async function POST(request: NextRequest) {
//   try {

//     const req = await request.json()
//     const { name, email } = req
//     const text = 'INSERT INTO demo(name, email) VALUES($1, $2) RETURNING *'
//     const values = [name, email]
//     const client = await pool.connect();
//     const res = await client.query(text, values)

//     return Response.json({ req })
//   } catch (error) {
//     console.error('Error executing query:', error);
//     return new Error('Failed to fetch users');

//   }
// }

// update data register in table users 
export async function PUT(req: NextRequest, res: NextResponse<WhoAmIResponse>) {
  const token = getCookie("cmu-oauth-example-token", { req, res });

  if (typeof token !== "string")
    return NextResponse.json({ ok: false, message: "Invalid token" });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JWTPayload;

    const request = await req.json();
    const { personid, phone, major, gender, topic, facebookurl } = request;
    const studentId = decoded.studentId;



    if (!personid || !phone || !major || !gender || !topic || !facebookurl) {
      return new Response('Missing required fields', { status: 400 });
    }



    if (!studentId) {
      return new Response('Missing studentId', { status: 400 });
    }


    const text = 'UPDATE users SET personid =$1, phone = $3, major = $4, gender = $5, topic = $6, facebookurl = $7 WHERE studentId = $2';
    const values = [personid, studentId, phone, major, gender, topic, facebookurl];

    const text_infor = 'INSERT INTO informationusers (personid) VALUES ($1) RETURNING *';
    const values_infor = [personid]

    const text_con = 'INSERT INTO conseling_room1 (personid) VALUES ($1) RETURNING *'
    const values_con = [personid]

   
    
    

    


    // เชื่อมต่อกับฐานข้อมูลและทำการ query สำหรับการอัปเดตข้อมูล
    const client = await pool.connect();    
    try {
      const res = await client.query(text, values);

      const res_infor = await client.query(text_infor,values_infor)

      const res_con = await client.query(text_con,values_con)

     
      


      // ตรวจสอบว่ามีข้อมูลถูกอัปเดตหรือไม่
      if (res.rowCount === 0) {
        return new Response('User not found', { status: 404 });
      }

      if(res_infor.rowCount === 0){
        return new Response('information not found', { status: 404 });
      }

      if(res_con.rowCount === 0){
        return new Response('conselling not found', { status: 404 });
      }

      // ส่งข้อความยืนยันการอัปเดตกลับไปใน response
      return new Response('User updated successfully', { status: 200 });
    } finally {
      client.release();
    }

  } catch (error) {
    return NextResponse.json({ ok: false, message: "Invalid token" });
  }
}