import { google } from "googleapis";
import { NextRequest,NextResponse } from "next/server";



export const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
    process.env.REDIRECT_URL
  );


  // generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
    'https://www.googleapis.com/auth/calendar.readonly'
  ];


  export function GET(req:NextRequest,res:NextResponse){
    const url = oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',
        // If you only need one scope you can pass it as a string
        scope: scopes
      }); 
      return NextResponse.redirect(url)
  }
  
