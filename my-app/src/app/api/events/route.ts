import { google } from "googleapis";
import { NextRequest, NextResponse } from 'next/server';
import { oauth2Client } from "../logingoogle/route";
import { pool } from "../../lib/db";
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../../../../types/JWTPayload";

type SuccessResponse = {
  ok: true;
  cmuAccount: string;
  firstName: string;
  lastName: string;
  studentId?: string;
  itaccounttype_id: string;
  itaccounttype_EN: string;
  organization_code: string;
  organization_name_EN: string;
};

type ErrorResponse = {
  ok: false;
  message: string;
};

export type WhoAmIResponse = SuccessResponse | ErrorResponse;

interface DateParts {
  date: string;
  time: string;
}


export async function GET() {
  const client = await pool.connect();
  try{
    const result = await client.query('SELECT * FROM admin_conseling_room1')
    return NextResponse.json({result})
  }catch(error){
    console.log("This is : ",error);
    return new NextResponse('Error code',{status:404})
  }
}

export async function POST(req: NextRequest, res: NextResponse<WhoAmIResponse>) {
  const token = getCookie("cmu-oauth-example-token", { req, res });

  if (typeof token !== "string") {
    return NextResponse.json({ ok: false, message: "Invalid token" });
  }

  const client = await pool.connect();
  try {
    const result = await client.query('SELECT access_token, refresh_token, scope, token_type, expiry_date FROM oauth_tokens');
    const tokens = result.rows[0];

    if (!tokens) {
      return new NextResponse('No found tokens!', { status: 404 });
    }

    oauth2Client.setCredentials(tokens);

    // const requestBody = await req.json();
    const calendarId = "nithikon1404@gmail.com"; // assuming req contains a calendarId property

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
    const cmuAccount = decoded.cmuAccount;
    const room = "conseling_room1";

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

    // List events from the specified calendar
    const response = await calendar.events.list({
      calendarId: calendarId,
      timeMin: (new Date()).toISOString(),
      maxResults: 15,
      singleEvents: true,
      orderBy: 'startTime'
    });

    // Check if response data and items are defined
    if (!response.data || !response.data.items) {
      console.error('No events found in the response', response);
      return new NextResponse('No events found!', { status: 404 });
    }

    const searchAdmin = await client.query('SELECT * FROM admins WHERE cmuAccount = $1', [cmuAccount]);
    const personIdAdmin = searchAdmin.rows[0].personid;

    const events = response.data.items;

    const freeTimeSlots: string[] = [
      "09:00 - 10:00",
      "10:00 - 11:00",
      "11:00 - 12:00",
      "13:00 - 14:00",
      "14:00 - 15:00",
      "15:00 - 16:00",
    ];
    
    // สร้าง object เปล่าๆ เพื่อเก็บข้อมูลของแต่ละวัน
    const slotsByDay: { [key: string]: string[] } = {};
    
    // วนลูปผ่าน events เพื่อจัดเก็บช่วงเวลาที่มีการจองในแต่ละวัน
    events.forEach((event) => {
      const startDateTime = event.start?.dateTime;
      const endDateTime = event.end?.dateTime;
    
      if (startDateTime && endDateTime) {
        const date = startDateTime.substring(0, 10); // ดึงเฉพาะส่วนของวันที่ออกมา (YYYY-MM-DD)
        const start = startDateTime.substring(11, 16);
        const end = endDateTime.substring(11, 16);
    
        // ถ้ายังไม่มี key ของวันที่นั้นใน object slotsByDay ให้สร้าง key และกำหนดค่าเป็น []
        if (!slotsByDay[date]) {
          slotsByDay[date] = [];
        }
    
        // เพิ่มช่วงเวลาที่มีการจองลงใน array ของวันนั้น
        slotsByDay[date].push(start + " - " + end);
      }
    });

    
    // วนลูปผ่าน freeTimeSlots เพื่อหาช่วงเวลาที่ว่างในแต่ละวัน
    const availableSlotsByDay: { [key: string]: string[] } = {};
    for (const date in slotsByDay) {
      availableSlotsByDay[date] = freeTimeSlots.filter((slot) => {
        for (const occupiedSlot of slotsByDay[date]) {
          const [occupiedStart, occupiedEnd] = occupiedSlot.split(" - ");
          const [slotStart, slotEnd] = slot.split(" - ");
          if (!(occupiedEnd <= slotStart || occupiedStart >= slotEnd)) {
            return false;
          }
        }
        return true;
      });
    }
    

    

    // Insert each event individually
    for (const event of events) {
      const startDateTime = event.start?.dateTime;
      const endDateTime = event.end?.dateTime;
      const eventId = event.id;
      
      if (startDateTime && endDateTime && eventId) {
        // Check if the event already exists in the database
        const checkExisting = await client.query('SELECT event_id FROM admin_conseling_room1 WHERE event_id = $1', [eventId]);

        if (checkExisting.rowCount === 0) {
          // Insert the event if it does not exist
          const text = 'INSERT INTO admin_conseling_room1(event_id, start_datetime, end_datetime, room, personid) VALUES($1, $2, $3, $4, $5) RETURNING *';
          const values = [eventId, startDateTime, endDateTime, room, personIdAdmin];

          await client.query(text, values);
        }
      }


      const queryCalendar = await client.query('SELECT event_id FROM admin_conseling_room1');
      const checkCalendar = queryCalendar.rows.map(row => row.event_id);
      
      for (const eventId of checkCalendar) {
        if (!events.some(event => event.id === eventId)) {
          // EventId exists in the database but not in the current events from Google Calendar
          console.log("this is eventId",eventId);
          
          try {
            await client.query('DELETE FROM admin_conseling_room1 WHERE event_id = $1', [eventId]);
          } catch (deleteError) {
            console.error("Error deleting event from the database:", deleteError);
          }
        }
      }
      
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error("Can't fetch events", error);
    return new NextResponse('Error', { status: 500 });
  } finally {
    client.release();
  }
}


//check time 
export async function DELETE() {
  try {
    const client = await pool.connect();
    try {
      const res = await client.query(`DELETE FROM admin_conseling_room1 WHERE CAST(end_datetime AS TIMESTAMP) < NOW()`);

      return new NextResponse('Delete Success', { status: 200 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.log("can't delete", error);
  }
}
