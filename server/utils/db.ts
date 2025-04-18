import { drizzle as drizzle_neon_http } from 'drizzle-orm/neon-http'
import { drizzle as drizzle_pg } from 'drizzle-orm/postgres-js'
import { neon } from "@neondatabase/serverless";
import postgres from 'postgres'

type NeonHttp = ReturnType<typeof drizzle_neon_http> | ReturnType<typeof drizzle_pg>

let _db: NeonHttp
export function db(): NeonHttp {
  if (_db) {
    return _db
  }

  if (import.meta.dev) {
    const client = postgres(process.env.DATABASE_URL as string);
    _db = drizzle_pg({ client });
    return _db
  }

  const client = neon(process.env.DATABASE_URL as string);
  _db = drizzle_neon_http({ client });

  return _db
}