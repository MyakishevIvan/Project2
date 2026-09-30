# Day 10 — Real Playwright E2E Project

С этого дня это не набор упражнений, а один полноценный E2E-проект на TypeScript + Playwright.

Сайт: https://automationexercise.com/

Цель: построить небольшой поддерживаемый test framework с Page Object Model, components, fixtures, test data, API client, UI/API tests и HTML report.

## Структура

```text
day_10/
├── playwright.config.ts
├── pages/
│   ├── BasePage.ts
│   ├── HomePage.ts
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   ├── ProductDetailsPage.ts
│   ├── CartPage.ts
│   ├── CheckoutPage.ts
│   └── AccountPage.ts
├── components/
│   ├── Header.ts
│   ├── ProductCard.ts
│   └── Footer.ts
├── api/
│   ├── ApiClient.ts
│   ├── ProductsApi.ts
│   └── BrandsApi.ts
├── fixtures/
│   └── test.ts
├── data/
│   ├── UserFactory.ts
│   └── ProductData.ts
├── types/
│   ├── User.ts
│   ├── Product.ts
│   └── ApiResponse.ts
└── tests/
    ├── auth.spec.ts
    ├── products.spec.ts
    ├── cart.spec.ts
    ├── checkout.spec.ts
    └── api.spec.ts
```

## 1. Playwright config

В `playwright.config.ts`:

- `testDir` → `tests`
- `baseURL` → Automation Exercise
- Chromium
- HTML reporter
- screenshots только при падении
- trace при первом retry
- явно задать test timeout и action timeout

Должны работать:

```bash
npx playwright test
npx playwright test --headed
npx playwright show-report
```

## 2. Types

### `types/User.ts`

Интерфейс пользователя должен содержать все данные регистрации:

- name
- email
- password
- title
- date of birth
- first name
- last name
- company
- address
- address2
- country
- state
- city
- zipcode
- mobile number

### `types/Product.ts`

Минимум:

- id
- name
- price
- category
- brand

### `types/ApiResponse.ts`

Generic тип API response, позволяющий использовать разные типы данных без создания отдельного response-типа для каждого endpoint.

## 3. Test data

### `data/UserFactory.ts`

Метод:

```text
create()
```

Должен возвращать полноценный валидный `User`.

Требования:

- каждый email уникальный;
- factory не знает о Playwright;
- factory не взаимодействует с UI;
- factory не делает API-запросов.

### `data/ProductData.ts`

Единый источник данных продуктов для тестов. Не дублировать названия продуктов в каждом тесте.

## 4. BasePage

### `pages/BasePage.ts`

Constructor получает `Page`.

Методы:

- `open(path)` — открывает относительный URL;
- `getTitle()` — возвращает title;
- `getCurrentUrl()` — возвращает текущий URL;
- `waitForPage()` — базовый метод ожидания готовности страницы.

BasePage не содержит бизнес-логику магазина.

## 5. Components

### `components/Header.ts`

Методы:

- `openHome()`
- `openProducts()`
- `openCart()`
- `openLogin()`
- `isUserLoggedIn()`
- `getLoggedInUsername()`
- `logout()`

### `components/Footer.ts`

Методы:

- `subscribe(email)`
- `getSubscriptionMessage()`

### `components/ProductCard.ts`

Constructor получает `Locator`.

Методы:

- `getName()`
- `getPrice()`
- `addToCart()`
- `openDetails()`

## 6. HomePage

### `pages/HomePage.ts`

Использует BasePage, Header и Footer.

Методы:

- `open()`
- `isLoaded()`
- `subscribe(email)`
- `openProducts()`
- `openLogin()`

## 7. LoginPage

### `pages/LoginPage.ts`

Методы:

- `login(email, password)`
- `register(name, email)` — начинает регистрацию;
- `getLoginError()`
- `isLoginFormVisible()`
- `isSignupFormVisible()`

## 8. ProductsPage

### `pages/ProductsPage.ts`

Методы:

- `open()`
- `search(productName)`
- `getProducts()` → массив `ProductCard`
- `getProductNames()`
- `getProductByName(name)`
- `getProductsCount()`
- `openProduct(name)`
- `addProductToCart(name)`
- `openCategory(category)`
- `openBrand(brand)`
- `isSearchResultVisible()`

## 9. ProductDetailsPage

### `pages/ProductDetailsPage.ts`

Методы:

- `getName()`
- `getPrice()`
- `getCategory()`
- `getBrand()`
- `getAvailability()`
- `getCondition()`
- `setQuantity(quantity)`
- `addToCart()`
- `addReview(name, email, review)`
- `getReviewSuccessMessage()`

## 10. CartPage

### `pages/CartPage.ts`

Методы:

- `open()`
- `getItems()`
- `getItemNames()`
- `getItemQuantity(name)`
- `getItemPrice(name)`
- `getItemTotal(name)`
- `getCartTotal()`
- `removeItem(name)`
- `proceedToCheckout()`
- `isEmpty()`
- `subscribe(email)`

Общий total должен проверяться математически на основании отображённых item totals, а не заранее захардкоженной суммой.

## 11. CheckoutPage

