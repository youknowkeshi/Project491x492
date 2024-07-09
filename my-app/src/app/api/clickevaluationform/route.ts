import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db";
import moment from 'moment-timezone';
import { message } from "antd";

//for get count topic 
export async function PUT(req: NextRequest) {
    try {
        const request = await req.json();
        const { date, topic } = request;

        if (!date || !topic) {
            return NextResponse.json({ message: "Request not found" }, { status: 400 });
        }

        const text = `
            SELECT COUNT(click) AS click_count
            FROM clicksevaluationform cf
            WHERE cf.topic = $1 AND cf.datestimestamp LIKE $2;
        `;

        const values = [topic, `${date}%`];
        const client = await pool.connect();
        try {
            const res = await client.query(text, values);

            if (res.rowCount === 0) {
                return NextResponse.json({ message: 'clicksevaluationform not found' }, { status: 404 });
            }

            return NextResponse.json(res.rows[0]);
        } finally {
            client.release();
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}


export async function POST(req: NextRequest) {
    try {
        const request = await req.json();
        const { topic } = request;


        const date = moment().tz("Asia/Bangkok").format("YYYY-MM-DDTHH:mm:ssZ");
        const click = '1';

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
