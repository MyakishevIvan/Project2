import {BaseProduct} from "../types/BaseProduct";
import {UserData} from "../types/UserData";
import {uiFixtures} from "./UiFixture";


type ScenarioFixtures = {
    login: UserData;
    addProduct: BaseProduct[];
};

export const scenarioFixtures = uiFixtures.extend<ScenarioFixtures>({
    login: async ({loginPage, testData}, use) => {
        await loginPage.open();
        await loginPage.login(
            testData.verifiedUser.email,
            testData.verifiedUser.password
        );
        await use(testData.verifiedUser);
    },
    addProduct: async ({productsPage}, use) => {
        await productsPage.open()
        const productCards = await productsPage.getProducts();
        const productsInfo: BaseProduct[] = [];

        for (const product of productCards.slice(0, 2)) {
            productsInfo.push(await product.getProductInfo());
            await product.addToCart();
            await productsPage.continueShoppingClick();
        }

        await use(productsInfo);
    }
});

scenarioFixtures.beforeEach(async ({ context }) => {
    await context.route(
        /doubleclick\.net|googlesyndication\.com/,
        route => route.abort()
    );

});