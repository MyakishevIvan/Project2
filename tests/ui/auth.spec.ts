import { test, expect } from "../../fixtures";

test("successfully authenticate", async ({loginPage, homePage, testData, page}) => {
    await homePage.open();
    await homePage.openLogin();
    await loginPage.login(testData.verifiedUser.email, testData.verifiedUser.password);
    await expect(page).toHaveURL("/")
    const isLogged = await homePage.header.isLoggedInAs(testData.verifiedUser.email);
    expect(isLogged).toBeTruthy();
});

test("failed authenticate", async ({loginPage, homePage, testData}) => {
    await loginPage.open();
    await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);
    const isLogged = await homePage.header.isUserLoggedIn();
    expect(isLogged).toBeFalsy();
    const errorMessage = await loginPage.getLoginError();
    expect(errorMessage).toEqual("Your email or password is incorrect!")
});

test("successful register", async ({loginPage, testData, registrationPage}) => {
    await loginPage.open();
    await loginPage.register(testData.validUser.name, testData.validUser.email);
    await registrationPage.registration(testData.validUser)
    expect(registrationPage.isRegistered()).toBeTruthy()
})

test("successful logout account", async ({homePage, loginPage, testData}) => {
    await loginPage.open();
    await loginPage.login(testData.verifiedUser.email, testData.verifiedUser.password);
    await homePage.header.logout()
    const isUserLogged = await homePage.header.isUserLoggedIn();
    expect(isUserLogged).toBeFalsy()
})