import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../lib/db"


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