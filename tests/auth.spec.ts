import {test} from "../fixtures/test";
import {expect} from "@playwright/test";

test("successfully authenticate", async ({loginPage, homePage, userFactory, page}) => {
    const userCredentials = userFactory.getUserCredentials();
    await homePage.open();
    await homePage.openLogin();
    await loginPage.login(userCredentials.email, userCredentials.password);
    await expect(page).toHaveURL("/")
    const isLogged = await homePage.header.isLoggedInAs(userCredentials.email);
    expect(isLogged).toBeTruthy();
});

test("failed authenticate", async ({loginPage, homePage, userFactory}) => {
    const user = userFactory.createInvalidUser();
    await loginPage.open();
    await loginPage.login(user.email, user.password);
    const isLogged = await homePage.header.isUserLoggedIn();
    expect(isLogged).toBeFalsy();
    const errorMessage = await loginPage.getLoginError();
    expect(errorMessage).toEqual("Your email or password is incorrect!")
});

test("successful register", async ({homePage, loginPage, userFactory, registrationPage}) => {
    const user = userFactory.create();
    await loginPage.open();
    await loginPage.register(user.name, user.email);
    await registrationPage.registration(user)
    expect(registrationPage.isRegistered()).toBeTruthy()
})

test("successful logout account", async ({homePage, loginPage, userFactory}) => {
    const userCredentials = userFactory.getUserCredentials();
    await loginPage.open();
    await loginPage.login(userCredentials.email, userCredentials.password);
    await homePage.header.logout()
    const isUserLogged = await homePage.header.isUserLoggedIn();
    expect(isUserLogged).toBeFalsy()
})