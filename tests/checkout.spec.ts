import {test, expect} from "../fixtures";

//comment → payment → confirm → success.
//     После заказа скачать invoice и проверить факт загрузки.

test("successfully complete checkout process", async ({
                                                          cartPage,
                                                          checkoutPage,
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
});