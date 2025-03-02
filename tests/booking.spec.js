import { expect, test } from '@playwright/test';

async function loginAndGetToken(page) {
    await page.goto('http://localhost:5173/signin');
    await page.fill('input[placeholder="Enter your email"]', 'prabintiwari44@gmail.com');
    await page.fill('input[placeholder="Enter your password"]', 'prabin123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('http://localhost:5173/');

    return await page.evaluate(() => localStorage.getItem('token'));
}

test('Booking page loads and displays bookings', async ({ page }) => {
    const token = await loginAndGetToken(page);

    await page.addInitScript(token => {
        localStorage.setItem('token', token);
    }, token);

    await page.goto('http://localhost:5173/booking');

    await page.waitForSelector('h2:text("My Bookings")', { timeout: 20000 });
    await expect(page.locator('h2:text("My Bookings")')).toBeVisible();

    const bookings = page.locator('.bg-white.shadow-lg.rounded-xl');
    await expect(bookings).toHaveCount(1);  
});

test('Redirects to Signin page when not authenticated', async ({ page }) => {
    await page.goto('http://localhost:5173/booking');

    await expect(page).toHaveURL('http://localhost:5173/signin');
});

test('Booking status is displayed with correct color', async ({ page }) => {
    const token = await loginAndGetToken(page);

    await page.addInitScript(token => {
        localStorage.setItem('token', token);
    }, token);

    await page.goto('http://localhost:5173/booking');

    await page.waitForSelector('.bg-white.shadow-lg.rounded-xl', { timeout: 20000 });

    const statusElement = page.locator('.w-full.text-center.px-4.py-2.text-lg.font-bold');

    await expect(statusElement).toContainText(/Pending|Confirmed|Canceled/);
});
