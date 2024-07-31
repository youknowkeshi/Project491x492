import { NextRequest, NextResponse } from "next/server";
import { pool } from "../../lib/db"
import { Ruthie } from "next/font/google";
import { message } from "antd";


export async function GET() {

    const text = ``;
    const client = await pool.connect()
    try {
        const res = client.query(text);
        client.release()
        return NextResponse.json(res)
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"Error",error})
    } 
    
}

export async function POST(req: NextRequest) {
    try {
        const request = await req.json()
        const { article, img_url } = request

        if(!article){
            return NextResponse.json({message:"empty article"},{status:400})
        }

        const text = `INSERT INTO clicksevaluationform (text_content, image_url ) VALUES ($1, $2) RETURNING *`
        const values =[article, img_url]

        const client = await pool.connect()
        try{
            const res = client.query(text,values) 

            return NextResponse.json(res)
        }finally{
            client.release();
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({message:"error",error})
    }
}