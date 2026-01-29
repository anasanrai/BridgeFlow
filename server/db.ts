import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import * as schema from '@shared/schema';

if (!process.env.DATABASE_URL) {
    // We'll fall back to MemStorage in storage.ts if this is missing,
    // but for those wanting to use DB, we need the URL.
    console.warn("DATABASE_URL is missing. Database persistence will be disabled.");
}

export const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
