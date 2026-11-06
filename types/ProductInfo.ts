import {BaseProduct} from "./BaseProduct";

export interface ProductInfo extends BaseProduct {
    id: number,
    category: string,
    brand: string,
}