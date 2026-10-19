import {AccountApi, ApiClient, BrandsApi, ProductsApi} from "../api";
import {expect, test as base} from "@playwright/test"
import {User} from "../types";
import {UserFactory} from "../data/UserFactory";


type ApiFixtures = {
    productsApi: ProductsApi;
    apiClient: ApiClient;
    brandsApi: BrandsApi;
    accountApi: AccountApi;
    registeredUser: User;
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
        registeredUser: async ({accountApi}, use) => {
            const userFactory = new UserFactory();
            const user = userFactory.create();
            const response = await accountApi.register(user);
            expect(response.status()).toBe(200);
            await use(user)
        },
    }
)
