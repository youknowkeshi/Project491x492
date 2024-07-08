import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"



//ดึงข้อมูล users, room1, infor
export async function GET(res: NextResponse, req: NextRequest) {
    try {
        const client = await pool.connect();
        const result = await client.query
            (`select u.personid ,u.firstname_lastname , u.studentid ,u.phone , u.major  , u.gender , 
            ucr.topic , u.facebookurl ,ir.details_consultation ,ir.mental_health_checklist ,ucr.start_datetime, 
            ucr.end_datetime ,ucr.room ,ucr.event_id from users u join user_conseling_room1 ucr on u.personid = ucr.personid 
            join informationusers_room1 ir on ucr.event_id = ir.event_id;`);
        client.release(); // Release the client back to the pool 
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');
    }

}

export async function POST(req: NextRequest) {
    try {
        const requestBody = await req.json();
        const { date } = requestBody;


        // Validate the date input
        if (!date) {
            return NextResponse.json({ error: 'Date is required' }, { status: 400 });
        }

        const client = await pool.connect();

        // Parameterized query to prevent SQL injection
        const queryText = `
           select u.personid ,u.firstname_lastname , u.studentid ,u.phone , u.major  , u.gender , ucr.topic , u.facebookurl 
            ,ir.details_consultation ,ir.mental_health_checklist ,ucr.start_datetime, ucr.end_datetime ,ucr.room 
            from users u join user_conseling_room1 ucr on u.personid = ucr.personid join informationusers_room1 ir on ucr.event_id = ir.event_id
            WHERE DATE(ucr.start_datetime) = $1;
        `;

        const result = await client.query(queryText, [date]);

        client.release(); // Release the client back to the pool

        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error('Error executing query:', error);
        return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
}


// edit  detail and checklist
export async function PUT(request: NextResponse) {
    try {
        const req = await request.json();

        const { details, health, infor_id } = req;

        const text = 'UPDATE informationusers SET details_consultation =$1, mental_health_checklist= $2 WHERE infor_id = $3';
        const values = [details, health, infor_id];

        const client = await pool.connect();
        try {
            const res = await client.query(text, values);

            if (res.rowCount === 0) {
                return new Response('User not found', { status: 404 });
            }

            return Response.json({ res });
        } finally {
            client.release();
        }

    } catch (error) {
        console.log("put information error : ", error);

    }
}
