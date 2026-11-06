import {ApiClient} from "./ApiClient";
import {APIResponse} from "@playwright/test";
import {EndpointName} from "../enums/EndpointName";
import {UserData} from "../types/UserData";
import {RegistrationUser} from "../types";

export class AccountApi{
    constructor(private readonly apiClient: ApiClient) {
    }

    async login(data: UserData): Promise<APIResponse> {
        return await this.apiClient.send(EndpointName.VERIFY_LOGIN, data)
    }

    async register(data: RegistrationUser): Promise<APIResponse> {
        return await this.apiClient.send(EndpointName.CREATE_ACCOUNT, data)
    }

    async deleteAccount(data: UserData): Promise<APIResponse> {
        return await this.apiClient.send(EndpointName.DELETE_ACCOUNT, data)
    }

    async updateAccount(data: RegistrationUser): Promise<APIResponse> {
        return await this.apiClient.send(EndpointName.UPDATE_ACCOUNT, data)
    }

    async getUserDetail(email: string): Promise<APIResponse> {
        return await this.apiClient.send(EndpointName.GET_USER_DETAIL, email)
    }
}