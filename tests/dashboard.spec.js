import { expect, test } from '@playwright/test';

async function loginAsAdmin(page) {
    await page.goto('http://localhost:5173/signin');

    await page.fill('input[placeholder="Enter your email"]', 'admin@cleanease.com');
    await page.fill('input[placeholder="Enter your password"]', 'cleanease123');

    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('http://localhost:5173/dashboard');

    return await page.evaluate(() => localStorage.getItem('adminToken'));
}

test('Analytics page loads and displays booking stats', async ({ page }) => {
    const token = await loginAsAdmin(page);

    await page.addInitScript(token => {
        localStorage.setItem('adminToken', token);
    }, token);

    await page.goto('http://localhost:5173/dashboard');
    await page.click('text=Analytics');

    await page.waitForSelector('text=Laundry Management Analytics', { timeout: 10000 });
    await expect(page.locator('text=Laundry Management Analytics')).toBeVisible();

    await expect(page.locator('text=Booking Completed')).toBeVisible();
    await expect(page.locator('text=Booking Pending')).toBeVisible();
    await expect(page.locator('text=Booking Cancelled')).toBeVisible();
});

test('Booking and Revenue charts are visible', async ({ page }) => {
    const token = await loginAsAdmin(page);

    await page.addInitScript(token => {
        localStorage.setItem('adminToken', token);
    }, token);

    await page.goto('http://localhost:5173/dashboard');
    await page.click('text=Analytics');

    await page.waitForSelector('h3:text("Monthly Booking Trends")', { timeout: 10000 });
    await expect(page.locator('h3:text("Monthly Booking Trends")')).toBeVisible();

    await expect(page.locator('.recharts-line').first()).toBeVisible();

    await page.waitForSelector('h3:text("Monthly Revenue Trends")', { timeout: 10000 });
    await expect(page.locator('h3:text("Monthly Revenue Trends")')).toBeVisible();

    await expect(page.locator('.recharts-bar').first()).toBeVisible();
});

test('Logout redirects to login page', async ({ page }) => {
    const token = await loginAsAdmin(page);

    await page.addInitScript(token => {
        localStorage.setItem('adminToken', token);
    }, token);

    await page.goto('http://localhost:5173/dashboard');

    await page.click('text=Logout');

    await expect(page).toHaveURL('http://localhost:5173/signin');
});
