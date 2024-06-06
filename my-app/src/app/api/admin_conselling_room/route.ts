import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"

export async function POST(request: NextRequest) {
    try {
        const req = await request.json();

        const { start_datetime, end_datetime} = req;
        const room = 'conseling_room1'
        const role = 'admin'

        const text = 'INSERT INTO conseling_room1(start_datetime, end_datetime, expire_date, room, role) VALUES($1, $2, $3, $4) RETURNING *';
        const values = [start_datetime, end_datetime, room, role];

        const client = await pool.connect();
        try {
            const res = await client.query(text, values);

            if (res.rowCount === 0) {
                return new NextResponse('User not found', { status: 404 });
            }

            return NextResponse.json({ res });
        } finally {
            client.release();
        }

    } catch (error) {
        console.log("put conseling error : ", error);

    }
}