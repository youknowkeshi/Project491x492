import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../lib/db"


// get in id
export async function GET(request:NextRequest ,context: {params:{id:string}}) {

    const id = context.params.id
    if(!id){
        return new Error('Failed to get id')
    }
    
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT users.personid ,users.firstname_lastname , users.studentid ,users.phone , users.major  , users.gender , users.topic , users.facebookurl ,informationusers.details_consultation ,informationusers.mental_health_checklist ,conseling_room1.start_datetime,conseling_room1.end_datetime,conseling_room1.expire_date ,conseling_room1.room FROM users INNER JOIN informationusers ON users.personid = informationusers.personid INNER JOIN conseling_room1  ON users.personid = conseling_room1.personid WHERE users.personid = $1', [id]);
        client.release(); // คืน client กลับไปให้ pool
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');
    }

}