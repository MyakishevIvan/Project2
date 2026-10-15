import {EndpointName} from "../enums/EndpointName";
import {Endpoint} from "../types/Endpoint";
import endpoints from "../test-data/endpoints.json"

export class EndpointConfig {
    get(name: EndpointName): Endpoint {
        return endpoints[name];
    }
}

export const endpointConfig = new EndpointConfig();