import { test, expect } from '@playwright/test';
import { addTextToVideo } from '../../utilities/utils.js';
import { getUser } from '../../utilities/users.js';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await addTextToVideo(page, 'Checking page title');
  await expect(page).toHaveTitle(/Playwright/);
  await addTextToVideo(page, 'Page title is correct');
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();
  await addTextToVideo(page, 'Clicked Get Started link');

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  await addTextToVideo(page, 'Installation heading is visible');
});
