import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"
import uniqueString from 'unique-string';


export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const req = await request.json()
        const { name, cmuaccount, studentid, organization_name, accounttype } = req;
        const personid = uniqueString()
        const role = "admin"

        const text = 'INSERT INTO admins(personid,firstname_lastname, cmuaccount, studentid, organization_name, accounttype, role) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [personid, name, cmuaccount, studentid, organization_name, accounttype, role];

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
        console.log("Admin push error : ", error);

    }
}




export async function PUT(request: NextRequest) {

    const req = await request.json();
    const cmuaccount = req.cmuaccount
    
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM admins WHERE cmuaccount = $1', [cmuaccount]);
        client.release(); // Release the client back to the pool 
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');
    }
   
}