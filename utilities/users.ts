import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// If not running in CI, try to load from users.env
// In CI, we expect environment variables to be set directly
if (!process.env.CI) {
  dotenv.config({ path: path.resolve(__dirname, '../users.env') });
}

export interface User {
  loginName: string;
  password: string;
  baseUrl: string;
}

export function getUser(userKey: string): User {
  // Normalize the user key to uppercase for env var lookup
  // e.g. 'guest' -> 'GUEST', 'superUser' -> 'SUPERUSER'
  const prefix = "LOGINS_" + userKey.toUpperCase();

  const loginName = process.env[`${prefix}_LOGIN`];
  const baseUrl = process.env[`${prefix}_BASEURL`];
  let password = process.env[`${prefix}_PASSWORD`];
  if(password === undefined) {
    password = '';// Default to empty string if password is not set, to avoid returning undefined
  }

  if (!loginName || !baseUrl) {
    throw new Error(
      `User configuration for '${userKey}' is incomplete or missing. ` +
      `Expected environment variables: ${prefix}_LOGIN, ${prefix}_PASSWORD, ${prefix}_BASEURL.`
    );
  }

  return {
    loginName,
    password,
    baseUrl
  };
}
