import {Locator, Page} from "@playwright/test";

class ProductDetailsPage {
    private readonly page: Page;
    private readonly itemCard: Locator
    private readonly reviewForm: Locator

    constructor(page: Page) {
        this.page = page;
        this.itemCard = this.page.locator(".product-information");
        this.reviewForm = this.page.locator("#review-form");
    }

    async getName(): Promise<string> {
        const name = await this.itemCard.locator("h2").textContent();
        if (!name) {
            throw new Error("Cant find a name");
        }
        return name;
    }

    async getPrice(): Promise<string> {
        const priceRaw = await this.itemCard.getByText("Rs").textContent();
        if (!priceRaw) {
            throw new Error("Cant find a price");
        }
        const price = priceRaw.slice(4);
        return price;
    }

    async getCategory(): Promise<string> {
        const categoryRaw = await this.itemCard.getByText("Category").textContent();
        if (!categoryRaw) {
            throw new Error("Cant find a name");
        }
        return categoryRaw
            .split(":")[1]
            .split(">")
            .map(category => category.trim())[0];
    }

    async getBrand(): Promise<string> {
        const brandRaw = await this.itemCard.getByText("Brand").textContent();

        if (!brandRaw) {
            throw new Error("Cant find a brand");
        }
        return brandRaw.split(":")[1].trim();
    }

    async getAvailability(): Promise<string> {
        const availabilityRaw = await this.itemCard
            .getByText("Availability").textContent();

        if (!availabilityRaw) {
            throw new Error("Cant find a brand");
        }
        return availabilityRaw.split(":")[1].trim();
    }

    async getCondition(): Promise<string> {
        const availabilityRaw = await this.itemCard
            .getByText("Condition").textContent();

        if (!availabilityRaw) {
            throw new Error("Cant find a brand");
        }
        return availabilityRaw.split(":")[1].trim();
    }

    async setQuantity(quantity: number): Promise<void> {
        await this.page.locator("#quantity").fill(quantity.toString());
    }

    async addToCart(): Promise<void> {
        await this.page.getByRole("button", {name: "Add to cart"}).click();
    }

    async addReview(name: string, email: string, review: string): Promise<void> {
        await this.reviewForm.getByRole("textbox", {name: "Your Name"}).fill(name)
        await this.reviewForm.getByRole("textbox", {name: "Email Address"}).fill(email)
        await this.reviewForm.getByRole("textbox", {name: "Add Review Here!"}).fill(review)
    }

    async getReviewSuccessMessage(): Promise<string> {
        const result = await this.reviewForm.locator(".alert-success.alert").textContent()
        if (!result) {
            throw new Error("Cant find a review message");
        }
        return result
    }
}