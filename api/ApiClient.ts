import { APIRequestContext, APIResponse } from '@playwright/test';
import { EndpointName } from '../enums/EndpointName';
import { endpointConfig } from '../config/EndpointConfig';

export class ApiClient {
    constructor(private readonly request: APIRequestContext) {}

    async send(
        name: EndpointName,
        data?: object
    ): Promise<APIResponse> {
        const endpoint = endpointConfig.get(name);

        return this.request.fetch(endpoint.endpoint, {
            method: endpoint.method,
            form: data as Record<string, string | number | boolean> | undefined
        });
    }
}