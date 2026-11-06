import {Locator, Page} from "@playwright/test";

export class Header {
    private readonly productsButton: Locator
    private readonly loginButton: Locator
    private readonly loggedInUser: Locator
    private readonly loggedInUsername: Locator
    private readonly logoutButton: Locator
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
        this.productsButton = this.page.getByRole("link", {name: "Products"});
        this.loginButton = this.page.getByRole("link", {name: "Login"});
        this.loggedInUser = this.page.locator("#header").getByText("Logged in as")
        this.loggedInUsername = this.loggedInUser.locator('b');
        this.logoutButton = this.page.getByRole("link", {name: "Logout"});
    }

    async openProducts(): Promise<void> {
        await this.productsButton.click()
    }

    async openLogin(): Promise<void> {
        await this.loginButton.click()
    }

    async isUserLoggedIn(): Promise<boolean> {
        return await this.loggedInUser.isVisible();
    }

    async isLoggedInAs(username: string): Promise<boolean> {
        if (!await this.isUserLoggedIn()) {
            throw new Error(`User not logged`);
        }

        return await this.getLoggedInUsername() === username;
    }

    async getLoggedInUsername(): Promise<string> {
        return this.loggedInUsername.innerText()
    }

    async logout(): Promise<void> {
        await this.logoutButton.click()
    }
}