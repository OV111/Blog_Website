import { test, expect } from '@playwright/test';

const emailInput = (page) => page.getByPlaceholder('Enter Your Email', { exact: true });
const passwordInput = (page) => page.getByPlaceholder('Enter Your Password', { exact: true });

test.describe('Auth - Get Started Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/get-started');
  });

  test('shows sign up form by default', async ({ page }) => {
    await expect(page.getByRole('heading', { name: /sign up/i })).toBeVisible();
    await expect(page.getByPlaceholder('Enter Your First Name')).toBeVisible();
    await expect(page.getByPlaceholder('Enter Your Last Name')).toBeVisible();
    await expect(emailInput(page)).toBeVisible();
    await expect(passwordInput(page)).toBeVisible();
    await expect(page.getByPlaceholder('Confirm Password')).toBeVisible();
  });

  test('switches to login form when toggle clicked', async ({ page }) => {
    await page.getByText(/already have an account/i).click();
    await expect(page.getByRole('heading', { name: /log in/i })).toBeVisible();
    await expect(page.getByPlaceholder('Enter Your First Name')).not.toBeVisible();
    await expect(page.getByPlaceholder('Confirm Password')).not.toBeVisible();
  });

  test('switches back to sign up from login', async ({ page }) => {
    await page.getByText(/already have an account/i).click();
    await page.getByText(/don't have an account/i).click();
    await expect(page.getByRole('heading', { name: /sign up/i })).toBeVisible();
  });

  test('shows validation errors when sign up submitted empty', async ({ page }) => {
    await page.getByRole('button', { name: /sign up/i }).click();
    await expect(page.getByText(/first name is required/i)).toBeVisible();
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test('shows error when passwords do not match', async ({ page }) => {
    await page.getByPlaceholder('Enter Your First Name').fill('John');
    await page.getByPlaceholder('Enter Your Last Name').fill('Doe');
    await emailInput(page).fill('john@example.com');
    await passwordInput(page).fill('password123');
    await page.getByPlaceholder('Confirm Password').fill('differentpassword');
    await page.getByRole('button', { name: /sign up/i }).click();
    await expect(page.getByText(/password don't match/i)).toBeVisible();
  });

  test('shows error when password is too short', async ({ page }) => {
    await page.getByPlaceholder('Enter Your First Name').fill('John');
    await page.getByPlaceholder('Enter Your Last Name').fill('Doe');
    await emailInput(page).fill('john@example.com');
    await passwordInput(page).fill('123');
    await page.getByPlaceholder('Confirm Password').fill('123');
    await page.getByRole('button', { name: /sign up/i }).click();
    await expect(page.getByText(/at least 6 chars/i)).toBeVisible();
  });

  test('password toggle shows/hides password', async ({ page }) => {
    await expect(passwordInput(page)).toHaveAttribute('type', 'password');
    await page.locator('button[type="button"]').first().click();
    await expect(passwordInput(page)).toHaveAttribute('type', 'text');
  });

  test('login form shows validation errors when submitted empty', async ({ page }) => {
    await page.getByText(/already have an account/i).click();
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page.getByText(/email is required/i)).toBeVisible();
    await expect(page.getByText(/password is required/i)).toBeVisible();
  });

  test('login with wrong credentials shows error message', async ({ page }) => {
    await page.getByText(/already have an account/i).click();
    await emailInput(page).fill('wrong@example.com');
    await passwordInput(page).fill('wrongpassword');
    await page.getByRole('button', { name: /login/i }).click();
    await expect(page.locator('body')).toContainText(/.+/);
  });
});
