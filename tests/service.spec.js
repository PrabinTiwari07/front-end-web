import { expect, test } from '@playwright/test';

test('Service page loads and displays services', async ({ page }) => {
    await page.goto('http://localhost:5173/service');

    await page.waitForSelector('h2', { timeout: 10000 });
    await expect(page.locator('h2')).toHaveText('Our Services');

    const services = page.locator('.card');
    await expect(services).toHaveCount(1); 
});

test('User can navigate to a service details page', async ({ page }) => {
    await page.goto('http://localhost:5173/service');

    await page.waitForSelector('.card', { timeout: 10000 });

    await page.click('.card:nth-of-type(1) button');

    await expect(page).toHaveURL(/\/service\/\w+/);
});

test('Service images are displayed correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/service');

    await page.waitForSelector('.card img', { timeout: 10000 });

    const images = page.locator('.card img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
});


test('Clicking Learn More redirects to a specific service', async ({ page }) => {
    await page.goto('http://localhost:5173/service');

    await page.waitForSelector('text=Learn More');
    await page.click('text=Learn More');

    await expect(page).toHaveURL('http://localhost:5173/service/67c284965e9807b7a4471ff9');
});