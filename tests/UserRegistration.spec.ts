import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    console.log(`>>> Running test: ${test.info().title}`);
    await page.goto("https://demo.guru99.com/test/newtours/index.php");
});

test("user registration", async ({ page }) => {

    // starting test in home page
    await expect(page).toHaveTitle("Welcome: Mercury Tours");

    // click the REGISTER link
    await page.getByRole("link", { name: "REGISTER", exact: true }).click();

    const firstName: string = "Victor"
    const lastName: string = "Reyes"
    const userName: string = "reyesvictor1"
    const phone: string = "1234567890"
    const email: string = "fake.email@gmail.com"
    const address: string = "Fake Street"
    const city: string = "Aguascalientes City"
    const state: string = "Aguascalientes"
    const postalCode: string = "20270"
    const country: string = "MEXICO"
    const password: string = "12345"

    // fill out the form
    await page.locator("[name='firstName']").fill(firstName);
    await page.locator("[name='lastName']").fill(lastName);
    await page.locator("[name='phone']").fill(phone);
    await page.locator("[name='userName']").fill(email); // attribute name is userName, should be email
    await page.locator("[name='address1']").fill(address);
    await page.locator("[name='city']").fill(city);
    await page.locator("[name='state']").fill(state);
    await page.locator("[name='postalCode']").fill(postalCode);
    await page.locator("[name='country']").selectOption(country);
    await page.locator("[name='email']").fill(userName); // attribute name is email, should be userName
    await page.locator("[name='password']").fill(password);
    await page.locator("[name='confirmPassword']").fill(password);

    // submit the form
    await page.locator("[name='submit']").click();

    // check registration confirmation
    await expect(page).toHaveURL("https://demo.guru99.com/test/newtours/register_sucess.php");
    await expect(page).toHaveTitle("Register: Mercury Tours");
    await expect(page.locator(`text=Dear ${firstName} ${lastName}`)).toBeVisible(); // using Playwright text selector
    await expect(page.locator(`text=Your user name is ${userName}`)).toBeVisible(); // using Playwright text selector

    // sign-in
    await page.getByRole("link", { name: "sign-in" }).click();
    await expect(page).toHaveURL("https://demo.guru99.com/test/newtours/login.php");
    await expect(page).toHaveTitle("Sign-on: Mercury Tours");
    await page.locator("[name='userName']").fill(userName);
    await page.locator("[name='password']").fill(password);
    await page.locator("[name='submit']").click();
    await expect(page).toHaveURL("https://demo.guru99.com/test/newtours/login_sucess.php");
    await expect(page).toHaveTitle("Login: Mercury Tours");
    await expect(page.getByRole("heading", { name: "Login Successfully" })).toBeVisible();

});