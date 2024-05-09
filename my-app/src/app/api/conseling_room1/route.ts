import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"

// update data room1
export async function PUT(request:NextRequest) {
    try{
        const req = await request.json();
        
        const { start_datetime , end_datetime , expire_date ,event_id} = req;
        const room ='conseling_room1'

        const text = 'UPDATE conseling_room1 SET start_datetime =$1, end_datetime= $2, expire_date= $3, room= $4 WHERE event_id = $5';
        const values = [start_datetime , end_datetime , expire_date , room, event_id];

        

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
        console.log("put conseling error : ",error);
        
    }
}