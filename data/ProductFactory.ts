import {Product} from "../types";
import productsData from "../test-data/products.json";
import {randomInt} from "node:crypto";

export class ProductFactory {
    private products: Product[] = productsData.products;
    private availableIndexes: number[] = this.products.
    map((_, index) => index);

    create(): Product {
        if (this.availableIndexes.length === 0) {
            throw new Error("All products were used");
        }

        const randomIndex = randomInt(0, this.availableIndexes.length - 1);
        const productIndex = this.availableIndexes.splice(randomIndex, 1)[0];

        return this.products[productIndex];
    }
}