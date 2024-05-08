import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"



//ดึงข้อมูล users, room1, infor
export async function GET(res: NextResponse, req: NextRequest) {
    try {
        const client = await pool.connect();
        const result = await client.query
        ('SELECT users.personid ,users.firstname_lastname , users.studentid ,users.phone , users.major  , users.gender , users.topic , users.facebookurl ,informationusers.details_consultation ,informationusers.mental_health_checklist ,conseling_room1.start_datetime,conseling_room1.end_datetime,conseling_room1.expire_date ,conseling_room1.room FROM users INNER JOIN informationusers ON users.personid = informationusers.personid INNER JOIN conseling_room1  ON users.personid = conseling_room1.personid');
        client.release(); // Release the client back to the pool 
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');
    }

}


// edit  detail and checklist
export async function PUT(res: NextResponse, request: NextRequest) {
    try{
        const req = await request.json();
        const { details , health ,infor_id} = req;


        //'UPDATE users SET personid =$1, phone = $3, major = $4, gender = $5, topic = $6, facebookurl = $7 WHERE studentId = $2'
        const text = 'UPDATE informationusers SET details_consultation =$1, mental_health_checklist= $2 WHERE infor_id = $3';
        const values = [details , health, infor_id];

        const client = await pool.connect();
        try{
            const res = await client.query(text, values);

            if (res.rowCount === 0) {
                return new Response('User not found', { status: 404 });
            }

            return Response.json({ res });
        }finally {
        client.release();
    }
        
    }catch(error){
        console.log("post information error : ",error);
        
    }
}