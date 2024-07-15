import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"

export async function GET() {
    const client = await pool.connect();
    try{
        const result = await client.query(`select u.personid ,u.major , u.gradelevel ,ir.details_consultation,
            ir.mental_health_checklist,ucr.start_datetime,ucr.end_datetime from users u join user_conseling_room1 ucr 
            on u.personid = ucr.personid join informationusers_room1 ir on ucr.event_id = ir.event_id `);
        client.release(); // Release the client back to the pool 
        return NextResponse.json(result.rows);
    }catch(error){
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');
    }
}