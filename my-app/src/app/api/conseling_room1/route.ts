import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"

// update data room1
export async function PUT(request: NextRequest) {
    try {
        const req = await request.json();

        const { start_datetime, end_datetime, expire_date, event_id } = req;
        const room = 'conseling_room1'

        const text = 'UPDATE conseling_room1 SET start_datetime =$1, end_datetime= $2, expire_date= $3, room= $4 WHERE event_id = $5';
        const values = [start_datetime, end_datetime, expire_date, room, event_id];



        const client = await pool.connect();
        try {
            const res = await client.query(text, values);

            if (res.rowCount === 0) {
                return new NextResponse('User not found', { status: 404 });
            }

            return NextResponse.json({ res });
        } finally {
            client.release();
        }

    } catch (error) {
        console.log("put conseling error : ", error);

    }
}

export async function DELETE(request: NextRequest) {
    try {
        // รับข้อมูล JSON จาก request
        const req = await request.json();
        const { event_id } = req; // สมมติว่ามี id ในข้อมูลที่ต้องการลบ

        // ตรวจสอบว่ามีข้อมูล id หรือไม่
        if (!event_id) {
            return new Response('Missing required field: event_id', { status: 400 });
        }

        // สร้างคำสั่ง SQL และค่าที่จะใส่ลงไป
        const text = 'DELETE FROM demo WHERE event_id = $1';
        const values = [event_id];

        // เชื่อมต่อกับฐานข้อมูลและทำการ query สำหรับการลบข้อมูล
        const client = await pool.connect();
        const res = await client.query(text, values);

        // ตรวจสอบว่ามีข้อมูลถูกลบหรือไม่
        if (res.rowCount === 0) {
            return new NextResponse('User not found', { status: 404 });
        }

        // ส่งข้อความยืนยันการลบกลับไปใน response
        return new NextResponse('appointment deleted successfully');
    } catch (error) {
        console.error('Error executing query:', error);
        return new NextResponse('Failed to delete user', { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const req = await request.json()
        const { start_datetime, end_datetime, expire_date, personid } = req;
        const room = 'conseling_room1'

        const text = 'INSERT INTO conseling_room1(start_datetime, end_datetime, expire_date, room, personid) VALUES($1, $2, $3, $4, $5) RETURNING *';
        const values = [start_datetime, end_datetime, expire_date, room, personid];

        const client = await pool.connect();
        try {
            const res = await client.query(text, values);

            if (res.rowCount === 0) {
                return new NextResponse('User not found', { status: 404 });
            }

            return NextResponse.json({ res });
        } finally {
            client.release();
        }

    } catch (error) {
        console.log("Can't Post");

    }
}