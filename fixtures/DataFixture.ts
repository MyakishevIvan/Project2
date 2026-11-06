import {test as base} from "@playwright/test";
import {UserDataFactory} from "../factories/UserDataFactory";
import {ProductFactory} from "../factories/ProductFactory";
import {TestData} from "../types";

type DataFixture = {
    userFactory: UserDataFactory;
    productFactory: ProductFactory;
    testData: TestData;
}

export const dataFixtures = base.extend<DataFixture>({
    userFactory: async ({}, use) => {
        await use(new UserDataFactory());
    },
    productFactory: async ({}, use) => {
        await use(new ProductFactory());
    },
    testData: async ({userFactory, productFactory}, use) => {
        const testData: TestData = {
            verifiedUser: userFactory.createVerifiedUser(),
            invalidUser: userFactory.createInvalidUser(),
            validUser: userFactory.createValidUser(),
            paymentCard: userFactory.createPaymentCard(),
            product: productFactory.create(),
        }
        await use(testData)
    },
});