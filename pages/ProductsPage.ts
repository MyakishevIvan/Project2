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
        const products = await this.getProducts();
        return await Promise.all(
            products.map(product => product.getName())
        )
    }

    async getProductByName(name: string): Promise<ProductCard> {
        const products = await this.getProducts();
        for (const product of products) {
            const currentName = await product.getName();
            if (currentName === name) {
                return product;
            }
        }

        throw new Error(`Could not find a product with name ${name}`);
    }

    async getProductsCount(): Promise<number> {
        const products = await this.getProducts();
        return products.length;
    }

    async openProduct(name: string): Promise<void> {
        const product = await this.getProductByName(name);
        await product.openDetails()
    }

    async addProductToCart(name: string): Promise<void> {
        const product = await this.getProductByName(name);
        await product.addToCart()

    }

    async openCategory(category: string, subCategory: string): Promise<void> {
        await this.page.getByText(category).click()
        await this.page.getByText(subCategory).click()
    }

    async openBrand(brand: string): Promise<void> {
        await this.page.getByText(brand).click()
    }

    async hasSearchResults(): Promise<boolean> {
        return (await this.getProductsCount()) > 0;
    }
}