import {AccountApi, ApiClient, BrandsApi, ProductsApi} from "../api";
import {expect, test as base} from "@playwright/test"
import {User} from "../types";
import {UserFactory} from "../factories/UserFactory";
import {ProductFactory} from "../factories/ProductFactory";


type ApiFixtures = {
    productsApi: ProductsApi;
    apiClient: ApiClient;
    brandsApi: BrandsApi;
    accountApi: AccountApi;
    userFactory: UserFactory;
    productFactory: ProductFactory;
    registeredUser: User;
    failedUser: User;
}

export const apiFixtures = base.extend<ApiFixtures>(
    {
        apiClient: async ({request}, use) => {
            await use(new ApiClient(request));
        },
        brandsApi: async ({apiClient}, use) => {
            await use(new BrandsApi(apiClient));
        },
        productsApi: async ({apiClient}, use) => {
            await use(new ProductsApi(apiClient));
        },
        accountApi: async ({apiClient}, use) => {
            await use(new AccountApi(apiClient));
        },
        userFactory: async ({}, use) => {
            await use(new UserFactory());
        },
        productFactory: async ({}, use) => {
            await use(new ProductFactory());
        },
        failedUser: async ({userFactory}, use) => {
            const user = userFactory.createInvalidUser();
            await use(user)
        },
        registeredUser: async ({accountApi, userFactory}, use) => {
            const user = userFactory.create();
            const response = await accountApi.register(user);
            expect(response.status()).toBe(200);
            await use(user)
        },
    }
)
