import { google } from "googleapis";
import  { NextRequest, NextResponse } from 'next/server';
import {oauth2Client} from "../logingoogle/route"


export async function POST(request:NextRequest ) {
    try{
        const req = await request.json();
        const code = req.code
        console.log("this is my code : ",code);
        
        
        oauth2Client.getToken(code, (err, tokens) => {
            if (err) {
              // Handle error if token exchange fails
              console.error('Couldn\'t get token', err);
              return new NextResponse('Error');
            }
            
            if (tokens) {
                oauth2Client.setCredentials(tokens);
            } else {
                console.error('Tokens are null or undefined');
                return new NextResponse('Error');
            }
        }); 
       
        return new NextResponse('Successfully logged in');

    }catch(err){
        console.log("This is : ",err);
        return new NextResponse('Failed');
    }
}

export async function GET(request:NextRequest) {

    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    // List all calendars
    try {
      // List all calendars
      const response = await calendar.calendarList.list({});
      
      if (!response || !response.data || !response.data.items) {
        // Handle case where response or necessary properties are undefined
        console.error('No calendars found in the response', response);
        return new NextResponse('No calendars found!');
      }
  
      // Send the list of calendars as JSON
      const calendars = response.data.items;
      return NextResponse.json(calendars);
  
    } catch (err) {
      // Handle error if the API request fails
      console.error('Error fetching calendars', err);
      return new NextResponse('Error!');
    }
  }

