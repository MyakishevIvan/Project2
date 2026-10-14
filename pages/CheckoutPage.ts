import {Download, Locator, Page} from "@playwright/test";
import {CardDetails} from "../components/CardDetails";

export class CheckoutPage {
    private readonly page: Page;
    private readonly items: Locator;
    private readonly address: Locator;
    private readonly billingAddress: Locator;
    private readonly totalPrices: Locator
    private readonly textForm: Locator
    private readonly placeButton: Locator
    private readonly payButton: Locator;
    private readonly invoiceButton: Locator;
    private readonly successMessage: Locator;
    private readonly cardDetails: CardDetails;

    constructor(page: Page) {
        this.page = page;
        this.items = page.locator("#cart_info tbody tr")
        this.address = page.locator("#address_delivery .address_address1")
        this.billingAddress = page.locator("#address_invoice .address_address1")
        this.totalPrices = page.locator(".cart_total_price")
        this.textForm = this.page.locator(".form-control")
        this.placeButton = this.page.getByRole("button", {name: "Place Order"})
        this.payButton = this.page.getByTestId("pay-button")
        this.invoiceButton = this.page.getByRole("link", {name: "Download Invoice"})
        this.successMessage = this.page.locator("#success_message")
        this.cardDetails = new CardDetails(page)
    }

    async isAddressVisible(): Promise<boolean> {
        const locators = await this.address.all();
        if (locators.length === 0) {
            return false;
        }

        for (const locator of locators) {
            const text = await locator.innerText();
            if (!text.trim()) {
                return false;
            }
        }
        return true;
    }

    async getDeliveryAddress(): Promise<string> {
        const locators = await this.address.all();
        const result: string[] = [];

        for (const locator of locators) {
            const text = await locator.innerText();
            result.push(text.trim());
        }
        return result.join("\r\n");
    }

    async getBillingAddress(): Promise<string> {
        const locators = await this.billingAddress.all();
        const result: string[] = [];

        for (const locator of locators) {
            const text = await locator.innerText();
            result.push(text.trim());
        }
        return result.join("\r\n");

    }

    async getOrderItems(): Promise<Locator[]> {
        return await this.items.all();
    }

    async getOrderTotal(): Promise<number> {
        const price = await this.totalPrices.last().innerText()
        return Number(price.trim())
    }

    async enterComment(comment: string): Promise<void> {
        await this.textForm.fill(comment);
    }

    async placeOrder(): Promise<void> {
        await this.placeButton.click();
    }

    async fillPaymentDetails(
        name: string,
        cardNumber: string,
        cvc: string,
        month: string,
        year: string): Promise<void> {

        await this.cardDetails.fillPaymentDetails(name,
            cardNumber,
            cvc,
            month,
            year
        );
    }

    async payAndConfirm(): Promise<void> {
        await this.payButton.click();
    }

    async getOrderSuccessMessage(): Promise<string> {
        await this.successMessage.waitFor({state: "visible"});
        return await this.successMessage.innerText();
    }

    async downloadInvoice(): Promise<Download> {
        const downloadPromise = this.page.waitForEvent("download");
        await this.invoiceButton.click()
        return await downloadPromise;
    }
}