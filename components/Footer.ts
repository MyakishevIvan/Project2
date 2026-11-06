import {Locator, Page} from "@playwright/test";

export class Footer {
    private readonly page: Page;
    private readonly subscribeInput: Locator
    private readonly subscribeButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.subscribeInput = this.page.getByRole("textbox", {name: "Your email address"});
        this.subscribeButton = this.page.locator("#subscribe");
    }

    async subscribe(email: string): Promise<void> {
        await this.subscribeInput.fill(email);
        await this.subscribeButton.click();
    }
}