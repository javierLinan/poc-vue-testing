import { Page } from "puppeteer";

export async function windowSetData(page: Page, value: { [key: string]: any }) {
  page.evaluateOnNewDocument(`
    Object.defineProperty(window, "data", {
      get() {
        return ${JSON.stringify(value)}
      }
    })
  `);
}
