import { drizzle } from 'drizzle-orm/bun-sqlite';
import { Database } from 'bun:sqlite';

// Connect to the database
const sqlite = new Database('./src/database/sqlite.db');

export const db = drizzle(sqlite);
