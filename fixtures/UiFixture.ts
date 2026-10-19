import {
    CartPage,
    CheckoutPage,
    HomePage,
    LoginPage,
    ProductsPage,
    RegistrationPage
} from "../pages";
import {test as base} from "@playwright/test"


type UiFixtures = {
    homePage : HomePage;
    loginPage: LoginPage;
    productsPage: ProductsPage;
    cartPage : CartPage;
    checkoutPage : CheckoutPage;
    registrationPage : RegistrationPage;
}

export const uiFixtures = base.extend<UiFixtures>(
    {
        loginPage: async ({page}, use) => {
            const loginPage = new LoginPage(page);
            await use(loginPage);
        },
        homePage: async ({page}, use) => {
            const homePage = new HomePage(page);
            await use(homePage);
        },
        checkoutPage: async ({page}, use) => {
            const checkoutPage = new CheckoutPage(page);
            await use(checkoutPage);
        },
        cartPage: async ({page}, use) => {
            const cartPage = new CartPage(page);
            await use(cartPage);
        },
        productsPage: async ({page}, use) => {
            const productsPage = new ProductsPage(page);
            await use(productsPage);
        },
        registrationPage: async ({page}, use) => {
            const registrationPage = new RegistrationPage(page);
            await use(registrationPage);
        }
    }
)
