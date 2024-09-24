import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

// Connect to the database
const sqlite = new Database(process.env.DATABASE_URL);

export const db = drizzle(sqlite);
