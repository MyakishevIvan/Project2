import { test, expect } from "../../fixtures";

test("should successfully log in with valid credentials", async ({loginPage, homePage, testData, page}) => {
    await homePage.open();
    await homePage.openLogin();
    await loginPage.login(testData.verifiedUser.email, testData.verifiedUser.password);
    await expect(page).toHaveURL("/")
    const isLogged = await homePage.header.isLoggedInAs(testData.verifiedUser.name);
    expect(isLogged).toBeTruthy();
});

test("should display an error when logging in with invalid credentials", async ({loginPage, homePage, testData}) => {
    await loginPage.open();
    await loginPage.login(testData.invalidUser.email, testData.invalidUser.password);
    const isLogged = await homePage.header.isUserLoggedIn();
    expect(isLogged).toBeFalsy();
    const errorMessage = await loginPage.getLoginError();
    expect(errorMessage).toEqual("Your email or password is incorrect!")
});

test("should successfully register a new user", async ({loginPage, testData, registrationPage, deleteTestUser}) => {
    await loginPage.open();
    await loginPage.register(testData.validUser.name, testData.validUser.email);
    await registrationPage.registration(testData.validUser)
    const isRegistered = await registrationPage.isRegistered();
    expect(isRegistered).toBeTruthy();;
})

test("should successfully log out from the account", async ({homePage, loginPage, testData}) => {
    await loginPage.open();
    await loginPage.login(testData.verifiedUser.email, testData.verifiedUser.password);
    await homePage.header.logout()
    const isUserLogged = await homePage.header.isUserLoggedIn();
    expect(isUserLogged).toBeFalsy()
})