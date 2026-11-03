import { AccountApi, ApiClient, BrandsApi, ProductsApi } from "../api";
import {dataFixtures} from "./DataFixture";

type ApiFixtures = {
    productsApi: ProductsApi;
    apiClient: ApiClient;
    brandsApi: BrandsApi;
    accountApi: AccountApi;
}

export const apiFixtures = dataFixtures.extend<ApiFixtures>({
    apiClient: async ({ request }, use) => {
        await use(new ApiClient(request));
    },
    brandsApi: async ({ apiClient }, use) => {
        await use(new BrandsApi(apiClient));
    },
    productsApi: async ({ apiClient }, use) => {
        await use(new ProductsApi(apiClient));
    },
    accountApi: async ({ apiClient }, use) => {
        await use(new AccountApi(apiClient));
    }
});