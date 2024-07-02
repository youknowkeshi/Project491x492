import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"
import { log } from "console";

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();

        const { start_datetime, end_datetime} = req;
        const room = 'conseling_room1'
        const role = 'admin'

        const text = 'INSERT INTO conseling_room1(start_datetime, end_datetime, expire_date, room, role) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [start_datetime, end_datetime, room, role];

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


//get calendarevents
export async function PUT(req: NextRequest) {
    try {
      const requestBody = await req.json();
      const { start_datetime ,end_datetime } = requestBody;
  
      const client = await pool.connect();
  
      const query = `
        SELECT acr.event_id 
        FROM admin_conseling_room1 acr 
        WHERE start_datetime = $1 AND  end_datetime = $2
      `;
      const values = [start_datetime ,end_datetime];
      console.log("This is Timeslots",values);
      
  
      const result = await client.query(query, values);
  
      client.release();
  
      console.log("show data of bug : ",result.rows);
      
      return NextResponse.json(result.rows);
    } catch (error) {
      console.error('Error executing query:', error);
      return NextResponse.json({ error: 'Failed to fetch event ID' }, { status: 500 });
    }
  }