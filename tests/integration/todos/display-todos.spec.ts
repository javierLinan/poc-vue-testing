import { windowSetData } from "tests/integration/helpers/window-set-data";
import { v4 as uuidv4 } from "uuid";

describe("Display TODOs", () => {
  let firstTodo;
  let secondTodo;

  beforeAll(async () => {
    page.setDefaultNavigationTimeout(0);

    firstTodo = {
      id: uuidv4(),
      text: "This is the first TOD",
      done: false,
    };

    secondTodo = {
      id: uuidv4(),
      text: "This is the second TOD",
      done: true,
    };

    await windowSetData(page, {
      todos: {
        [firstTodo.id]: firstTodo,
        [secondTodo.id]: secondTodo,
      },
    });
  });

  it("list of TODOs contains expected items", async () => {
    const expectedApisIds = [firstTodo.id, secondTodo.id];
    const receivedApisIds = [];

    await page.goto(`http://localhost:8080`);

    await expect(page).toMatch(firstTodo.text);
    await expect(page).toMatch(secondTodo.text);

    const handles = await page.$$(".todo-list__item");

    for (const handle of handles) {
      const receivedId = await handle.evaluate(
        (node: HTMLElement) => node.dataset.id
      );
      receivedApisIds.push(receivedId);
      expect(expectedApisIds).toContain(receivedId);
    }

    expect(receivedApisIds).toHaveLength(expectedApisIds.length);
  });
});
