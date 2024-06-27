import { google } from "googleapis";
import { NextRequest, NextResponse } from 'next/server';
import { oauth2Client } from "../logingoogle/route";
import { pool } from "../../lib/db";

export async function POST(req: NextRequest) {
    try {
        const requestBody = await req.json();

        const { description, startDateTime, endDateTime } = requestBody;

        if (!description || !startDateTime || !endDateTime) {
            return new NextResponse('Missing required event details!', { status: 400 });
        }

        const event = {
            'summary': 'นัดพูดคุย',
            'location': 'conseling_room1',
            'description': description,
            'start': {
                'dateTime': startDateTime,
                'timeZone': 'Asia/Bangkok',
            },
            'end': {
                'dateTime': endDateTime,
                'timeZone': 'Asia/Bangkok',
            },
            'attendees': [],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    { 'method': 'email', 'minutes': 24 * 60 },
                    { 'method': 'popup', 'minutes': 10 },
                ],
            },
        };

        const client = await pool.connect();
        try {
            const result = await client.query('SELECT access_token, refresh_token, scope, token_type, expiry_date FROM oauth_tokens');
            const tokens = result.rows[0];

            if (!tokens) {
                return new NextResponse('No found tokens!', { status: 404 });
            }

            oauth2Client.setCredentials(tokens);

            const calendarId = "nithikon1404@gmail.com"; // assuming req contains a calendarId property

            const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

            calendar.events.insert({
                calendarId: calendarId,
                requestBody: event,
            }, (err: Error | null, event: any) => {
                if (err) {
                    console.log('There was an error contacting the Calendar service: ' + err);
                    return;
                }
                console.log('Event created: %s', event.data);
                return new NextResponse(JSON.stringify({ message: "Event successfully created!" }), { status: 200 });
            });

        } catch (error) {
            console.error("Can't insert events", error);
            return new NextResponse('Error', { status: 500 });
        } finally {
            client.release();
        }
    } catch (error) {
        console.error('Error parsing request', error);
        return new NextResponse('Invalid request body!', { status: 400 });
    }
}
