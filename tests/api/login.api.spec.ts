import {test, expect} from "../../fixtures";

test("should create a new user account", async ({accountApi, testData, deleteTestUser}) => {
    const user = testData.validUser;
    const response = await accountApi.register(user);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual({
        responseCode: 201,
        message: 'User created!'
    });
})

test("should return a success response when logging in with valid credentials", async ({accountApi, testData}) => {
    const user = testData.validUser;
    const response = await accountApi.login(user.email, user.password);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual({
        responseCode: 200,
        message: 'User exists!'
    });
});

test("should return 400 when logging in without an email parameter", async ({accountApi, testData}) => {
    const user = testData.validUser;
    const response = await accountApi.login(undefined, user.password);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual({
        responseCode: 400,
        message: 'Bad request, email or password parameter is missing in POST request.'
    });
});

test("should return 404 when logging in with invalid credentials", async ({accountApi, testData}) => {
    const user = testData.verifiedUser;
    const response = await accountApi.login(user.email, user.password+"wrong");
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual({
        responseCode: 404,
        message: 'User not found!'
    });
})

test("should delete an existing user account", async ({accountApi, testData}) => {
    const user = testData.validUser;
    await accountApi.register(user);
    const response = await accountApi.deleteAccount(user.email, user.password);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual({
        responseCode: 200,
        message: 'Account deleted!'
    });
});

test("should update an existing user account", async ({accountApi, testData, deleteTestUser}) => {
    let user = testData.validUser;
    await accountApi.register(user);
    user.name = "New Name"
    const response = await accountApi.updateAccount(user);
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual({
        responseCode: 200,
        message: 'User updated!'
    });
});