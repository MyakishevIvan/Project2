import {Locator} from "@playwright/test";

export class ProductCard {
    private readonly productCart: Locator
    private readonly textContainer: Locator

    constructor(productCart: Locator) {
        this.productCart = productCart;
        this.textContainer = this.productCart.locator(".productinfo.text-center")
    }

    async getName(): Promise<string> {
        const result = await this.textContainer.locator("p").innerText();
        return result.trim()
    }

    async getPrice(): Promise<string> {
        const result =  await this.textContainer.locator("h2").innerText()
        return result
    }

    async addToCart(): Promise<void> {
        await this.textContainer.locator("h2").hover()
        await this.productCart.locator('.product-overlay .add-to-cart').click();
    }

    async openDetails(): Promise<void> {
        await this.productCart.getByRole("link", {name: "View Product"}).click()
    }
}