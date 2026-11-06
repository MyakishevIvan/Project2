import {
    CartPage,
    CheckoutPage,
    HomePage,
    LoginPage,
    ProductDetailsPage,
    ProductsPage,
    RegistrationPage
} from "../pages";

import { UserDataFactory } from "../factories/UserDataFactory";
import { ProductFactory } from "../factories/ProductFactory";
import {apiFixtures} from "./ApiFixture";

type UiFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    registrationPage: RegistrationPage;
    productDetailsPage: ProductDetailsPage;
}

export const uiFixtures = apiFixtures.extend<UiFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    homePage: async ({ page }, use) => {
        await use(new HomePage(page));
    },

    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },

    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },

    productsPage: async ({ page }, use) => {
        await use(new ProductsPage(page));
    },

    registrationPage: async ({ page }, use) => {
        await use(new RegistrationPage(page));
    },

    productDetailsPage: async ({ page }, use) => {
        await use(new ProductDetailsPage(page));
    }
});