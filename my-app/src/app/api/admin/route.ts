import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"
import uniqueString from 'unique-string';

//admin fisrt login
export async function POST(request: NextRequest, response: NextResponse) {
    const admin = process.env.NEXT_PUBLIC_ADMIN as string
    try {
        const req = await request.json()
        const { name, cmuaccount, studentid, organization_name, accounttype } = req;
        const personid = uniqueString()
        const role = "admin"

        const text = 'INSERT INTO admins(personid,firstname_lastname, cmuaccount, studentid, organization_name, accounttype, role) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *';
        const values = [personid, name, cmuaccount, studentid, organization_name, accounttype, role];

        const client = await pool.connect();
        try {

            const result = await client.query('SELECT * FROM admins WHERE cmuaccount = $1', [admin]);

            if (result.rowCount === 0) {
                console.log("result.rowCount=0");

                const res = await client.query(text, values);

                if (res.rowCount === 0) {
                    return new NextResponse('User not found', { status: 404 });
                }

                return NextResponse.json({ res });
            }

            return new NextResponse("Welcome to home");
        } finally {
            client.release();
        }
    } catch (error) {
        console.log("Admin push error : ", error);

    }
}


type SuccessResponse = {
    ok: true;
};

type ErrorResponse = {
    ok: false;
    message: string;
};

export async function PUT(request: NextRequest) {
    const req = await request.json();
    const cmuaccount: string = req.cmuaccount;
  
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM admins WHERE cmuaccount = $1', [cmuaccount]);
      client.release(); // Release the client back to the pool
  
      if (result.rows.length > 0) {
        // cmuaccount exists
        return NextResponse.json<SuccessResponse>({ ok: true });
      } else {
        // cmuaccount does not exist
        return NextResponse.json<ErrorResponse>({ ok: false, message: 'Account not found' });
      }
    } catch (error) {
      console.error('Error executing query:', error);
      return NextResponse.json<ErrorResponse>({ ok: false, message: 'Failed to fetch users' });
    }
  }