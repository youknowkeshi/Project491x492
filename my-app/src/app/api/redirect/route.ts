import { google } from "googleapis";
import { NextRequest, NextResponse } from 'next/server';
import { oauth2Client } from "../logingoogle/route";
import { pool } from "../../lib/db";

// Function to convert timestamp to Thai time
function convertTimestampToThaiTime(timestamp_ms: any): string {
  const date = new Date(timestamp_ms);
  const thaiTime = new Date(date.getTime() + 7 * 60 * 60 * 1000);
  const formattedThaiTime = thaiTime.toISOString().replace('T', ' ').substring(0, 19);
  return formattedThaiTime;
}


//not finish
export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const code = req.code;

    oauth2Client.getToken(code, async (err, tokens) => {
      if (err) {
        console.error('Couldn\'t get token', err);
        return new NextResponse('Error');
      }

      oauth2Client.on('tokens', (tokens) => {
        if (tokens.refresh_token) {
          console.log(tokens.refresh_token);
        }
        console.log(tokens.access_token);
      });

      if (tokens) {
        const { access_token, refresh_token, scope, token_type, expiry_date } = tokens;
        const text = 'INSERT INTO admins(personid,firstname_lastname, cmuaccount, studentid, organization_name, accounttype, role) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const expiry = convertTimestampToThaiTime(expiry_date);
        const values = [access_token, refresh_token, scope, token_type, expiry];

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
      } else {
        console.error('Tokens are null or undefined');
        return new NextResponse('Error');
      }
    });

    return NextResponse.json(oauth2Client);

  } catch (err) {
    console.error("Error:", err);
    return new NextResponse('Failed');
  }
}

export async function GET(request: NextRequest) {
  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  try {
    const response = await calendar.calendarList.list({});
    if (!response || !response.data || !response.data.items) {
      console.error('No calendars found in the response', response);
      return new NextResponse('No calendars found!');
    }

    const calendars = response.data.items;
    return NextResponse.json(calendars);

  } catch (err) {
    console.error('Error fetching calendars', err);
    return new NextResponse('Error!');
  }
}
