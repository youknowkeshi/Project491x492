import { Pool } from "pg";

interface NewData {
  firstname_lastname: string;
  studentid: string;
  phone: string;
  major: string;
  gender: string;
  topic: string;
  facebookurl: string;
  role: string;
  organizationcode: string;
}


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


  export {pool} ;