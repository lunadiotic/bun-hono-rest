import { migrate } from 'drizzle-orm/bun-sqlite/migrator';
import { db } from '../config/db';

// Migrate the database
await migrate(db, { migrationsFolder: './drizzle' });

console.log('Database migrated');
