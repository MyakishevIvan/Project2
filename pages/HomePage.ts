import {Footer} from "../components/Footer";
import {Header} from "../components/Header";
import {Page} from "@playwright/test";
import {BasePage} from "./BasePage";
import routes from "../test-data/routes.json"

export class HomePage extends BasePage {
    readonly footer: Footer
    readonly header: Header

    constructor(page: Page) {
        super(page);
        this.footer = new Footer(page);
        this.header = new Header(page);
    }

    async open(): Promise<void> {
        await this.page.goto(routes.HOME);
    }

    async subscribe(email: string): Promise<void> {
        await this.footer.subscribe(email)
    }

    async openProducts(): Promise<void> {
        await this.header.openProducts()
    }

    async openLogin(): Promise<void> {
        await this.header.openLogin()
    }
}