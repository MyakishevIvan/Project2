import {ProductCard} from "../components/ProductCard";
import {Locator, Page} from "@playwright/test";
import routes from "../test-data/routes.json"
import {BasePage} from "./BasePage";
import {toTitleCase} from "../utils/utils";


export class ProductsPage extends BasePage {
    private readonly searchInput: Locator
    private readonly productElements: Locator
    private readonly searchButton: Locator
    private readonly categories: Locator
    private readonly categoryPanel: Locator
    private readonly successPanel: Locator

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.searchInput = this.page.getByRole("textbox", {name: "Search Product"});
        this.productElements = this.page.locator(".product-image-wrapper")
        this.searchButton = this.page.locator("#submit_search");
        this.categories = this.page.locator(".panel-title")
        this.categoryPanel = this.page.locator("#accordian")
        this.successPanel = this.page.locator(".modal-content")
    }

    async open(): Promise<void> {
        await this.page.goto(routes.PRODUCTS)
    }

    async getAllCategories(): Promise<string[]> {
        const elements = await this.categories.all();
        const result = await Promise.all(elements.map(el => el.innerText()))
        return result.map(toTitleCase)
    }

    async getAllSubcategory(category: string): Promise<string[]> {
        const elements = await this.page.locator(`#${category} li a`).all();
        const result = await Promise.all(elements.map(el => el.innerText()));
        return result.map(toTitleCase)
    }

    async search(productName: string): Promise<void> {
        await this.searchInput.fill(productName);
        await this.searchButton.click();
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

    async openCategory(category: string): Promise<void> {
        await this.categoryPanel.getByText(category).click()
    }

    async openSubcategory(category: string, subcategory: string): Promise<void> {
        await this.page.locator(`#${category} li`)
            .getByText(subcategory, {exact: true})
            .click();
    }

    async openBrand(brand: string): Promise<void> {
        await this.page.getByText(brand).click()
    }

    async hasSucceededCartPanel(): Promise<boolean> {
        return await this.successPanel.isVisible()
    }

    async hasSearchResults(): Promise<boolean> {
        return (await this.getProductsCount()) > 0;
    }

}