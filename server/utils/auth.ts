import { D1Dialect } from "@atinux/kysely-d1";
import { betterAuth } from "better-auth";
import pg from "pg";

const { Pool } = pg

export const auth = betterAuth({
  baseURL: getBaseURL(),
  database: {
    dialect: new D1Dialect({
      database: db(),
    }),
    type: "sqlite",
  },
  emailAndPassword: {
    enabled: false,
  },
  socialProviders: { 
    github: { 
      clientId: process.env.GITHUB_CLIENT_ID as string, 
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
    }, 
  }, 
})
 
let _auth: ReturnType<typeof betterAuth>
export function serverAuth() {
  if (!_auth) {
    _auth = auth
  }

  return _auth
}

function getBaseURL() {
  let baseURL = process.env.BETTER_AUTH_URL
  if (!baseURL) {
    try {
      baseURL = getRequestURL(useEvent()).origin
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (e) { /* empty */ }
  }
  return baseURL
}
