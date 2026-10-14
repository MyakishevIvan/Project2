import {APIRequestContext, APIResponse} from "@playwright/test";
import {ApiResponse} from "../types";

class ApiClient<T> {
    private readonly request: APIRequestContext

    constructor(request: APIRequestContext) {
        this.request = request;
    }

    async get<T>(url: string): Promise<T> {
        const response = await this.request.get(url);
        return this.prepareResponse<T>(response);
    }

    async post<T>(url: string, data: object): Promise<T> {
        const response = await this.request.post(url, data);
        return this.prepareResponse<T>(response);
    }

    async put<T>(url: string, data: object): Promise<T> {
        const response = await this.request.put(url, data);
        return this.prepareResponse<T>(response);
    }

    async delete<T>(url: string): Promise<T> {
        const response = await this.request.delete(url);
        return this.prepareResponse<T>(response);
    }

    private async prepareResponse<T>(response: APIResponse<T>) {
        if (!response.ok()) {
            throw new Error(`HTTP ${response.status()}: ${response.statusText()}`);
        }

        return await response.json() as T;
    }
}