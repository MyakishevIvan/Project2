import {
    CartPage,
    CheckoutPage,
    HomePage,
    LoginPage,
    ProductDetailsPage,
    ProductsPage,
    RegistrationPage
} from "../pages";

import { test as base } from "@playwright/test";
import { UserFactory } from "../factories/UserFactory";
import { ProductFactory } from "../factories/ProductFactory";

type UiFixtures = {
    homePage: HomePage;
    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    registrationPage: RegistrationPage;
    productDetailsPage: ProductDetailsPage;
    userFactory: UserFactory;
    productFactory: ProductFactory;
}

export const uiFixtures = base.extend<UiFixtures>({
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
    },

    userFactory: async ({}, use) => {
        await use(new UserFactory());
    },

    productFactory: async ({}, use) => {
        await use(new ProductFactory());
    }
});