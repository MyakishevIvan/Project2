import {ApiClient} from "./ApiClient";
import {EndpointName} from "../enums/EndpointName";
import {APIResponse} from "@playwright/test";

export class ProductsApi {

    constructor(private readonly apiClient: ApiClient) {
    }

    async getAll(): Promise<APIResponse> {
        return await this.apiClient.send(EndpointName.GET_PRODUCTS)
    }

    async search(productName: string):Promise<APIResponse> {
        return await this.apiClient.send(EndpointName.SEARCH_PRODUCTS, productName);
    }
}