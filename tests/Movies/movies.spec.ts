import { test, expect } from '@playwright/test';
import { addTextToVideo } from '../../utilities/utils.js';
import { getUser } from '../../utilities/users.js';

test('homepage shows popular movies', async ({ page }) => {
  await page.goto('https://debs-obrien.github.io/playwright-movies-app');
  await addTextToVideo(page, 'Navigating to homepage');
  await expect(page.getByRole('main')).toMatchAriaSnapshot(`
    - main:
      - heading "Popular" [level=1]
      - heading "movies" [level=2]
      - list "movies"
  `);
  await addTextToVideo(page, 'Verified popular movies section');
});