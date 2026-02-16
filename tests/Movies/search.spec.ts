import { test, expect } from '@playwright/test';
import { addTextToVideo } from '../../utilities/utils.js';
import { getUser } from '../../utilities/users.js';

test('Test Search Functionality', async ({ page }) => {
  await page.goto('https://debs-obrien.github.io/playwright-movies-app?category=Popular&page=1');
  await addTextToVideo(page, 'Navigating to homepage');
  await page.locator('span').nth(1).click();
  await addTextToVideo(page, 'Opening Navigation Menu', 3000);
  await page.getByRole('link', { name: 'Action' }).click();
  await addTextToVideo(page, 'Filtering by Action Category');
  await page.getByRole('search').click();
  await addTextToVideo(page, 'Opening Search Bar');
  await page.getByRole('textbox', { name: 'Search Input' }).fill('Garfield');
  await addTextToVideo(page, 'Typing Search Query');
  await page.getByRole('button', { name: 'Search for a movie' }).click();
  await addTextToVideo(page, 'Executing Search');
  await expect(page.getByRole('link', { name: 'poster of The Garfield Movie' })).toBeVisible();
  await addTextToVideo(page, 'Verifying Search Results');
});