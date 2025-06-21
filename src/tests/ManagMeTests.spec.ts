import { test, expect } from "@playwright/test";
const url = "http://localhost:5173/";

test.describe("Project Management App", () => {
  test.beforeEach("Should authenticate user", async ({ page }) => {
    await page.goto(url);
    await expect(page).toHaveURL(url);

    await page.fill("[data-test=email-input]", "user@example.com");
    await page.fill("[data-test=password-input]", "Password123$d");

    await page.click("[data-test=login-btn]");

    await page.waitForURL(url + "projects");
    await expect(page).toHaveURL(url + "projects");
  });

  test("test", async ({ page }) => {
    await page.goto(url);
    await page.getByRole("button", { name: "Register" }).click();
    await page.getByRole("textbox", { name: "Email *" }).click();
    await page
      .getByRole("textbox", { name: "Email *" })
      .fill("user1233@example.com");
    await page.getByRole("textbox", { name: "Name *", exact: true }).click();
    await page
      .getByRole("textbox", { name: "Name *", exact: true })
      .fill("User");
    await page.getByRole("textbox", { name: "Surname *" }).click();
    await page.getByRole("textbox", { name: "Surname *" }).fill("Surname");
    await page.getByRole("spinbutton", { name: "Age *" }).click();
    await page.getByRole("spinbutton", { name: "Age *" }).fill("22");
    await page
      .getByRole("textbox", { name: "Password *", exact: true })
      .click();
    await page
      .getByRole("textbox", { name: "Password *", exact: true })
      .fill("Password123$d");
    await page.getByRole("textbox", { name: "Confirm Password *" }).click();
    await page
      .getByRole("textbox", { name: "Confirm Password *" })
      .fill("Password123$d");
    await page.getByRole("textbox", { name: "Description *" }).click();
    await page.getByRole("textbox", { name: "Description *" }).fill("opis");
    await page.getByLabel("Role *").selectOption("1");
    await page.getByRole("button", { name: "Add" }).click();
  });

  test("Should expand form and create a new project", async ({ page }) => {
    await page.click("[data-test=expand-form-btn]");

    await page.fill("[name=name]", "My Test Project");
    await page.fill("[name=description]", "Test project description");

    await page.click("button[type=submit]");

    await expect(page.locator("[data-test=project-list]")).toContainText(
      "My Test Project"
    );
  });

  test("Should expand form and edit project", async ({ page }) => {
    await page
      .getByTestId("list-item-4")
      .getByRole("button", { name: "Edit" })
      .click();
    await page.getByRole("textbox", { name: "Project Name" }).click();
    await page
      .getByRole("textbox", { name: "Project Name" })
      .fill("Updated Project Name 15");
    await page.getByRole("button", { name: "Add" }).click();
    await expect(page.locator("[data-test=project-list]")).toContainText(
      "Updated Project Name 15"
    );
  });

  test("Should show project details", async ({ page }) => {
    await page
      .getByTestId("list-item-4")
      .getByRole("button", { name: "Details" })
      .click();
  });
});
