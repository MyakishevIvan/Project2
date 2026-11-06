import {AccountApi, ApiClient, ProductsApi} from "../api";
import {dataFixtures} from "./DataFixture";

type ApiFixtures = {
    productsApi: ProductsApi;
    apiClient: ApiClient;
    accountApi: AccountApi;
    deleteTestUser: void
}

export const apiFixtures = dataFixtures.extend<ApiFixtures>({
    apiClient: async ({request}, use) => {
        await use(new ApiClient(request));
    },
    productsApi: async ({apiClient}, use) => {
        await use(new ProductsApi(apiClient));
    },
    accountApi: async ({apiClient}, use) => {
        await use(new AccountApi(apiClient));
    },
    deleteTestUser: async ({accountApi, testData}, use) => {
        await use()
        await accountApi.deleteAccount(testData.validUser.email, testData.validUser.password)
    }
});