import {Locator, Page} from "@playwright/test";
import {Footer} from "../components/Footer";

export class CartPage {
    private readonly footer: Footer;
    private readonly cartElements;
    private page: Page;

    constructor(page: Page) {
        this.page = page;
        this.footer = new Footer(page);
        this.cartElements = page.locator("#cart_info_table tbody tr")
    }

    async getItems(): Promise<Locator[]> {
        return await this.cartElements.all()
    }

    async getItemNames(): Promise<string[]> {
        let itemNames: string[] = [];
        for (const item of await this.getItems()) {
            const name = await item.locator(".cart_description a").textContent();
            if (name === null) {
                throw new Error("Could not find name for item " + item);
            }
            itemNames.push(name)
        }
        return itemNames;
    }

    private async getItemByName(name: string): Promise<Locator> {
        for (const item of await this.getItems()) {
            const itemName = await item.locator(".cart_description a").textContent();
            if (itemName?.trim() === name) {
                return item;
            }
        }
        throw new Error("Could not find item with name " + name)
    }

    async getItemQuantity(name: string): Promise<number> {
        const item = await this.getItemByName(name);
        const quantity = await item.locator(".cart_quantity").textContent()
        if (quantity === null) {
            throw new Error("Could not find quantity for item " + name)
        }
        return Number(quantity)
    }

    async getItemPrice(name: string): Promise<number> {
        const item = await this.getItemByName(name);
        const priceString = await item.locator(".cart_price").textContent()
        if (priceString === null) {
            throw new Error("Could not find price for item " + name)
        }
        return Number(priceString.replace(/\D/g, ""))
    }

    async getItemTotal(name: string): Promise<number> {
        const item = await this.getItemByName(name);
        const totalString = await item.locator(".cart_total_price").textContent()
        if (totalString === null) {
            throw new Error("Could not find total price for item " + name)
        }
        return Number(totalString.replace(/\D/g, ""))
    }

    async getCartTotal(): Promise<number> {
        let cartTotal: number = 0
        for (const itemName of await this.getItemNames()) {
            const itemTotal = await this.getItemTotal(itemName);
            cartTotal += itemTotal
        }
        return cartTotal;
    }

    async removeItem(name: string): Promise<void> {
        const item = await this.getItemByName(name);
        await item.locator(".cart_quantity_delete").click()
    }

    async proceedToCheckout(): Promise<void> {
        await this.page.getByRole("link", { name: "Proceed To Checkout" }).click();
    }

    async isEmpty(): Promise<boolean> {
        return (await this.getItems()).length !==0
    }

    async subscribe(email: string): Promise<void> {
        await this.footer.subscribe(email)
    }
}