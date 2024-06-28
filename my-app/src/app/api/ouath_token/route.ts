import { google } from "googleapis";
import { NextRequest, NextResponse } from 'next/server';
import { oauth2Client } from "../logingoogle/route"
import { pool } from "../../lib/db";

export async function POST(request: NextRequest) {
    const client = await pool.connect();
    const result = await client.query('SELECT access_token, refresh_token, scope, token_type, expiry_date FROM oauth_tokens');
    const tokens = result.rows[0];

    if (!tokens) {
        return new NextResponse('No found tokens!', { status: 404 });
    }

    oauth2Client.setCredentials(tokens);

    try {
        const req = await request.json();
        //events will have title location(default) description start(Time) end(Time) reminders -> true
        const { calendarId, event } = req;

        if (!calendarId) {
            return new NextResponse('Calendar ID is missing!', { status: 400 });
        }

        if (!event) {
            return new NextResponse('Event data is missing!', { status: 400 });
        }

        const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

        const response = await calendar.events.insert({
            calendarId: calendarId,
            requestBody: event
        });

        return new NextResponse(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        console.error("This is an error:", error);
        return new NextResponse('Internal Server Error', { status: 500 });
    } finally {
        client.release();
    }
}
