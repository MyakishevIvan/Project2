import {mergeTests} from "@playwright/test";

import {apiFixtures} from "./ApiFixture";
import {uiFixtures} from "./UiFixture";
import {ProductInfo} from "../types/ProductInfo";
import {VerifiedUser} from "../types/VerifiedUser";

const base = mergeTests(apiFixtures, uiFixtures);

type ScenarioFixtures = {
    login: VerifiedUser;
    addProduct: ProductInfo[]
};

export const test = base.extend<ScenarioFixtures>({
    login: async ({loginPage, userFactory}, use) => {
        const userCredentials = userFactory.getVerifiedUser();
        await loginPage.open();
        await loginPage.login(
            userCredentials.email,
            userCredentials.password
        );
        await use(userCredentials);
    },
    addProduct: async ({productsPage}, use) => {
        await productsPage.open()
        const productCards = await productsPage.getProducts();
        const productsInfo: ProductInfo[] = [];

        for (const product of productCards.slice(0, 2)) {
            productsInfo.push(await product.getProductInfo());
            await product.addToCart();
            await productsPage.continueShoppingClick();
        }

        await use(productsInfo);
    }

});

test.beforeEach(async ({context}) => {
    await context.route(
        /doubleclick\.net|googlesyndication\.com/,
        route => route.abort()
    );
});