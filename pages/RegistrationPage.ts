import {Locator, Page} from "@playwright/test";
import {User} from "../types";
import {BasePage} from "./BasePage";
import routes from "../test-data/routes.json"


export class RegistrationPage extends BasePage{
    //account info
    private readonly mrButton: Locator
    private readonly mrsButton: Locator
    private readonly nameInput: Locator
    private readonly emailInput: Locator
    private readonly passwordInput: Locator
    private readonly dayBday: Locator
    private readonly monthBday: Locator
    private readonly yearBday: Locator
    //address info
    private readonly firstNameInput: Locator
    private readonly lastNameInput: Locator
    private readonly companyInput: Locator
    private readonly addressInput: Locator
    private readonly address2Input: Locator
    private readonly country: Locator
    private readonly stateInput: Locator
    private readonly cityInput: Locator
    private readonly zipCodeInput: Locator
    private readonly phoneInput: Locator
    private readonly registerButton: Locator
    private readonly successMessage: Locator
    private readonly continueButton: Locator


    constructor(page: Page) {
        super(page)
        this.page = page;
        this.mrButton = page.getByRole("radio", {name: "Mr"});
        this.mrsButton = page.getByRole("radio", {name: "Mrs"});
        this.nameInput = page.getByTestId("name");
        this.emailInput = page.getByTestId("email");
        this.passwordInput = page.getByTestId("password");
        this.dayBday = page.getByTestId("days");
        this.monthBday = page.getByTestId("months");
        this.yearBday = page.getByTestId("years");
        this.firstNameInput = page.getByTestId("first_name");
        this.lastNameInput = page.getByTestId("last_name");
        this.companyInput = page.getByTestId("company");
        this.addressInput = page.getByTestId("address");
        this.address2Input = page.getByTestId("address2");
        this.country = page.getByTestId("country");
        this.stateInput = page.getByTestId("state");
        this.cityInput = page.getByTestId("city");
        this.zipCodeInput = page.getByTestId("zipcode");
        this.phoneInput = page.getByTestId("mobile_number");
        this.registerButton = page.getByTestId("create-account");
        this.successMessage = page.getByTestId("account-created");
        this.continueButton = page.getByTestId("continue-button");
    }

    async open(): Promise<void> {
        await this.page.goto(routes.SIGNUP)
    }

    async registration(user: User) {
        await this.page.getByLabel(user.title, {exact: true}).click();
        await this.nameInput.fill(user.name)
        await this.passwordInput.fill(user.password)
        await this.dayBday.selectOption(user.date_of_birth.split(".")[0])
        await this.monthBday.selectOption(user.date_of_birth.split("."))
        await this.yearBday.selectOption(user.date_of_birth.split(".")[2])
        await this.firstNameInput.fill(user.first_name)
        await this.lastNameInput.fill(user.last_name)
        await this.companyInput.fill(user.company)
        await this.addressInput.fill(user.address)
        await this.address2Input.fill(user.address2)
        await this.stateInput.fill(user.state)
        await this.country.selectOption(user.country)
        await this.cityInput.fill(user.city)
        await this.zipCodeInput.fill(user.zipcode)
        await this.phoneInput.fill(user.mobile_number)
        await this.registerButton.click()
    }

    async isRegistered(): Promise<boolean> {
        return await this.successMessage.isVisible()
    }

    async continueButtonClick(): Promise<void> {
        await this.continueButton.click()
    }
}