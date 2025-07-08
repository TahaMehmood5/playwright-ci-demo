// playwright.config.js
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests', // Folder where your test files are
  timeout: 60 * 1000, // 30 seconds per test
  expect: {
    timeout: 5000, // Timeout for expect()
  },
  fullyParallel: true, // Run all tests in parallel
  retries: 0, // Set to 1 or 2 if you want failed tests to retry

  // Reporter settings
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],

  // Global browser settings
  use: {
    headless: false, // Set to true if you want to hide the browser
    screenshot: 'only-on-failure', // Take screenshot only if test fails
    trace: 'on-first-retry', // Record trace only when test fails first time
    video: 'retain-on-failure', // Optional: Keep video only when test fails
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    actionTimeout: 0, // No timeout for actions like click, fill, etc.
  },

  // Run tests in multiple browsers
  projects: [
    {
      name: 'Chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'WebKit',
      use: { browserName: 'webkit' },
    },
    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

  ],
});
