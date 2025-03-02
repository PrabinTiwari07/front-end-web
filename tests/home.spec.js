import { expect, test } from '@playwright/test';

test('Home page loads and displays services', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.waitForSelector('h2:text("Our Services")', { timeout: 15000 });
    await expect(page.locator('h2:text("Our Services")')).toBeVisible();

    const services = page.locator('.bg-white.rounded-lg.shadow-lg');
    await expect(services).toHaveCount(1); 
});

test('User can navigate to a service details page', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.waitForSelector('.bg-white.rounded-lg.shadow-lg', { timeout: 15000 });

    await page.click('text=Learn More');

    await expect(page).toHaveURL(/\/service\/\w+/);
});

test('Navbar is visible and contains expected navigation links', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.waitForSelector('nav', { timeout: 5000 });
    await expect(page.locator('nav')).toBeVisible();

    await expect(page.locator('nav')).toContainText('Home');
    await expect(page.locator('nav')).toContainText('Service');
    await expect(page.locator('nav')).toContainText('Contact');
});




test('Footer is visible and contains expected sections', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    const footer = page.locator('footer');
    await footer.waitFor({ state: 'visible', timeout: 10000 });

    await expect(page.locator('text=Newsletter')).toBeVisible();
    await expect(page.locator('input[placeholder="Your Name"]')).toBeVisible();
    await expect(page.locator('input[placeholder="Your Email"]')).toBeVisible();
    await expect(page.locator('button:text("Submit Now")')).toBeVisible();
});

test('Newsletter Submit Now button is clickable', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.locator('footer').scrollIntoViewIfNeeded();
    await page.waitForTimeout(500); 

    await page.fill('input[placeholder="Your Name"]', 'John Doe');
    await page.fill('input[placeholder="Your Email"]', 'johndoe@example.com');

    await page.click('button:text("Submit Now")');

});
