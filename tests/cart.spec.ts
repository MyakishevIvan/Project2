import { test, expect } from "../fixtures";

test("successfully manage multiple products in cart", async ({productsPage, cartPage}) => {
    await productsPage.open()
    const productCards = await productsPage.getProducts();
    const fistProduct = productCards[0];
    const secondProduct = productCards[1];
    const firstName = await fistProduct.getName();
    const secondName = await secondProduct.getName();
    await fistProduct.addToCart()
    await productsPage.continueShoppingClick()
    await secondProduct.addToCart()
    await productsPage.continueShoppingClick()
    await cartPage.open()
    const firstItem = await cartPage.getItemByName(firstName);
    const secondItem = await cartPage.getItemByName(secondName);
    await expect(firstItem).toBeVisible();
    await expect(secondItem).toBeVisible();
    await cartPage.removeItem(firstName);
    await cartPage.removeItem(secondName);
    const isCartEmpty = await cartPage.isEmpty();
    expect(isCartEmpty).toBeTruthy();
});