import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../../lib/db"
import { useParams } from "next/navigation";
// import { useSearchParams } from "next/navigation";

export async function GET(request:NextRequest ,context: {params:{id:string}}) {

    const id = context.params.id
    if(!id){
        return new Error('Failed to get id')
    }
    
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM users WHERE personid = $1', [id]);
        client.release(); // คืน client กลับไปให้ pool
        console.log(result.rows[0]);
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error('Error executing query:', error);
        return new Error('Failed to fetch users');
    }

}