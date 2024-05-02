import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"


export async function POST(request: NextRequest) {
    try {

        const req = await request.json()
        const { name, email } = req
        // const text = 'INSERT INTO demo(name, email) VALUES($1, $2) RETURNING *'
        // const values = [name, email]
        // const client = await pool.connect();
        // const res = await client.query(text, values)

        return Response.json({ req })
    } catch (error) {
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');

    }
}