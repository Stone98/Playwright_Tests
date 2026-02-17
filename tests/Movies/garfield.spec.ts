import { test, expect } from '@playwright/test';
import { addTextToVideo } from '../../utilities/utils.js';
import { getUser } from '../../utilities/users.js';


test('The Garfield Movie is listed on the home page as a popular movie', async ({ page }) => {
  //await page.goto('https://debs-obrien.github.io/playwright-movies-app');
  //This page can be slow to load, especially on the first load, so we will wait until the DOM content is loaded before proceeding with the test. This will help ensure that the test does not fail due to the page not being fully loaded.
  await page.goto('https://debs-obrien.github.io/playwright-movies-app', { waitUntil: 'domcontentloaded' });

// hello
  await addTextToVideo(page, 'Looking for The Garfield Movie');
  const movie = page.getByText('The Garfield Movie').first();
 
  await addTextToVideo(page, 'Found The Garfield Movie');

  // Scroll into view and wait for video recording
  await movie.scrollIntoViewIfNeeded();
   await expect(movie).toBeVisible({ timeout: 20000 });
  await addTextToVideo(page, 'Scrolled to The Garfield Movie');
  await page.waitForTimeout(3000);
});
