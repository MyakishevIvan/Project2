import {Locator, Page} from "@playwright/test";

class LoginPage {
    private readonly emailInputLogin: Locator
    private readonly passwordInputLogin: Locator
    private readonly emailInputRegister: Locator
    private readonly nameInputRegister: Locator
    private readonly loginForm: Locator
    private readonly signupForm: Locator
    private readonly page: Page

    constructor(page: Page) {
        this.page = page
        this.emailInputLogin = this.page.getByTestId("login-email");
        this.passwordInputLogin = this.page.getByTestId("login-password");
        this.emailInputRegister = this.page.getByTestId("signup-name");
        this.nameInputRegister = this.page.getByTestId("signup-email");
        this.loginForm = this.page.locator(".login-form");
        this.signupForm = this.page.locator(".signup-form");
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInputLogin.fill(email);
        await this.passwordInputLogin.fill(password)
    }

    async register(name: string, email: string): Promise<void> {
        await this.nameInputRegister.fill(name);
        await this.emailInputRegister.fill(email);
    }

    async getLoginError(): Promise<string| null> {
        return await this.loginForm.locator("p").textContent()
    }

    async isLoginFormVisible(): Promise<boolean> {
        return await this.loginForm.isVisible()
    }

    async isSignupFormVisible(): Promise<boolean> {
        return await this.signupForm.isVisible()
    }
}