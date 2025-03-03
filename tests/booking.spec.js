import { expect, test } from '@playwright/test';

async function loginAndGetToken(page) {
    await page.goto('http://localhost:5173/signin');
    await page.fill('input[placeholder="Enter your email"]', 'pyroanime69@gmail.com');
    await page.fill('input[placeholder="Enter your password"]', 'pyro123');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('http://localhost:5173/');

    return await page.evaluate(() => localStorage.getItem('token'));
}

test('Service page displays "Automated Laundry"', async ({ page }) => {
    const token = await loginAndGetToken(page);

    await page.addInitScript(token => {
        localStorage.setItem('token', token);
    }, token);

    await page.goto('http://localhost:5173/service');

    // Wait for the text "Automated Laundry" to appear
    await page.waitForSelector('text=Automated Laundry', { timeout: 10000 });

    // Assert that the text is visible on the page
    await expect(page.locator('text=Automated Laundry')).toBeVisible();

    // Debugging: Print found text
    const serviceText = await page.locator('text=Automated Laundry').innerText();
    console.log(`Found service: ${serviceText}`);
});


test('Redirects to Signin page when not authenticated', async ({ page }) => {
    await page.goto('http://localhost:5173/booking');

    await expect(page).toHaveURL('http://localhost:5173/signin');
});


test('Clicking Discover More redirects to a specific service', async ({ page }) => {
    await page.goto('http://localhost:5173/service');

    await page.waitForSelector('text=Discover More');
    await page.locator('text=Discover More').first().click();

    await expect(page).toHaveURL(/\/service\/\w+/);
});
