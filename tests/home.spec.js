import { expect, test } from '@playwright/test';
test('Homepage displays "Laundry Simplified"', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Wait for the heading "Laundry Simplified" to appear
    await page.waitForSelector('text=Laundry Simplified', { timeout: 10000 });

    // Assert that the text is visible on the page
    await expect(page.locator('text=Laundry Simplified')).toBeVisible();

    // Debugging: Print found text
    const headingText = await page.locator('text=Laundry Simplified').innerText();
    console.log(`Found heading: ${headingText}`);
});


test('Navbar is visible and contains expected navigation links', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    await page.waitForSelector('nav', { timeout: 5000 });
    await expect(page.locator('nav')).toBeVisible();

    await expect(page.locator('nav')).toContainText('Home');
    await expect(page.locator('nav')).toContainText('Service');
    await expect(page.locator('nav')).toContainText('Contact');
});




test('Footer is visible and contains expected services', async ({ page }) => {
    await page.goto('http://localhost:5173/');

    // Wait for the footer to be visible
    const footer = page.locator('footer');
    await footer.waitFor({ state: 'visible', timeout: 10000 });

    // Check for "Our Services" heading
    await expect(page.locator('text=Our Services')).toBeVisible();


});



