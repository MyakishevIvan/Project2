# Playwright + TypeScript Test Automation

![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)
![Playwright](https://img.shields.io/badge/Playwright-1.63-2EAD33?logo=playwright&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-required-339933?logo=nodedotjs&logoColor=white)

A test automation project built with **Playwright** and **TypeScript**
for the [Automation Exercise](https://automationexercise.com/) web
application.

The project is focused on practical UI and API test automation, reusable
test infrastructure, and maintainable test code.

## What This Project Covers

-   End-to-end UI testing with Playwright
-   API-based operations used in test scenarios
-   Page Object Model (POM)
-   Custom Playwright fixtures
-   Reusable API clients
-   Test data management and data factories
-   Positive and negative test scenarios
-   Test setup and teardown
-   Automatic cleanup of test users
-   Web-first assertions
-   Debugging with screenshots, traces, and video recordings

## Project Design

The framework separates test scenarios from page interactions, API
operations, and test infrastructure.

### Page Object Model

Page objects encapsulate page-specific locators and actions. Tests use
these methods instead of duplicating UI interaction logic.

### Custom Fixtures

Custom fixtures provide tests with the dependencies they need, such as
page objects, API clients, and test data.

This keeps test setup consistent and reduces repeated initialization
code.

### API Clients

API operations are grouped into reusable client methods. They can be
used to prepare test conditions, perform API checks, and clean up test
data without relying on UI steps for every operation.

### Test Data

Test data and factory methods help create reusable test entities and
keep test scenarios independent. Unique values can be generated when a
scenario requires data that has not been used before.

## Configuration

The Playwright configuration currently includes:

-   Chromium as the configured browser project
-   HTML test reporter
-   Headed browser execution
-   Screenshots on test failure
-   Trace collection on test failure
-   Video recording on test failure
-   Parallel test execution

Configuration is defined in `playwright.config.ts`.

## Getting Started

### Prerequisites

-   Node.js
-   npm

### 1. Clone the repository

``` bash
git clone https://github.com/MyakishevIvan/Project2.git
cd Project2
```

### 2. Install dependencies

``` bash
npm install
```

### 3. Install Playwright browsers

``` bash
npx playwright install chromium
```

## Running Tests

Run the full test suite:

``` bash
npx playwright test
```

Run tests with the browser visible:

``` bash
npx playwright test --headed
```

Run a specific test file:

``` bash
npx playwright test path/to/test.spec.ts
```

Open the HTML report:

``` bash
npx playwright show-report
```

Compile the TypeScript project:

``` bash
npm run build
```

## Test Artifacts

Playwright is configured to collect debugging artifacts when tests fail:

-   **Screenshots** help inspect the page state at the time of failure.
-   **Traces** provide detailed information about test actions and
    browser activity.
-   **Videos** make it easier to review the test execution.

## Repository Structure

The project is organized by responsibility. The main areas include test
scenarios, page objects, fixtures, API helpers, and test data.

> The directory tree may evolve as the framework develops. Refer to the
> repository for the current folder and file names.

## Project Purpose

This is a hands-on QA Automation project used to practice and
demonstrate:

-   TypeScript in test automation
-   Playwright Test runner and fixtures
-   UI and API testing techniques
-   Object-oriented design and reusable components
-   Test data organization
-   Maintainable automation architecture
-   Test debugging and reporting

## Author

**Ivan Myakishev**

[GitHub](https://github.com/MyakishevIvan)
