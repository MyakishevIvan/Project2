import {Download, Locator, Page} from "@playwright/test";
import {CardDetails} from "../components/CardDetails";
import {BasePage} from "./BasePage";
import routes from "../test-data/routes.json"
import {PaymentCard} from "../types";


export class CheckoutPage extends BasePage {
    private readonly items: Locator;
    private readonly address: Locator;
    private readonly totalPrices: Locator
    private readonly textForm: Locator
    private readonly placeButton: Locator
    private readonly payButton: Locator;
    private readonly invoiceButton: Locator;
    private readonly successMessage: Locator;
    private readonly cardDetails: CardDetails;
    private readonly country: Locator;

    constructor(page: Page) {
        super(page);
        this.items = this.page.locator("#cart_info tbody tr")
        this.address = this.page.locator("#address_delivery .address_address1")
        this.totalPrices = this.page.locator(".cart_total_price")
        this.textForm = this.page.locator(".form-control")
        this.placeButton = this.page.locator("a.check_out")
        this.payButton = this.page.getByTestId("pay-button")
        this.invoiceButton = this.page.getByRole("link", {name: "Download Invoice"})
        this.successMessage = this.page.getByTestId("order-placed")
        this.country = this.page.locator("#address_delivery .address_country_name")
        this.cardDetails = new CardDetails(page)
    }

    async open(): Promise<void> {
        await this.page.goto(routes.CHECKOUT);
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

    async getCountry(): Promise<string> {
        return await this.country.innerText()
    }

    async getOrderByName(name: string): Promise<Locator> {
        for (const item of await this.items.all()) {
            const orderName = await item.locator(".cart_description a").textContent();
            if (orderName?.trim() === name) {
                return item;
            }
        }
        throw new Error("Could not find item with name " + name)
    }

    async getOrderTotalPrice(): Promise<number> {
        const price = await this.totalPrices.last().innerText()
        return Number(price.split(".")[1].trim())
    }

    async enterComment(comment: string): Promise<void> {
        await this.textForm.fill(comment);
    }

    async placeOrder(): Promise<void> {
        await this.placeButton.click();
    }

    async fillPaymentDetails(card: PaymentCard): Promise<void> {
        await this.cardDetails.fillPaymentDetails(
            card.cardName,
            card.cardNumber,
            card.cvv,
            card.expirationMonth,
            card.expirationYear
        );
    }

    async payAndConfirm(): Promise<void> {
        await this.payButton.click();
    }

    async isPurchaseSuccessful(): Promise<boolean> {
        return await this.successMessage.isVisible();
    }

    async downloadInvoice(): Promise<Download> {
        const downloadPromise = this.page.waitForEvent("download");
        await this.invoiceButton.click()
        return await downloadPromise;
    }
}