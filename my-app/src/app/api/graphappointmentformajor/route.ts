import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db";



// input must have date and this is data of  appointment not for single-people each major
export async function PUT(req: NextRequest) {
    try {
        const request = await req.json();
        const { startdate, enddate } = request;


        if (!startdate && !enddate) {
            return NextResponse.json({ message: "Please provide a date" }, { status: 400 });
        }

        const text = `
            SELECT u.major, COUNT(*) AS major_count
            FROM users u
            JOIN user_conseling_room1 ucr ON u.personid = ucr.personid
            JOIN informationusers_room1 ir ON ucr.event_id = ir.event_id
            WHERE ucr.start_datetime BETWEEN $1 AND $2
            GROUP BY u.major;
        `;

        const values = [startdate, enddate]

        const client = await pool.connect();
        const result = await client.query(text, values); // Using parameterized query for security
        client.release();

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');
    }
}
