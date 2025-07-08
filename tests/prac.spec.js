// tests/prac.spec.js
const { test, expect } = require('@playwright/test');

// Dynamically import fetch to avoid double declaration
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

test('Login and navigate to Total Revenue page', async ({ page }, testInfo) => {
  const url = 'https://staging.fohboh.ai/login';

  let isServerReachable = false;
  try {
    const res = await fetch(url, { timeout: 50000 });
    if (res.ok) isServerReachable = true;
  } catch (err) {
    testInfo.skip(`Skipping test: Server not reachable - ${err.message}`);
    return;
  }

  try {
    await page.goto(url, { timeout: 90000 });

    await page.fill('input[name="email"]', 'yoyat94384@finfave.com');
    await page.fill('input[name="password"]', 'Aa@123456');
    await page.click('button:has-text("Log In")');
    // Handle multiple toasts
const toasts = page.locator('.Toastify__toast');
try {
  if (await toasts.first().isVisible({ timeout: 3000 })) {
    await page.waitForFunction(() => {
      return document.querySelectorAll('.Toastify__toast').length === 0;
    }, { timeout: 7000 });
  }
} catch (e) {
  console.warn('⚠️ Toast handling timed out or none appeared.');
}


    await expect(page.locator('h3.font-bold.font-aeonik', { hasText: 'Dashboard' })).toBeVisible({ timeout: 99000 });

    await page.click('button:has-text("See details")');

    await expect(page).toHaveURL(/.*\/total-revenues/);

    await expect(page.getByRole('heading', { name: 'Total Revenue' })).toBeVisible();
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    await page.screenshot({ path: 'error-screenshot.png' });
     // Safely take screenshot only if page is not closed
  if (!page.isClosed()) {
    await page.screenshot({ path: 'error-screenshot.png' });
  }
    throw error;
  }
});
