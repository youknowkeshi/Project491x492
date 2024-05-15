import { google } from "googleapis";
import  { NextRequest, NextResponse } from 'next/server';
import {oauth2Client} from "../logingoogle/route"

export async function POST(request: NextRequest) {
    try {
      const req = await request.json();
      const calendarId = req.calendar; // assuming req contains a calendarId property
      
  
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
  
      // Send the list of events as JSON
      const events = response.data.items;
      return NextResponse.json(events);
    } catch (error) {
      console.error("Can't fetch events", error);
      return new NextResponse('Error', { status: 500 });
    }
  }