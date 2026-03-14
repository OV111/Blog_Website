import { test, expect } from '@playwright/test';

test.describe('Protected Routes', () => {
  test('my-profile redirects when not logged in', async ({ page }) => {
    await page.goto('/my-profile');
    // Should not stay on my-profile, redirects to get-started or home
    await expect(page).not.toHaveURL('/my-profile');
  });

  test('my-profile/settings redirects when not logged in', async ({ page }) => {
    await page.goto('/my-profile/settings');
    await expect(page).not.toHaveURL('/my-profile/settings');
  });

  test('my-profile/add-blog redirects when not logged in', async ({ page }) => {
    await page.goto('/my-profile/add-blog');
    await expect(page).not.toHaveURL('/my-profile/add-blog');
  });

  test('my-profile/chats redirects when not logged in', async ({ page }) => {
    await page.goto('/my-profile/chats');
    await expect(page).not.toHaveURL('/my-profile/chats');
  });

  test('my-profile/followers redirects when not logged in', async ({ page }) => {
    await page.goto('/my-profile/followers');
    await expect(page).not.toHaveURL('/my-profile/followers');
  });

  test('my-profile/favourites redirects when not logged in', async ({ page }) => {
    await page.goto('/my-profile/favourites');
    await expect(page).not.toHaveURL('/my-profile/favourites');
  });

  test('my-profile/notifications redirects when not logged in', async ({ page }) => {
    await page.goto('/my-profile/notifications');
    await expect(page).not.toHaveURL('/my-profile/notifications');
  });
});
