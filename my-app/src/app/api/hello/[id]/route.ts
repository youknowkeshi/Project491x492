import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../lib/db"

export async function GET(request:NextRequest ,context: any) {


    const {params} = context

    const id = params.id

    console.log(params.id);
    
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM demo WHERE personid = $1', [id]);
        client.release(); // คืน client กลับไปให้ pool
        console.log(result.rows[0]);
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');
    }

}