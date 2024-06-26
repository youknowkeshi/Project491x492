import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"
import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import { JWTPayload } from "../../../../types/JWTPayload"

type SuccessResponse = {
    ok: true;
    cmuAccount: string;
    firstName: string;
    lastName: string;
    studentId?: string;
    itaccounttype_id: string;
    itaccounttype_EN: string;
    organization_code: string;
    organization_name_EN: string;
};

type ErrorResponse = {
    ok: false;
    message: string;
};

export type WhoAmIResponse = SuccessResponse | ErrorResponse;

//ดึงข้อมูล users, room1

export async function PUT(req: NextRequest) {
    try {
        const requestBody = await req.json();
        const { studentid } = requestBody; // Correctly extract personId from the request body

        const client = await pool.connect();

        const query = `
            SELECT u.firstname_lastname, u.studentid, ucr.start_datetime, ucr.end_datetime, ucr.room ,ucr.event_id
            FROM users u
            INNER JOIN user_conseling_room1 ucr ON u.personid = ucr.personid
            WHERE u.studentid = $1;
        `;

        const result = await client.query(query, [studentid]);
        client.release(); // Release the client back to the pool

        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}


export async function POST(req: NextRequest, res: NextResponse<WhoAmIResponse>) {
    const token = getCookie("cmu-oauth-example-token", { req, res });

    if (typeof token !== "string") {
        return NextResponse.json({ ok: false, message: "Invalid token" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
        const request = await req.json();
        const { personid, room } = request;

        const text_con = 'INSERT INTO user_conseling_room1 (personid ,room ) VALUES ($1, $2) RETURNING *';
        const values_con = [personid, room];

        const client = await pool.connect();
        try {
            const res_con = await client.query(text_con, values_con);

            if (res_con.rowCount === 0) {
                console.log("Conselling not found");
                return new NextResponse('Conselling not found', { status: 404 });
            }

            return new NextResponse('User updated successfully', { status: 200 });
        } finally {
            client.release();
        }
    } catch (err) {
        console.log("request error", err);

    }
}