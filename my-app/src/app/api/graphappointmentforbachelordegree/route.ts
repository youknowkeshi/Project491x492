import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db";

// input must have date and this is data of appointment not for single-people each bachelordegree grade level
export async function PUT(req: NextRequest) {
    try {
        const request = await req.json();
        const { startdate, enddate } = request;

        if (!startdate && !enddate) {
            return NextResponse.json({ message: "Please provide a date" }, { status: 400 });
        }

        const text = `SELECT 
                    CONCAT('ชั้นปี ', 
                        CASE
                            WHEN (date_part('year', now()) - (CAST('25' || SUBSTR(u.studentid, 1, 2) AS INTEGER)) + 544) > 4
                            THEN 'มากกว่า 4'
                            ELSE to_char(date_part('year', now()) - (CAST('25' || SUBSTR(u.studentid, 1, 2) AS INTEGER)) + 544, '9999')
                        END
                    ) AS class_year,
                    COUNT(*) AS count_class_year
                FROM users u JOIN user_conseling_room1 ucr ON u.personid = ucr.personid
                JOIN informationusers_room1 ir ON ucr.event_id = ir.event_id
                WHERE ucr.start_datetime BETWEEN $1 AND $2 AND u.gradelevel = 'ป.ตรี'
                GROUP BY 
                    CASE
                        WHEN (date_part('year', now()) - (CAST('25' || SUBSTR(u.studentid, 1, 2) AS INTEGER)) + 544) > 4
                        THEN 'มากกว่า 4'
                        ELSE to_char(date_part('year', now()) - (CAST('25' || SUBSTR(u.studentid, 1, 2) AS INTEGER)) + 544, '9999')
                    END;
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
