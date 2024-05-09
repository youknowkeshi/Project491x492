import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"
import moment from 'moment-timezone';


function timezone() {
    const zuluTime = '2024-06-14T17:00:00.000Z'; 
    const thailandTime = moment.utc(zuluTime).tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
    console.log(thailandTime); // แสดงเวลาในรูปแบบท้องถิ่นในประเทศไทย
}

//ดึงข้อมูล users, room1
export async function GET(res: NextResponse, req: NextRequest) {
    try {
        const client = await pool.connect();
        const result = await client.query
            ('select u.firstname_lastname ,u.phone ,u.studentid ,c.start_datetime ,c.end_datetime ,c.expire_date ,c.room  from users u INNER JOIN conseling_room1 c ON u.personid = c.personid')

        client.release(); // Release the client back to the pool 
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');
    }

}