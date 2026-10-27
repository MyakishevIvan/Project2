import {Page} from "@playwright/test";

export abstract class BasePage {

    constructor(protected page: Page) {
    }

    abstract open(param?: string | number): Promise<void>;

    async refresh(): Promise<void> {
        await this.page.reload();
    }

}