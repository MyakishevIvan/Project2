import {AccountApi, ApiClient, BrandsApi, ProductsApi} from "../api";
import {test as base} from "@playwright/test"


type ApiFixtures = {
    productsApi: ProductsApi;
    apiClient: ApiClient;
    brandsApi: BrandsApi;
    accountApi: AccountApi;
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
        }
    }
)
