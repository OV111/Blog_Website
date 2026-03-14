import { test, expect } from '@playwright/test';

const mobile = { width: 375, height: 812 };

test.describe('Mobile - Navbar', () => {
  test.beforeEach(async ({ page }) => {
    await page.setViewportSize(mobile);
    await page.goto('/about');
  });

  test('hamburger menu button is visible on mobile', async ({ page }) => {
    await expect(page.locator('button.md\\:hidden')).toBeVisible();
  });

  test('desktop nav links are hidden on mobile', async ({ page }) => {
    // Categories button is hidden on mobile (sm:flex hidden)
    await expect(page.locator('button.hidden.sm\\:flex')).not.toBeVisible();
  });

  test('hamburger opens mobile menu', async ({ page }) => {
    await page.locator('button.md\\:hidden').click();
    await expect(page.getByText('Categories')).toBeVisible();
  });

  test('hamburger closes mobile menu when clicked again', async ({ page }) => {
    await page.locator('button.md\\:hidden').click();
    await page.locator('button.md\\:hidden').click();
    await expect(page.locator('ul.md\\:hidden')).not.toBeVisible();
  });

  test('categories dropdown works in mobile menu', async ({ page }) => {
    await page.locator('button.md\\:hidden').click();
    await page.getByRole('button', { name: /categories/i }).click();
    await expect(page.getByRole('link', { name: 'Full Stack' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Backend' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'DevOps' })).toBeVisible();
  });

  test('navigating to a category from mobile menu works', async ({ page }) => {
    await page.locator('button.md\\:hidden').click();
    await page.getByRole('button', { name: /categories/i }).click();
    await page.getByRole('link', { name: 'Full Stack' }).click();
    await expect(page).toHaveURL('/categories/fullstack');
  });

  test('Get Started link is visible in mobile nav', async ({ page }) => {
    await expect(page.getByRole('link', { name: /get started/i })).toBeVisible();
  });
});

test.describe('Mobile - Pages', () => {
  test('home page renders on mobile', async ({ page }) => {
    await page.setViewportSize(mobile);
    await page.goto('/');
    await expect(page.locator('body')).toBeVisible();
  });

  test('get-started form is usable on mobile', async ({ page }) => {
    await page.setViewportSize(mobile);
    await page.goto('/get-started');
    await expect(page.getByRole('heading', { name: /sign up/i })).toBeVisible();
    await expect(page.getByPlaceholder('Enter Your First Name')).toBeVisible();
    await expect(page.getByPlaceholder('Enter Your Password')).toBeVisible();
  });

  test('category page renders on mobile', async ({ page }) => {
    await page.setViewportSize(mobile);
    await page.goto('/categories/fullstack');
    await expect(page.locator('body')).toBeVisible();
  });

  test('about page renders on mobile', async ({ page }) => {
    await page.setViewportSize(mobile);
    await page.goto('/about');
    await expect(page.locator('body')).toBeVisible();
  });
});
