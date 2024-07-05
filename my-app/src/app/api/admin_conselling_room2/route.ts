import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"




//get calendarevents
export async function PUT(req: NextRequest) {
    try {
      const requestBody = await req.json();
      const { start_datetime ,end_datetime } = requestBody;
  
      const client = await pool.connect();
  
      const query = `
        SELECT acr.event_id 
        FROM admin_conseling_room2 acr 
        WHERE start_datetime = $1 AND  end_datetime = $2
      `;
      const values = [start_datetime ,end_datetime];

      const result = await client.query(query, values);
  
      client.release();
  
      console.log("show data of bug : ",result.rows);
      
      return NextResponse.json(result.rows);
    } catch (error) {
      console.error('Error executing query:', error);
      return NextResponse.json({ error: 'Failed to fetch event ID' }, { status: 500 });
    }
  }