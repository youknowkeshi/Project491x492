import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"
import uniqueString from 'unique-string';


// update data room1
// expire_date งงๆอยู่ว่าต้องมีมั้ย
export async function PUT(request: NextRequest) {
    try {
        const req = await request.json();

        const { start_datetime, end_datetime, event_id } = req;
        const room = 'conseling_room1'

        const text = 'UPDATE conseling_room1 SET start_datetime =$1, end_datetime= $2, room= $3 WHERE event_id = $5';
        const values = [start_datetime, end_datetime, room, event_id];

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
        const text = 'DELETE FROM user_conseling_room1 WHERE event_id = $1';
        const values = [event_id];

        const text_infor = 'DELETE FROM informationusers_room1 WHERE event_id = $1';
        const values_infor = [event_id];
        

        // เชื่อมต่อกับฐานข้อมูลและทำการ query สำหรับการลบข้อมูล
        const client = await pool.connect();
        const res_infor = await client.query(text_infor, values_infor);
        const res = await client.query(text, values);
       
        // ตรวจสอบว่ามีข้อมูลถูกลบหรือไม่
        if (res.rowCount === 0) {
            return new NextResponse('User not found', { status: 404 });
        }

        if (res_infor.rowCount === 0) {
            return new NextResponse('infor not found', { status: 404 });
        }

        // ส่งข้อความยืนยันการลบกลับไปใน response
        return new NextResponse('appointment deleted successfully');
    } catch (error) {
        console.error('Error executing query:', error);
        return new NextResponse('Failed to delete user', { status: 500 });
    }
}


// add data into table conseling_room1
export async function POST(request: NextRequest) {
    try {
        const req = await request.json()
        const { start_datetime, end_datetime, personid ,topic} = req;
        const room = 'conseling_room1'
        const event_id = uniqueString()

        const text = 'INSERT INTO user_conseling_room1 (start_datetime, end_datetime, room, personid, topic,event_id) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
        const values = [start_datetime, end_datetime, room, personid, topic ,event_id];

        const text_infor = 'INSERT INTO informationusers_room1 (personid,event_id) VALUES($1, $2) RETURNING *';
        const values_infor = [personid,event_id]

        const client = await pool.connect();
        try {
            const res = await client.query(text, values);

            const res_infor = await client.query(text_infor,values_infor)

            if (res.rowCount === 0) {
                return new Error('User not found');
            }

            if (res_infor.rowCount === 0) {
                return new Error('User not found');
            }

            return NextResponse.json({ res });
        } finally {
            client.release();
        }

    } catch (error) {
        console.log("Can't Post",error);
        return NextResponse.json("Error Can't Add", { status: 404 });
    }
}