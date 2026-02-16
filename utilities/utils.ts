import { Page } from '@playwright/test';

export async function addTextToVideo(page: Page, text: string, waitDuration: number = 1000) {
  const path = await page.video()?.path();
  if (path) {
    console.log(text);
    await page.evaluate((txt) => {
      let div = document.getElementById('debug-overlay');
      if (!div) {
        div = document.createElement('div');
        div.id = 'debug-overlay';
        div.style.position = 'fixed';
        div.style.bottom = '10px';
        div.style.left = '10px';
        div.style.background = 'rgba(0, 0, 0, 0.7)';
        div.style.color = 'white';
        div.style.padding = '10px';
        div.style.zIndex = '99999';
        div.style.fontSize = '16px';
        document.body.appendChild(div);
      }
      div.innerText = txt;
    }, text);
    if (waitDuration > 0) {
      await page.waitForTimeout(waitDuration);
    }
  }
  else{
    console.log(text);
    //if we don't wait the same duration then our tests might only pass when video recording is on, which is not what we want. We want the tests to pass regardless of the video recording status.
    if (waitDuration > 0) {
      await page.waitForTimeout(waitDuration);
    }
  }
}
