import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../lib/db"



export async function PUT(request: NextRequest) {
    try {
        // รับข้อมูล JSON จาก request
        const req = await request.json();     
        const { accesscode } = req; // สมมติว่ามี id ในข้อมูลที่ต้องการลบ     
    
        // ตรวจสอบว่ามีข้อมูล id หรือไม่
        if (!accesscode) {
            return new Response('Missing required field: accesscode', { status: 400 });
        }
    
        // สร้างคำสั่ง SQL และค่าที่จะใส่ลงไป
        const text = 'DELETE FROM accesscode WHERE accesscode = $1';
        const values = [accesscode];
    
        // เชื่อมต่อกับฐานข้อมูลและทำการ query สำหรับการลบข้อมูล
        const client = await pool.connect();
        const res = await client.query(text, values);
        client.release();
    
        // ตรวจสอบว่ามีข้อมูลถูกลบหรือไม่
        if (res.rowCount === 0) {
            return new Response('accesscode not found', { status: 404 });
        }
    
        // ส่งข้อความยืนยันการลบกลับไปใน response
        return new Response('accesscode deleted successfully');
    } catch (error) {
        console.error('Error executing query:', error);
        return new Response('Failed to delete user', { status: 500 });
    }

}


