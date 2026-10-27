import {test} from "../fixtures/test";
import {expect} from "@playwright/test";


test("products list not empty", async ({homePage, productsPage}) => {
    await homePage.open()
    await homePage.openProducts()
    const productCount = await productsPage.getProductsCount();
    expect(productCount).toBeGreaterThan(0)
});

test("successfully searching products", async ({
                                                   productsPage,
                                                   productFactory,
                                                   productDetailsPage
                                               }) => {
    const product = productFactory.create();
    await productsPage.open()
    await productsPage.search(product.name)
    const productCards = await productsPage.getProducts();
    expect(productCards).toHaveLength(1)
    const name = await productCards[0].getName();
    const price = await productCards[0].getPrice();
    expect(name).toBe(product.name);
    expect(price).toBe(product.price);
    await productCards[0].openDetails()
    const brand = await productDetailsPage.getBrand();
    const result = await productDetailsPage.getCategories();
    expect(brand).toBe(product.brand);
    expect(result.subcategory).toBe(product.category);
});

test("find by category", async ({productsPage, productDetailsPage}) => {
    await productsPage.open()
    const categories = await productsPage.getAllCategories();
    const selectedCategory = categories[0]
    await productsPage.openCategory(selectedCategory);
    const subcategories = await productsPage.getAllSubcategory(selectedCategory);
    const selectedSubcategory = subcategories[0]
    await productsPage.openSubcategory(selectedCategory, selectedSubcategory);
    const productCards = await productsPage.getProducts();
    await productCards[0].openDetails()
    const {category, subcategory} = await productDetailsPage.getCategories();
    expect(category).toBe(selectedCategory);
    expect(subcategory).toBe(selectedSubcategory);
});

test("add product to cart from product page ", async ({productsPage}) => {
    await productsPage.open()
    const productCards = await productsPage.getProducts();
    await productCards[0].addToCart()
    const hasSucceededPanel = await productsPage.hasSucceededCartPanel();
    expect(hasSucceededPanel).toBeTruthy();
})

test("add product to cart from product details page ", async ({
                                                                  productsPage,
                                                                  productDetailsPage,
                                                                  cartPage
                                                              }) => {
    const expectedQuantity = 2;
    await productsPage.open()
    const productCards = await productsPage.getProducts();
    const name = await productCards[0].getName();
    await productCards[0].openDetails()
    await productDetailsPage.setQuantity(expectedQuantity);
    await productDetailsPage.addToCart()
    const hasSucceededPanel = await productDetailsPage.hasSucceededCartPanel();
    expect(hasSucceededPanel).toBeTruthy();
    await cartPage.open()
    const isCartEmpty = await cartPage.isEmpty();
    expect(isCartEmpty).toBeFalsy();
    const actualQuantity = await cartPage.getItemQuantity(name);
    expect(actualQuantity).toBe(expectedQuantity);
});

test("add review to product", async ({productsPage, productDetailsPage}) => {
    await productsPage.open()
    const productCards = await productsPage.getProducts();
    await productCards[0].openDetails()
    await productDetailsPage.addReview("Test", "test@gmail.com", "test review")
    const isSuccessPanelVisible = await productDetailsPage.isReviewSuccessPanelVisible();
    expect(isSuccessPanelVisible).toBeTruthy();
});


