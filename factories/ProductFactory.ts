import {ProductInfo} from "../types";
import productsData from "../test-data/products.json";
import {randomInt} from "node:crypto";

export class ProductFactory {
    private products: ProductInfo[] = productsData.products;
    private availableIndexes: number[] = this.products.
    map((_, index) => index);

    create(): ProductInfo {
        if (this.availableIndexes.length === 0) {
            throw new Error("All products were used");
        }

        const randomIndex = randomInt(0, this.availableIndexes.length);
        const productIndex = this.availableIndexes.splice(randomIndex, 1)[0];

        return this.products[productIndex];
    }
}