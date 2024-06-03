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

    const requestBody = await req.json();
    const calendarId = requestBody.calendar; // assuming req contains a calendarId property

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
    }

    return NextResponse.json(events);
  } catch (error) {
    console.error("Can't fetch events", error);
    return new NextResponse('Error', { status: 500 });
  } finally {
    client.release();
  }
}
