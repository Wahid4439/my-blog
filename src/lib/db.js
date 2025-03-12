import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function query(text, params) {
  return (await pool.query(text, params)).rows;
}