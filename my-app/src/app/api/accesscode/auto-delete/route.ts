import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../lib/db"


// insert access code
export async function POST(request: NextRequest) {
    try {
        const req = await request.json();
        const { accesscode } = req;


        const text = 'INSERT INTO accesscode (accesscode) VALUES($1) RETURNING *';
        const values = [accesscode];

        const client = await pool.connect();
        const res = await client.query(text, values);

        return NextResponse.json({ res });
    } catch (error) {
        console.log("access code : ", error);

    }
}


// check access code
export async function PUT(request: NextRequest) {
    try {
        const req = await request.json();
        const { accesscode } = req;

        if (!accesscode) {
            return NextResponse.json({ error: 'Access code is required' }, { status: 400 });
        }

        const text = 'SELECT * FROM accesscode WHERE accesscode = $1';
        const values = [accesscode];

        const client = await pool.connect();
        const res = await client.query(text, values);
        client.release(); // อย่าลืม release connection หลังจากใช้งานเสร็จ

        return NextResponse.json({ res: res.rows });
    } catch (error) {
        console.log('Error accessing code:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// delete code auto
export async function DELETE(response: NextResponse) {
    try {
        const client = await pool.connect();
        try {
            const res = await client.query(`DELETE FROM accesscode WHERE expire_datetime < NOW() - INTERVAL '50 minute';`);
            return NextResponse.json({ res })
        } finally {
            client.release();
        }
    } catch (error) {
        console.log("can't delete", error);
    }

}