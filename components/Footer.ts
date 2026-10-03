import {Locator, Page} from "@playwright/test";

class Footer {
    private readonly page: Page;
    private readonly subscribeInput: Locator
    private readonly subscribeButton: Locator
    private readonly subscribeText: Locator

    constructor(page: Page) {
        this.page = page;
        this.subscribeInput = this.page.getByRole("textbox", {name: "Your email address"});
        this.subscribeButton = this.page.locator("#subscribe");
        this.subscribeText = this.page.locator("#success-subscribe");
    }

    async subscribe(email: string): Promise<void> {
        await this.subscribeInput.fill(email);
        await this.subscribeButton.click();
    }

    async getSubscribeMessage(): Promise<string | null> {
        return await this.subscribeText.textContent()
    }
}