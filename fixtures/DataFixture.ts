import {test as base} from "@playwright/test";
import {UserDataFactory} from "../factories/UserDataFactory";
import {ProductFactory} from "../factories/ProductFactory";
import {TestData} from "../types";

type DataFixture = {
    testData: TestData;
    userFactory: UserDataFactory;
    productFactory: ProductFactory;
}

export const dataFixtures = base.extend<DataFixture>({
    userFactory: async ({}, use) => {
        await use(new UserDataFactory());
    },
    productFactory: async ({}, use) => {
        await use(new ProductFactory());
    },
    testData: async ({}, use) => {
        const userDataFactory = new UserDataFactory();
        const productFactory = new ProductFactory();
        const testData: TestData = {
            verifiedUser: userDataFactory.createVerifiedUser(),
            invalidUser: userDataFactory.createInvalidUser(),
            validUser: userDataFactory.createValidUser(),
            paymentCard: userDataFactory.createPaymentCard(),
            product: productFactory.create(),
        }
        await use(testData)
    },
});