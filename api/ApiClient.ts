import { APIRequestContext, APIResponse } from '@playwright/test';
import { EndpointName } from '../enums/EndpointName';
import { endpointConfig } from '../config/EndpointConfig';

export class ApiClient {
    constructor(private readonly request: APIRequestContext) {}

    async send<T>(
        name: EndpointName,
        data?: T
    ): Promise<APIResponse> {
        const endpoint = endpointConfig.get(name);

        return this.request.fetch(endpoint.endpoint, {
            method: endpoint.method,
            data
        });
    }
}