import {Locator} from "@playwright/test";

export class ProductCard {
    private readonly productCart: Locator
    private readonly textContainer: Locator

    constructor(productCart: Locator) {
        this.productCart = productCart;
        this.textContainer = this.productCart.locator(".productinfo.text-center")
    }

    async gemName(): Promise<string | null> {
        return await this.textContainer.locator("p").textContent()
    }

    async getPrice(): Promise<string | null> {
        return await this.textContainer.locator("h2").textContent()
    }

    async addToCart(): Promise<void> {
        await this.productCart.getByRole("link", {name: "Add to cart"}).click()
    }

    async openDetails(): Promise<void> {
        await this.productCart.getByRole("link", {name: "View Product"}).click()
    }
}