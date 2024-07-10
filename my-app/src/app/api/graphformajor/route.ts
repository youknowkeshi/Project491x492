import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db";



// input must have date and this is data of  appointment not for single-people
export async function PUT(req: NextRequest) {
    try {
        const request = await req.json();
        const { date } = request;

        if (!date) {
            return NextResponse.json({ message: "Please provide a date" }, { status: 400 });
        }

        const text = `
            SELECT u.major, COUNT(*) AS major_count
            FROM users u
            JOIN user_conseling_room1 ucr ON u.personid = ucr.personid
            JOIN informationusers_room1 ir ON ucr.event_id = ir.event_id
            WHERE ucr.start_datetime LIKE $1
            GROUP BY u.major;
        `;

        const client = await pool.connect();
        const result = await client.query(text, [`${date}%`]); // Using parameterized query for security
        client.release();

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');
    }
}
