import {ApiClient} from "./ApiClient";
import {APIResponse} from "@playwright/test";
import {EndpointName} from "../enums/EndpointName";

export class BrandsApi {
    constructor(private readonly apiClient: ApiClient) {
    }

    async getAll(): Promise<APIResponse> {
        return await this.apiClient.send(EndpointName.GET_BRANDS)
    }

}