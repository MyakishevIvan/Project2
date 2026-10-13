import {Locator, Page} from "@playwright/test";

export class CardDetails {
    private readonly page: Page;
    private readonly name: Locator;
    private readonly number: Locator;
    private readonly cvc: Locator;
    private readonly expirationMonth: Locator;
    private readonly expirationYear: Locator;

    constructor(page: Page) {
        this.page = page;
        this.name = page.getByTestId("name-on-card");
        this.number = page.getByTestId("card-number");
        this.cvc = page.getByTestId("cvc");
        this.expirationMonth = page.getByTestId("expiry-month");
        this.expirationYear = page.getByTestId("expiry-year");
    }

    async fillPaymentDetails(
        name: string,
        cardNumber: string,
        cvc: string,
        month: string,
        year: string): Promise<void> {

        await this.name.fill(name)
        await this.number.fill(cardNumber)
        await this.cvc.fill(cvc)
        await this.expirationMonth.fill(month)
        await this.expirationYear.fill(year)
    }

}