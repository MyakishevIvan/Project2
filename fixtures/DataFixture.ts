import {test as base} from "@playwright/test";
import {UserDataFactory} from "../factories/UserDataFactory";
import {ProductFactory} from "../factories/ProductFactory";
import {TestData} from "../types";

type DataFixture = {
    testData: TestData;
}

export const dataFixtures = base.extend<DataFixture>({
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