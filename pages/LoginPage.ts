import {Locator, Page} from "@playwright/test";
import {BasePage} from "./BasePage";
import routes from "../test-data/routes.json"


export class LoginPage extends BasePage {
    private readonly emailInputLogin: Locator
    private readonly passwordInputLogin: Locator
    private readonly emailInputRegister: Locator
    private readonly nameInputRegister: Locator
    private readonly loginButton: Locator
    private readonly signupButton: Locator
    private readonly loginForm: Locator
    private readonly signupForm: Locator

    constructor(page: Page) {
        super(page);
        this.emailInputLogin = this.page.getByTestId("login-email");
        this.passwordInputLogin = this.page.getByTestId("login-password");
        this.emailInputRegister = this.page.getByTestId("signup-email");
        this.nameInputRegister = this.page.getByTestId("signup-name");
        this.loginForm = this.page.locator(".login-form");
        this.signupForm = this.page.locator(".signup-form");
        this.loginButton = this.page.getByTestId("login-button");
        this.signupButton = this.page.getByTestId("signup-button");
    }

    async open(): Promise<void> {
        await this.page.goto(routes.LOGIN)
    }

    async login(email: string, password: string): Promise<void> {
        await this.emailInputLogin.fill(email);
        await this.passwordInputLogin.fill(password)
        await this.loginButton.click()
    }

    async register(name: string, email: string): Promise<void> {
        await this.nameInputRegister.fill(name);
        await this.emailInputRegister.fill(email);
        await this.signupButton.click()
    }

    async getLoginError(): Promise<string> {
        return await this.loginForm.locator("p").innerText()
    }

    async isLoginFormVisible(): Promise<boolean> {
        return await this.loginForm.isVisible()
    }

    async isSignupFormVisible(): Promise<boolean> {
        return await this.signupForm.isVisible()
    }

}