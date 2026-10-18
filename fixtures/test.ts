import { mergeTests } from "@playwright/test";

import { apiFixtures } from "./ApiFixture"

import { uiFixtures } from "./UiFixture";

export const test = mergeTests(apiFixtures, uiFixtures);

export { expect } from "@playwright/test";