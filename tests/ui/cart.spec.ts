import { test, expect } from "../../fixtures";

test("successfully manage multiple products in cart", async ({addProduct, cartPage}) => {

    await test.step("Verify added products", async () => {
        await cartPage.open()

        for (const productInfo of addProduct) {
            const item = await cartPage.getItemByName(productInfo.name);
            await expect(item).toBeVisible();
        }
    })
    await test.step("Remove products from cart", async () => {
        for (const productInfo of addProduct) {
            await cartPage.removeItem(productInfo.name);
        }
    })
    await test.step("Verify cart is empty", async () => {
        const isCartEmpty = await cartPage.isEmpty();
        expect(isCartEmpty).toBeTruthy();
    })
});