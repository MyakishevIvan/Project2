import {Footer} from "../components/Footer";
import {Header} from "../components/Header";
import {Page} from "@playwright/test";

export class HomePage {
    private readonly footer: Footer
    private readonly header: Header
    private readonly page: Page

    constructor(page: Page) {
        this.page = page;
        this.footer = new Footer(page);
        this.header = new Header(page);
    }

    async open(): Promise<void> {
        await this.header.openHome()
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