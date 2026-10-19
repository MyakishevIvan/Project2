import {test} from "../fixtures/test";
import {expect} from "@playwright/test";

test("successfully authenticate", async ({loginPage, homePage, registeredUser}) => {
    await homePage.open();
    await homePage.openLogin();
    await loginPage.login(registeredUser.email, registeredUser.password);
    const isFormVisible = await loginPage.isLoginFormVisible();
    expect(isFormVisible).toBeTruthy();
});