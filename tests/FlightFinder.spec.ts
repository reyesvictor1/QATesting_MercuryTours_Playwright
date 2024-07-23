import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
    console.log(`>>> Running test: ${test.info().title}`);
    await page.goto("https://demo.guru99.com/test/newtours/index.php");
});

test("flight finder", async ({ page }) => {

    //starting test in home page
    await expect(page).toHaveTitle("Welcome: Mercury Tours");

    // click the flights link
    await page.getByRole("link", { name: "Flights" }).click();
    await expect(page).toHaveTitle("Find a Flight: Mercury Tours:");

    // trip type
    await page.locator("[name='tripType'][value='oneway']").check();

    // passengers
    await page.locator("[name='passCount']").selectOption("2");

    // departure location
    await page.locator("[name='fromPort']").selectOption("Frankfurt");

    // departure date
    await page.locator("[name='fromMonth']").selectOption("September");
    await page.locator("[name='fromDay']").selectOption("23");

    // arrival location
    await page.locator("[name='toPort']").selectOption("Seattle");

    // arrival date
    await page.locator("[name='toMonth']").selectOption("October");
    await page.locator("[name='toDay']").selectOption("18");

    // service class
    await page.locator("[name='servClass'][value='Business']").check();

    // airline
    await page.locator("[name='airline']").selectOption("Unified Airlines");

    // press continue (findFlights)
    await page.locator("[name='findFlights']").click();

    // check flights results
    await expect(page.locator(`text=/No Seats Avaialble/`)).toBeVisible(); // there is a typo: should be "available"

    // go back to home page
    await page.locator("a[href='index.php'] > img").click() // find the anchor which has an image nested inside
    await expect(page).toHaveURL("https://demo.guru99.com/test/newtours/index.php");
    await expect(page).toHaveTitle("Welcome: Mercury Tours");

});