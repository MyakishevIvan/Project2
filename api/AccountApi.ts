import {ApiClient} from "./ApiClient";
import {APIResponse} from "@playwright/test";
import {EndpointName} from "../enums/EndpointName";
import {UserData} from "../types/UserData";
import {RegistrationUser} from "../types";

export class AccountApi {
    constructor(private readonly apiClient: ApiClient) {
    }

    async login(email?: string, password?: string): Promise<APIResponse> {
        return this.apiClient.send(EndpointName.VERIFY_LOGIN, {email, password});
    }

    async register(data: RegistrationUser): Promise<APIResponse> {
        return this.apiClient.send(EndpointName.CREATE_ACCOUNT, data)
    }

    async deleteAccount(email: string, password: string): Promise<APIResponse> {
        return this.apiClient.send(EndpointName.DELETE_ACCOUNT, {email, password})
    }

    async updateAccount(data: RegistrationUser): Promise<APIResponse> {
        return this.apiClient.send(EndpointName.UPDATE_ACCOUNT, data)
    }
}