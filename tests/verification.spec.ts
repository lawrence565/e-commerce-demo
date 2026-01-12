import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5173/#';

test.describe('System Health Verification', () => {
    test('Homepage loads', async ({ page }) => {
        await page.goto(BASE_URL + '/');
        await expect(page).toHaveTitle(/文創電商/i); // Adjusted based on actual title
        // Check for some main element
        await expect(page.locator('body')).toBeVisible();
    });

    test('Product page loads without crashing', async ({ page }) => {
        // Navigate to a likely valid product.
        // App.tsx uses stores/:category/:itemId
        const productUrl = `${BASE_URL}/stores/gadget/2`;
        await page.goto(productUrl);

        // Check if the product details are visible
        // "商品簡介" is hardcoded in Product.tsx
        await expect(page.getByText('商品簡介')).toBeVisible();

        // Check price is displayed
        await expect(page.locator('text=$')).toBeVisible();
    });

    test('FinishOrder page loads', async ({ page }) => {
        // App.tsx uses finishOrder
        await page.goto(`${BASE_URL}/finishOrder`);
        // "訂單成立" is hardcoded in FinishOrder.tsx
        await expect(page.getByText('訂單成立')).toBeVisible();
    });
});
