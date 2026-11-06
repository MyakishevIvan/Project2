import {ApiClient} from "./ApiClient";
import {EndpointName} from "../enums/EndpointName";
import {APIResponse} from "@playwright/test";

export class ProductsApi {

    constructor(private readonly apiClient: ApiClient) {
    }

    async getAll(): Promise<APIResponse> {
        return this.apiClient.send(EndpointName.GET_PRODUCTS)
    }

    async postProducts(): Promise<APIResponse> {
        return this.apiClient.send(EndpointName.POST_PRODUCTS)
    }

    async search(productName?: string): Promise<APIResponse> {
        return this.apiClient.send(EndpointName.SEARCH_PRODUCTS, {search_product: productName});
    }

    async getAllBrands(): Promise<APIResponse> {
        return this.apiClient.send(EndpointName.GET_BRANDS)
    }
}