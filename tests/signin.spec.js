import { expect, test } from '@playwright/test';

test('User can sign in with valid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/signin');
    
    await page.fill('input[placeholder="Enter your email"]', 'prabintiwari44@gmail.com');
    await page.fill('input[placeholder="Enter your password"]', 'prabin123');
    
    const [response] = await Promise.all([
        page.waitForNavigation({ waitUntil: "networkidle" }), 
        page.click('button[type="submit"]') 
    ]);
    
    await expect(page).toHaveURL('http://localhost:5173/');
});


test('User cannot sign in with invalid credentials', async ({ page }) => {
    await page.goto('http://localhost:5173/signin');
    
    await page.fill('input[placeholder="Enter your email"]', 'wronguser@example.com');
    await page.fill('input[placeholder="Enter your password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
});

test('User cannot sign in with empty fields', async ({ page }) => {
    await page.goto('http://localhost:5173/signin');

    await page.click('button[type="submit"]');

    const emailInput = page.locator('input[placeholder="Enter your email"]');
    await expect(emailInput).toBeFocused();

    await expect(emailInput).toHaveAttribute('required', '');
});


test('User can toggle password visibility', async ({ page }) => {
    await page.goto('http://localhost:5173/signin');
    
    await page.fill('input[placeholder="Enter your password"]', 'password');

    await page.click('span.cursor-pointer');

    const passwordInput = await page.locator('input[placeholder="Enter your password"]');
    await expect(passwordInput).toHaveAttribute('type', 'text'); 

    await page.click('span.cursor-pointer');
    await expect(passwordInput).toHaveAttribute('type', 'password'); 
});

 test('User can navigate to register page', async ({ page }) => {
    await page.goto('http://localhost:5173/signin');
    await page.click('text=Sign up');
    
    await expect(page).toHaveURL('http://localhost:5173/register');
});
