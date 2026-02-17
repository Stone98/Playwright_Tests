import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { Page, test, expect } from '@playwright/test';
import { addTextToVideo } from '../utilities/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// If not running in CI, try to load from users.env
// In CI, we expect environment variables to be set directly
if (!process.env.CI) {
  dotenv.config({ path: path.resolve(__dirname, '../users.env') });
}

export async function loginUser(page: Page, myUser: User) {
    await page.goto(myUser.baseUrl);
    await addTextToVideo(page, 'Logging in as ' + myUser.loginName);
    const adminRole = page.getByText(myUser.loginName + ' Role').first();//Get a user with the admin role
    //this element's next sibling is the anchor we want to click, so we use .locator() to find it and click it
    await adminRole.locator('xpath=following-sibling::a').click();
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
