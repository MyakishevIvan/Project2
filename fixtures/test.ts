import { mergeTests } from "@playwright/test";

import { apiFixtures } from "./ApiFixture"

import { uiFixtures } from "./UiFixture";

export const test = mergeTests(apiFixtures, uiFixtures);

test.beforeEach(async ({ context }) => {
    await context.route(/doubleclick\.net|googlesyndication\.com/, route => {
        return route.abort();
    });

});
export { expect } from "@playwright/test";