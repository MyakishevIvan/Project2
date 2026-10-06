import {ProductCard} from "../components/ProductCard";
import {Locator, Page} from "@playwright/test";

class ProductsPage {
    private readonly page: Page;
    private readonly searchInput: Locator
    private readonly productElements: Locator


    constructor(page: Page) {
        this.page = page;
        this.searchInput = this.page.getByRole("textbox", {name: "Search Product"});
        this.productElements = this.page.locator(".col-sm-4")
    }

    async search(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
    }

    async getProducts(): Promise<ProductCard[]> {
        const elements = await this.productElements.all();
        const productCards = elements.map(element => new ProductCard(element));
        return productCards;
    }

    async getProductNames(): Promise<string[]> {

    }

    async getProductByName(name: string): Promise<ProductCard> {

    }

    async getProductsCount(): Promise<number> {
    }

    async openProduct(name: string): Promise<void> {

    }

    async addProductToCart(name: string): Promise<void> {

    }

    async openCategory(category: string): Promise<void> {

    }

    async openBrand(brand: string): Promise<void> {

    }

    async isSearchResultVisible(): Promise<boolean> {
    }
}