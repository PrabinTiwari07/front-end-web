import { expect, test } from '@playwright/test';

// Test: User can sign in successfully
test('User can sign in with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/signin');
    
    await page.fill('input[placeholder="Enter your email"]', 'prabintiwari44@gmail.com');
    await page.fill('input[placeholder="Enter your password"]', 'prabin123');
    
    const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle" }), // Wait for navigation
        page.click('button[type="submit"]') // Click login button
    ]);
    
    await expect(page).toHaveURL('http://localhost:5173/');
});


// Test: User cannot sign in with incorrect credentials
test('User cannot sign in with invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/signin');
    
    await page.fill('input[placeholder="Enter your email"]', 'wronguser@example.com');
    await page.fill('input[placeholder="Enter your password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
});

// Test: User cannot sign in with empty fields
test('User cannot sign in with empty fields', async ({ page }) => {
    await page.goto('http://localhost:5173/signin');

    // Attempt to submit the form without entering any values
    await page.click('button[type="submit"]');

    // Check if the email field is still focused (browser prevents submission)
    const emailInput = page.locator('input[placeholder="Enter your email"]');
    await expect(emailInput).toBeFocused();

    // Check if the email input has the "required" attribute
    await expect(emailInput).toHaveAttribute('required', '');
});


// Test: Toggle password visibility
test('User can toggle password visibility', async ({ page }) => {
    await page.goto('http://localhost:5173/signin');
    
    // Fill the password field
    await page.fill('input[placeholder="Enter your password"]', 'password');

    // Click on the eye icon to show the password
    await page.click('span.cursor-pointer');

    // Check if password is visible
    const passwordInput = await page.locator('input[placeholder="Enter your password"]');
    await expect(passwordInput).toHaveAttribute('type', 'text'); // Ensures password is visible

    // Click again to hide password
    await page.click('span.cursor-pointer');
    await expect(passwordInput).toHaveAttribute('type', 'password'); // Ensures password is hidden again
});


// Test: Check redirection to register page
 test('User can navigate to register page', async ({ page }) => {
    await page.goto('http://localhost:5173/signin');
    await page.click('text=Sign up');
    
    await expect(page).toHaveURL('http://localhost:5173/register');
});
