import { test, expect } from '@playwright/test';

const categories = [
  'fullstack',
  'backend',
  'mobile',
  'ai&ml',
  'qa',
  'devops',
  'gamedev',
];

test.describe('Category Pages', () => {
  for (const category of categories) {
    test(`${category} page loads`, async ({ page }) => {
      await page.goto(`/categories/${category}`);
      await expect(page.locator('body')).toBeVisible();
      // Should not show a 404
      await expect(page.locator('body')).not.toContainText(/page not found/i);
    });
  }
});
