import {test, expect} from "../../fixtures";

test("should return a list of all products", async ({productsApi}) => {
    const response = await productsApi.getAll();
    const body = await response.json();
    expect(body.responseCode).toBe(200);
    expect(body.products.length).toBeGreaterThan(0);
    for (const product of body.products) {
        expect(product.id).toEqual(expect.any(Number));
        expect(product.name).toEqual(expect.any(String));
        expect(product.price).toEqual(expect.any(String));
        expect(product.brand).toEqual(expect.any(String));
    }
});

test("should return 405 when requesting all products using POST", async ({productsApi}) => {
    const response = await productsApi.postProducts();
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body).toEqual({
        responseCode: 405,
        message: 'This request method is not supported.'
    });
});

test("should return a list of all brands", async ({productsApi}) => {
    const response = await productsApi.getAllBrands();
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.brands.length).toBeGreaterThan(0);
    for (const brand of body.brands) {
        expect(brand.brand).toEqual(expect.any(String));
        expect(brand.id).toEqual(expect.any(Number));
    }
});

test("should return a matching product when searching by name", async ({productsApi, testData}) => {
    const product = testData.product;
    const response = await productsApi.search(product.name)
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body.products).toHaveLength(1);
    expect(body.products[0].id).toBe(product.id);
    expect(body.products[0].name).toBe(product.name);
    expect(body.products[0].price).toBe(product.price);
});

test("should return 400 when searching without search_product parameter", async ({productsApi}) => {
    const response = await productsApi.search(undefined)
    const body = await response.json();
    expect(response.status()).toBe(200);
    expect(body).toEqual({
        responseCode: 400,
        message: 'Bad request, search_product parameter is missing in POST request.'
    });
});

