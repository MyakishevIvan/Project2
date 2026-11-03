import {test, expect} from "../fixtures";
import fs from "node:fs/promises";


test("successfully complete checkout process", async ({
                                                          cartPage,
                                                          checkoutPage,
                                                          testData,
                                                          login,
                                                          addProduct
                                                      }) => {
    await cartPage.open()
    await cartPage.clickCheckout()
    const address = await checkoutPage.getDeliveryAddress();
    const country = await checkoutPage.getCountry()
    expect(address).toContain(login.street)
    expect(country).toBe(login.county)
    let orderPrice = 0
    for (const productInfo of addProduct) {
        orderPrice += Number(productInfo.price)
        const order = await checkoutPage.getOrderByName(productInfo.name);
        await expect(order).toBeVisible();
    }
    const totalPrice = await checkoutPage.getOrderTotalPrice();
    expect(orderPrice).toBe(totalPrice);
    await checkoutPage.placeOrder()
    await checkoutPage.fillPaymentDetails(testData.paymentCard)
    await checkoutPage.payAndConfirm()
    const isSuccessful = await checkoutPage.isPurchaseSuccessful();
    expect(isSuccessful).toBeTruthy()
    const downloaded = await checkoutPage.downloadInvoice();
    const filePath = await downloaded.path();
    expect(filePath).not.toBeNull();
    const content = await fs.readFile(filePath!, "utf-8");
    expect(content).toContain(login.name);
});