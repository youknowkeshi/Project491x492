import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db";



// input must have date and this is data of  user each major
export async function PUT(req: NextRequest) {
    try {
        const request = await req.json();
        const { startdate, enddate } = request;

        if (!startdate && !enddate) {
            return NextResponse.json({ message: "Please provide a date" }, { status: 400 });
        }

        const text = `SELECT u.major, COUNT(*) AS major_count
                      FROM users u 
                      WHERE u.timestamp_column BETWEEN TO_DATE( $1, 'YYYY-MM-DD') AND TO_DATE( $2, 'YYYY-MM-DD')
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