### `pages/CheckoutPage.ts`

Методы:

- `open()`
- `isAddressVisible()`
- `getDeliveryAddress()`
- `getBillingAddress()`
- `getOrderItems()`
- `getOrderTotal()`
- `enterComment(comment)`
- `placeOrder()`
- `fillPaymentDetails(name, cardNumber, cvc, month, year)`
- `payAndConfirm()`
- `getOrderSuccessMessage()`
- `downloadInvoice()`

`downloadInvoice()` должен возвращать результат, позволяющий тесту проверить факт загрузки файла.

## 12. AccountPage

### `pages/AccountPage.ts`

Методы:

- `isAccountCreatedVisible()`
- `continueAfterAccountCreation()`
- `isLoggedInAs(username)`
- `deleteAccount()`
- `isAccountDeletedVisible()`

## 13. Generic API client

### `api/ApiClient.ts`

Constructor получает Playwright `APIRequestContext`.

Методы:

- `get<T>(url)`
- `post<T>(url, data)`
- `put<T>(url, data)`
- `delete<T>(url)`

API client проверяет HTTP response и выбрасывает ошибку при неуспешном HTTP-статусе.

## 14. Products API

### `api/ProductsApi.ts`

Использует ApiClient.

Методы:

- `getAll()`
- `search(productName)`
- `create(product)`

Создание продукта не обязано завершаться успехом: тест должен проверить фактическое поведение API.

## 15. Brands API

### `api/BrandsApi.ts`

Методы:

- `getAll()`
- `update(data)`

## 16. Fixtures

### `fixtures/test.ts`

Создай собственный `test`, расширяющий Playwright Test.

Он должен предоставлять:

- `homePage`
- `loginPage`
- `productsPage`
- `cartPage`
- `checkoutPage`
- `apiClient`
- `productsApi`
- `brandsApi`

Page Objects и API-классы не должны создаваться вручную в каждом тесте.

Добавь отдельный auth fixture для тестов, которым нужен уже авторизованный пользователь.

## 17. Authentication tests

### `tests/auth.spec.ts`

Минимум:

1. Успешный login.
2. Login с неправильными credentials.
3. Переход на регистрацию.
4. Регистрация нового пользователя через `UserFactory`, проверка создания аккаунта, username в header, удаление аккаунта и проверка удаления.
5. Logout.

## 18. Products tests

### `tests/products.spec.ts`

Минимум:

1. Открытие Products.
2. Список продуктов не пуст.
3. Поиск продукта.
4. Категория.
5. Бренд.
6. Product Details: name, price, category, availability, condition, brand.
7. Добавление продукта в корзину со страницы Products.
8. Добавление продукта из Product Details.
9. Добавление quantity > 1.
10. Добавление review.

## 19. Cart tests

### `tests/cart.spec.ts`

Минимум:

1. Один продукт в корзине.
2. Два разных продукта: проверить products, quantity, price, total.
3. Один продукт с quantity > 1.
4. Удаление одного продукта.
5. Удаление всех продуктов.
6. Проверка общего total математически по item totals.

## 20. Checkout tests

### `tests/checkout.spec.ts`

Минимум:

1. Переход Cart → Checkout.
2. Delivery address.
3. Billing address.
4. Товары заказа.
5. Total заказа.
6. Полный checkout: товары → Cart → Checkout → данные → comment → payment → confirm → success.
7. После заказа скачать invoice и проверить факт загрузки.

## 21. API tests

### `tests/api.spec.ts`

Минимум:

1. GET products: status, structure, наличие продуктов.
2. GET brands: status, structure, наличие брендов.
3. Search Product API: status, structure, соответствующие результаты.
4. POST на products endpoint: проверить ожидаемое поведение неподдерживаемого метода.
5. PUT на brands endpoint: проверить HTTP response и корректную обработку результата.

## 22. Data-driven test

Добавь минимум один `test.describe` с набором login-данных:

- правильные credentials;
- неправильный пароль;
- неправильный email.

Использовать один сценарий с разными данными, без копирования трёх тестов.

## 23. Архитектурные ограничения

- В `.spec.ts` не должно быть селекторов сайта.
- UI-взаимодействия находятся в Page Objects/Components.
- Повторяющийся Header/Footer/ProductCard — отдельные Components.
- Page Objects создаются через fixtures.
- User создаётся через UserFactory.
- API-классы получают данные; assertions находятся в тестах.
- Page Objects выполняют действия и возвращают данные/состояние; assertions находятся в тестах.
- Не использовать `any`.
- Не использовать глобальное mutable state.
- Тесты должны быть независимыми и пригодными для параллельного запуска.

## 24. Итоговый объём

Минимум:

- 5+ Page Objects;
- 3 Components;
- 2 API classes;
- 1 generic ApiClient;
- 1 UserFactory;
- 1 custom fixture;
- 5 test files;
- 25 UI/API сценариев суммарно;
- 1+ data-driven test;
- auth fixture;
- HTML report;
- TypeScript без `any`.

Главная задача: получить работающий небольшой Playwright framework, который можно расширять новыми тестами без копирования архитектуры и кода.
