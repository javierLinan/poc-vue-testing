import { windowSetData } from "tests/integration/helpers/window-set-data";

describe("Add TODOs", () => {
  beforeAll(async () => {
    page.setDefaultNavigationTimeout(0);

    await windowSetData(page, {});
  });

  it("new todo exist in TODOs list after creation", async () => {
    const todoText = "This is a TODO";

    await page.goto(`http://localhost:8080`);
    await expect(page).toClick("button", { text: "New TODO2" });
    await expect(page).toFill("#create-todo-item__text", todoText);
    await expect(page).toClick("button", { text: "Send" });
    await expect(page).toMatch(todoText);
  });
});
