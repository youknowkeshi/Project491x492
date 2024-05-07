import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../lib/db"
import { log } from "console";


export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { accesscode } = req;


        const text = 'INSERT INTO accesscode (accesscode) VALUES($1) RETURNING *';
        const values = [accesscode];

        const client = await pool.connect();
        const res = await client.query(text, values);

        return Response.json({ res });
    } catch (error) {
        console.log("access code : ", error);

    }
}


export async function DELETE(response: NextResponse) {
    try {
        const client = await pool.connect();
        try {
            const res = await client.query(`DELETE FROM accesscode WHERE expire_datetime < NOW() - INTERVAL '1 minute';`);
            console.log(res.rowCount + ' rows deleted.');

            return Response.json({ res })
        } finally {
            client.release();
        }
    } catch (error) {
        console.log("can't delete", error);

    }

}