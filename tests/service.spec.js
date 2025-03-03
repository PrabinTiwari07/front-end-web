import { expect, test } from '@playwright/test';

test('Service page displays "Our Premium Services" heading', async ({ page }) => {
    await page.goto('http://localhost:5173/service');

    // Wait for the heading to be present
    await page.waitForSelector('h2', { timeout: 10000 });

    // Check if the heading contains the expected text
    const heading = await page.locator('h2').innerText();
    console.log(`Found heading: ${heading}`); // Debugging output

    expect(heading).toContain("Our Premium Services");
});


test('Service page displays "Automated Laundry" service', async ({ page }) => {
    await page.goto('http://localhost:5173/service');

    // Wait for the text "Automated Laundry" to appear
    await page.waitForSelector('text=Automated Laundry', { timeout: 10000 });

    // Assert that the text is visible on the page
    await expect(page.locator('text=Automated Laundry')).toBeVisible();

    // Debugging: Print found text
    const serviceText = await page.locator('text=Automated Laundry').innerText();
    console.log(`Found service: ${serviceText}`);
});


// test('Service page displays "Discover More" service', async ({ page }) => {
//     await page.goto('http://localhost:5173/service');

//     await page.waitForSelector('text=Discover More', { timeout: 10000 });

//     await expect(page.locator('text=Discover More')).toBeVisible();

//     const serviceText = await page.locator('text=Discover More').innerText();
//     console.log(`Found service: ${serviceText}`);
// });



test('Clicking Discover More redirects to a specific service', async ({ page }) => {
    await page.goto('http://localhost:5173/service');

    await page.waitForSelector('text=Discover More');
    await page.locator('text=Discover More').first().click();

    await expect(page).toHaveURL(/\/service\/\w+/);
});
