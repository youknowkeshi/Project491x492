import { Pool } from "pg";

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

export { pool };