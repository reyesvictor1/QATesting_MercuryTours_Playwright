import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    console.log(`>>> Running test: ${test.info().title}`);
    await page.goto("https://demo.guru99.com/test/newtours/index.php");
});

test("website navigation", async ({ page }) => {

    // starting test in home page
    await expect(page).toHaveTitle("Welcome: Mercury Tours");

    // test SIGN-ON link
    await page.getByRole("link", { name: "SIGN-ON" }).click();
    await expect(page).toHaveURL("https://demo.guru99.com/test/newtours/login.php");
    await expect(page).toHaveTitle("Sign-on: Mercury Tours");

    // test REGISTER link
    await page.getByRole("link", { name: "REGISTER" }).click();
    await expect(page).toHaveURL("https://demo.guru99.com/test/newtours/register.php");
    await expect(page).toHaveTitle("Register: Mercury Tours");

    // test SUPPORT link
    await page.getByRole("link", { name: "SUPPORT" }).click();
    await expect(page).toHaveURL("https://demo.guru99.com/test/newtours/support.php");
    await expect(page).toHaveTitle("Under Construction: Mercury Tours");

    // test CONTACT link
    await page.getByRole("link", { name: "CONTACT" }).click();
    await expect(page).toHaveURL("https://demo.guru99.com/test/newtours/support.php");
    await expect(page).toHaveTitle("Under Construction: Mercury Tours");

});