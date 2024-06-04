import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"



//ดึงข้อมูล users, room1, infor
export async function GET(res: NextResponse, req: NextRequest) {
    try {
        const client = await pool.connect();
        const result = await client.query
        ('select u.personid ,u.firstname_lastname , u.studentid ,u.phone , u.major  , u.gender , u.topic , u.facebookurl ,i.details_consultation ,i.mental_health_checklist ,uc.start_datetime, uc.end_datetime ,uc.room from users u inner join informationusers i on u.personid = i.personid inner join user_conseling_room1 uc on u.personid = uc.personid ');
        client.release(); // Release the client back to the pool 
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');
    }

}


// edit  detail and checklist
export async function PUT( request: NextResponse) {
    try{
        const req = await request.json();
        
        const { details , health , infor_id} = req;

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
        console.log("put information error : ",error);
        
    }
}
