import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../../../../types/JWTPayload"


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
  

  //ตรวจสอบข้อมูลว่าเคย register ไปยัง
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
  
      const studentId = decoded.studentId

      const client = await pool.connect();
      const result = await client.query('SELECT studentid  FROM users WHERE studentid = $1', [studentId]);
      client.release(); // Release the client back to the pool 
      const temp = result.rows[0]

      
      if(result.rows[0]){
        return NextResponse.json({ temp });
      }else{
        return NextResponse.json( null );
      }
    
      
      
  
    } catch (error) {
      return NextResponse.json({ ok: false, message: "Invalid token" });
    }
  }
// export async function GET(res: NextResponse, req: NextRequest) {

//     const token = getCookie("cmu-oauth-example-token", { req, res });

//     if (typeof token !== "string")
//       return NextResponse.json({ ok: false, message: "Invalid token" });
  
//     try {
//       const decoded = jwt.verify(
//         token,
//         process.env.JWT_SECRET as string
//       ) as JWTPayload;
  
//       const studentId = decoded.studentId;
  

//       console.log(studentId);
      
  
//       if (!studentId) {
//         return new Response('Missing studentId', { status: 400 });
//       }
  
  
//     } catch (error) {
//       return NextResponse.json({ ok: false, message: "Invalid token" });
//     }
      

//     // const studentId = "630612102"

//     // try {
//     //     const client = await pool.connect();
//     //     const result = await client.query('SELECT studentid  FROM users WHERE studentid = $1', [studentId]);
//     //     client.release(); // Release the client back to the pool 
//     //     return NextResponse.json(result.rows);
//     // } catch (error) {
//     //     console.error('Error executing query:', error);
//     //     return new Error('Failed to fetch users');
//     // }

// }