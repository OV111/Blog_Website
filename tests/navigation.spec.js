import { test, expect } from '@playwright/test';

test.describe('Public Pages Navigation', () => {
  test('home page loads', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('about page loads', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL('/about');
    await expect(page.locator('body')).toBeVisible();
  });

  test('contact page loads', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveURL('/contact');
    await expect(page.locator('body')).toBeVisible();
  });

  test('privacy page loads', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page).toHaveURL('/privacy');
    await expect(page.locator('body')).toBeVisible();
  });

  test('get-started page loads', async ({ page }) => {
    await page.goto('/get-started');
    await expect(page).toHaveURL('/get-started');
    await expect(page.locator('body')).toBeVisible();
  });

  test('unknown route shows 404 page', async ({ page }) => {
    await page.goto('/this-does-not-exist');
    await expect(page.locator('body')).toBeVisible();
  });
});
