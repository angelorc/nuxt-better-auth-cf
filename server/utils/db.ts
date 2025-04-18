import type { D1Database as CFD1Database } from '@cloudflare/workers-types/experimental'

type D1Database = Omit<CFD1Database, 'dump'>

let _db: D1Database
export function db(): D1Database {
  if (_db) {
    return _db
  }

  // @ts-expect-error globalThis.__env__ is not defined
  const binding = process.env.DB || globalThis.__env__?.DB || globalThis.DB
  if (!binding) {
    throw createError('D1 database binding not found')
  }

  _db = binding as D1Database
  return _db
}