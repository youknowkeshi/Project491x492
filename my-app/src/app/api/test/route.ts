import { NextRequest, NextResponse } from 'next/server';
import { pool } from "../../lib/db";
import {oauth2Client} from '../logingoogle/route'




export async function GET(res: NextResponse, req: NextRequest) {

    return NextResponse.json(oauth2Client);
    
    // try {
    //     const client = await pool.connect();
    //     const result = await client.query('SELECT access_token, refresh_token, scope, token_type, expiry_date FROM oauth_tokens');
    //     client.release(); // Release the client back to the pool 
    //     return NextResponse.json(result.rows);
    // } catch (error) {
    //     console.error('Error executing query:', error);
    //     return new Error('Failed to fetch users');
    // }

}