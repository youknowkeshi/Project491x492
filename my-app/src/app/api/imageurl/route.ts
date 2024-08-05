
import { pool, minioClient } from "../../lib/db"
import { NextRequest, NextResponse } from 'next/server';
import { v6 as uuidv6 } from 'uuid';
import fs from 'fs';
import path from 'path';

export async function POST(req: NextRequest) {
    // Destination bucket
    const bucket = 'demomind';

    try {
        const formData = await req.json();
        const file = formData.get('file');

        if (!(file instanceof File)) {
            return NextResponse.json({ message: "No valid file provided" }, { status: 400 });
        }

        const fileBuffer = await file.arrayBuffer();
        const fileName = file.name;
        const tempFilePath = path.join('/tmp', fileName);

        // Save the file to a temporary location
        fs.writeFileSync(tempFilePath, Buffer.from(fileBuffer));

        // Destination object name
        const destinationObject = uuidv6();

        // Check if the bucket exists
        // If it doesn't, create it
        const exists = await minioClient.bucketExists(bucket);
        if (exists) {
            console.log('Bucket ' + bucket + ' exists.');
        } else {
            await minioClient.makeBucket(bucket, 'us-east-1');
            console.log('Bucket ' + bucket + ' created in "us-east-1".');
        }

        const metaData = {
            'Content-Type': file.type, // Use the actual file type
            'X-Amz-Meta-Testing': 1234,
            example: 5678,
        };

        // Upload the file with fPutObject
        await minioClient.fPutObject(bucket, destinationObject, tempFilePath, metaData);
        console.log('File ' + tempFilePath + ' uploaded as object ' + destinationObject + ' in bucket ' + bucket);

        // Optionally, delete the temporary file after upload
        fs.unlinkSync(tempFilePath);

        return NextResponse.json({ message: "File uploaded successfully", destinationObject });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "error", error }, { status: 500 });
    }
}