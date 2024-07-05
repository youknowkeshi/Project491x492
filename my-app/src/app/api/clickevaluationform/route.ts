import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db";

export async function POST(req: NextRequest) {
    try {
        const request = await req.json();
        const { topic } = request;


        const date = new Date().toISOString();  
        const click = '1';
        console.log(date);
        
        if (!topic) {
            return NextResponse.json({ message: "topic is not found" });
        }

        const text = 'INSERT INTO clicksevaluationform (Topic, Click, Datestimestamp) VALUES ($1, $2, $3) RETURNING *';
        const values = [topic, click, date];

        const client = await pool.connect();
        try {
            const res = await client.query(text, values);

            if (res.rowCount === 0) {
                return new NextResponse('clicksevaluationform not found', { status: 404 });
            }

            return NextResponse.json({ res });
        } finally {
            client.release();
        }
    } catch (error) {
        console.log(error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
