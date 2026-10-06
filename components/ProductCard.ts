import {Locator} from "@playwright/test";

export class ProductCard {
    private readonly productCart: Locator
    private readonly textContainer: Locator

    constructor(productCart: Locator) {
        this.productCart = productCart;
        this.textContainer = this.productCart.locator(".productinfo.text-center")
    }

    async getName(): Promise<string> {
        const result = await this.textContainer.locator("p").textContent();
        if (!result) {
            throw new Error(`Could not find name`)
        }
        return result
    }

    async getPrice(): Promise<string> {
        const result =  await this.textContainer.locator("h2").textContent()
        if (!result) {
            throw new Error(`Could not find price`)
        }
        return result
    }

    async addToCart(): Promise<void> {
        await this.productCart.getByRole("link", {name: "Add to cart"}).click()
    }

    async openDetails(): Promise<void> {
        await this.productCart.getByRole("link", {name: "View Product"}).click()
    }
}