import { drizzle as drizzle_neon_http } from 'drizzle-orm/neon-http'
import { neon } from "@neondatabase/serverless";

type NeonHttp = ReturnType<typeof drizzle_neon_http>

let _db: NeonHttp
export function db(): NeonHttp {
  if (_db) {
    return _db
  }

  const client = neon(process.env.DATABASE_URL as string);
  _db = drizzle_neon_http({ client });

  return _db
}