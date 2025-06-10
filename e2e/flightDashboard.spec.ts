import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Flight Status Dashboard/);
});

test("should display a list of flights on page load", async ({ page }) => {
  await page.goto("/");

  await page.waitForSelector("table");
  const rows = await page.locator("table tr").count();

  expect(rows).toBeGreaterThan(1);

  // Click the get started link.
  // await page.getByRole("link", { name: "Get started" }).click();
});

test("Should navigate to the next page and update flights", async ({
  page,
}) => {
  await page.goto("/");

  const nextButton = page.getByTestId("next-page-btn");
  await nextButton.click();

  await expect(page.locator("table")).toContainText("Flight");
});

test("should filter flights by status", async ({ page }) => {
  await page.goto("/");

  const filter = page.getByRole("combobox");
  await filter.click();

  const scheduledOption = page.locator("[role='option']", {
    hasText: "Scheduled",
  });
  await scheduledOption.click();

  const badges = page.getByTestId("badge-status");
  await expect(badges.first()).toContainText("Scheduled");
});

test("refresh button disables after click", async ({ page }) => {
  await page.goto("/");

  const refreshBtn = page.getByRole("button", { name: /refresh/i });
  await refreshBtn.click();

  const waitingBtn = page.getByRole("button", {
    name: /please wait 5 minutes/i,
  });

  await expect(waitingBtn).toBeDisabled();
  await expect(waitingBtn).toHaveText(/please wait 5 minutes/i);
});
