import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db";
import moment from 'moment-timezone';


//for get count topic 
export async function PUT(req: NextRequest) {
    try {
        const request = await req.json();
        const { startdate, enddate } = request;
        

        if (!startdate || !enddate) {
            return NextResponse.json({ message: "Request not found" }, { status: 400 });
        }
      
        

        const text = `
           SELECT topic, COUNT(click) AS click_count
            FROM clicksevaluationform cf
            WHERE datestimestamp BETWEEN $1 AND $2
            GROUP BY topic;
        `;

        const values = [startdate, enddate];
        
        const client = await pool.connect();
        try {
            const res = await client.query(text, values);

            if (res.rowCount === 0) {
                return NextResponse.json({ message: 'clicksevaluationform not found' }, { status: 404 });
            }

            return NextResponse.json(res.rows);
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
