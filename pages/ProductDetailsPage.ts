import {Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";
import routes from "../test-data/routes.json"


export class ProductDetailsPage extends BasePage {
    private readonly itemCard: Locator
    private readonly reviewForm: Locator
    private readonly successPanel: Locator;
    private readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.itemCard = this.page.locator(".product-information");
        this.reviewForm = this.page.locator("#review-form");
        this.successPanel = this.page.locator(".modal-content")
        this.submitButton = this.page.locator("#button-review")

    }

    async open(productId?: number): Promise<void> {
        if (productId === undefined) {
            throw new Error('Product ID is required');
        }

        await this.page.goto(routes.PRODUCT_DETAILS + `${productId}`);
    }

    async getCategories(): Promise<{ category: string, subcategory: string }> {
        const categoryRaw = await this.itemCard.getByText("Category").first().innerText();
        const [category, subcategory] = categoryRaw
            .split(":")[1]
            .split(">")
            .map(category => category.trim());
        return {category, subcategory};
    }

    async getBrand(): Promise<string> {
        const brandRaw = await this.itemCard.getByText("Brand").locator("..").innerText();
        return brandRaw.split(":")[1].trim();
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
        await this.submitButton.click();
    }

    async isReviewSuccessPanelVisible(): Promise<boolean> {
        return await this.reviewForm.locator(".alert-success.alert").isVisible()
    }

    async hasSucceededCartPanel(): Promise<boolean> {
        return await this.successPanel.isVisible()
    }
}