import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../lib/db"
import { message } from "antd";


// get in id
export async function GET(request: NextRequest, context: { params: { id: string } }) {

    const id = context.params.id
    if (!id) {
        return new Error('Failed to get id')
    }

    try {
        const client = await pool.connect();
        const result = await client.query(`select u.personid ,u.firstname_lastname , u.studentid ,u.phone , u.major  , u.major ,u.gender , 
        ucr.topic , u.facebookurl ,ir.details_consultation ,ir.mental_health_checklist ,ir.mental_risk_level ,ucr.start_datetime, 
        ucr.end_datetime ,ucr.room from users u join user_conseling_room1 ucr on u.personid = ucr.personid 
        join informationusers_room1 ir on ucr.event_id = ir.event_id
        where ucr.event_id = $1`, [id]);

        client.release(); // คืน client กลับไปให้ pool
        return NextResponse.json(result.rows[0]);
    } catch (error) {
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');
    }

}

// edit  detail and checklist
export async function PUT(request: NextResponse, context: { params: { id: string } }) {
    
    try {
        const event_id = context.params.id
        if (!event_id) {
            return new Error('Failed to get id')
        }
        const req = await request.json();

        const { details_consultation, mental_health_checklist, mental_risk_level } = req;

        if(!details_consultation && !mental_health_checklist && !mental_risk_level && !event_id){
            return NextResponse.json({message:"request some data null"},{status:400})
        }

        const text = 'UPDATE informationusers_room1 SET details_consultation =$1, mental_health_checklist= $2,mental_risk_level= $3 WHERE infor_id = $4';
        const values = [details_consultation, mental_health_checklist, mental_risk_level,event_id];

        const client = await pool.connect();
        try {
            const res = await client.query(text, values);

            if (res.rowCount === 0) {
                return new Response('User not found', { status: 404 });
            }

            return Response.json({ res });
        } finally {
            client.release();
        }

    } catch (error) {
        console.log("put information error : ", error);

    }
}
