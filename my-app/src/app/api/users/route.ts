import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import verifyAuth from "../../../middleware"
import uniqueString from 'unique-string';
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

//ดึงข้อมูล users
export async function GET(res: NextResponse, req: NextRequest) {

    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users');
        client.release(); // Release the client back to the pool 
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');
    }

}


//add user into table
export async function POST(req: NextRequest, res: NextResponse<WhoAmIResponse>) {
    const token = getCookie("cmu-oauth-example-token", { req, res });

    if (typeof token !== "string")
        return NextResponse.json({ ok: false, message: "Invalid token" });

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JWTPayload;


        const studentId = decoded.studentId

        try {
            const request = await req.json();
            const { name, cmuaccount, studentid, organization_name, accounttype } = request;
            const personid = uniqueString()

            const text = 'INSERT INTO users(personid,firstname_lastname, cmuaccount, studentid, organization_name, accounttype) VALUES($1, $2, $3, $4, $5,$6) RETURNING *';
            const values = [personid, name, cmuaccount, studentid, organization_name, accounttype];


            const client = await pool.connect();

            const result = await client.query('SELECT studentid FROM users WHERE studentid = $1', [studentId]);
            try {
                if (result.rowCount === 0) {
                    const res = await client.query(text, values);

                    if (res.rowCount === 0) {
                        return new Response('User not found', { status: 404 });
                    }

                    return NextResponse.json({ res });
                    
                }
            } finally {
                client.release();
            }
            return new NextResponse("Welcome to home");
        } catch (error) {
            console.error('Error executing query:', error);
            return new Error('Failed to fetch users');
        }


    } catch (error) {
        return NextResponse.json({ ok: false, message: "Invalid token" });
    }

}


/*
export async function PUT(request: Request, context: any ) {

    try {
        // รับข้อมูล JSON จาก request
        const req = await request.json();
        const { personid, name, email } = req; // สมมติว่ามี id, name, email ในข้อมูล

        // ตรวจสอบว่ามีข้อมูล id, name, email หรือไม่
        if (!personid || !name || !email) {
            return new Response('Missing required fields', { status: 400 });
        }

        // สร้างคำสั่ง SQL และค่าที่จะใส่ลงไป
        const text = 'UPDATE demo SET name = $2, email = $3 WHERE personid = $1';
        const values = [personid, name, email];

        // เชื่อมต่อกับฐานข้อมูลและทำการ query สำหรับการอัปเดตข้อมูล
        const client = await pool.connect();
        const res = await client.query(text, values);

        // ตรวจสอบว่ามีข้อมูลถูกอัปเดตหรือไม่
        if (res.rowCount === 0) {
            return new Response('User not found', { status: 404 });
        }

        // ส่งข้อความยืนยันการอัปเดตกลับไปใน response
        return new Response('User updated successfully', { status: 200 });
    } catch (error) {
        console.error('Error executing query:', error);
        return new Response('Failed to update user', { status: 500 });
    }
}

*/


//delete data
export async function DELETE(request: Request, context: any) {
    try {
        // รับข้อมูล JSON จาก request
        const req = await request.json();
        const { personid } = req; // สมมติว่ามี id ในข้อมูลที่ต้องการลบ

        // ตรวจสอบว่ามีข้อมูล id หรือไม่
        if (!personid) {
            return new Response('Missing required field: id', { status: 400 });
        }

        // สร้างคำสั่ง SQL และค่าที่จะใส่ลงไป
        const text = 'DELETE FROM demo WHERE personid = $1';
        const values = [personid];

        // เชื่อมต่อกับฐานข้อมูลและทำการ query สำหรับการลบข้อมูล
        const client = await pool.connect();
        const res = await client.query(text, values);

        // ตรวจสอบว่ามีข้อมูลถูกลบหรือไม่
        if (res.rowCount === 0) {
            return new Response('User not found', { status: 404 });
        }

        // ส่งข้อความยืนยันการลบกลับไปใน response
        return new Response('User deleted successfully');
    } catch (error) {
        console.error('Error executing query:', error);
        return new Response('Failed to delete user', { status: 500 });
    }
}




// export async function POST(request: Request) {
//     const res = await request.json()
//     return Response.json({ res })
//   }

