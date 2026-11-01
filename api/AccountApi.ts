import {ApiClient} from "./ApiClient";
import {APIResponse} from "@playwright/test";
import {EndpointName} from "../enums/EndpointName";
import {VerifiedUser} from "../types/VerifiedUser";
import {User} from "../types";

export class AccountApi{
    constructor(private readonly apiClient: ApiClient) {
    }

    async login(data: VerifiedUser): Promise<APIResponse> {
        return await this.apiClient.send(EndpointName.VERIFY_LOGIN, data)
    }

    async register(data: User): Promise<APIResponse> {
        return await this.apiClient.send(EndpointName.CREATE_ACCOUNT, data)
    }

    async deleteAccount(data: VerifiedUser): Promise<APIResponse> {
        return await this.apiClient.send(EndpointName.DELETE_ACCOUNT, data)
    }

    async updateAccount(data: User): Promise<APIResponse> {
        return await this.apiClient.send(EndpointName.UPDATE_ACCOUNT, data)
    }

    async getUserDetail(email: string): Promise<APIResponse> {
        return await this.apiClient.send(EndpointName.GET_USER_DETAIL, email)
    }
}