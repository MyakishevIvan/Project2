import {Locator, Page} from "@playwright/test";

export class Header {
    private readonly homeButton: Locator
    private readonly productsButton: Locator
    private readonly cartButton: Locator
    private readonly loginButton: Locator
    private readonly loggedInUser: Locator
    private readonly loggedInUsername: Locator
    private readonly logoutButton: Locator
    private readonly page: Page


    constructor(page: Page) {
        this.page = page
        this.homeButton = this.page.getByRole("link", { name: "home" });
        this.productsButton = this.page.getByRole("link", { name: "Products" });
        this.cartButton = this.page.getByRole("link", { name: "Cart" });
        this.loginButton = this.page.getByRole("link", { name: "Login" });
        this.loggedInUser = this.page.getByRole("link", { name: "Logged in as " });
        this.loggedInUsername = this.loggedInUser.locator('b');
        this.logoutButton = this.page.getByRole("link", { name: "Logout" });
    }

    async openHome(): Promise<void> {
        await this.homeButton.click()
    }

    async openProducts(): Promise<void> {
        await this.productsButton.click()
    }

    async openCart(): Promise<void> {
        await this.cartButton.click()
    }

    async openLogin(): Promise<void> {
        await this.loginButton.click()
    }

    async isUserLoggedIn():Promise<boolean> {
        return this.loggedInUser.isVisible();
    }

    async getLoggedInUsername(): Promise<string| null> {
        return this.loggedInUsername.textContent()
    }

    async logout(): Promise<void> {
        await this.logoutButton.click()
    }
}