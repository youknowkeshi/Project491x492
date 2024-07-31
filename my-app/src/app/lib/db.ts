import { Pool } from "pg";
import * as Minio from 'minio'


const pool = new Pool({
    user: process.env.PGSQL_USER,
    password: process.env.PGSQL_PASSWORD,
    host: process.env.PGSQL_HOST,
    port: 5432,
    database: process.env.PGSQL_DATABASE,
    ssl: {
      rejectUnauthorized: false, // Use 'rejectUnauthorized: false' for self-signed certificates
    },
  });

  const minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9011,
    useSSL: false,
    accessKey: 'Entaneer_mind',
    secretKey: 'ILoveYou300AndMind',
  })


  export {pool,minioClient} ;