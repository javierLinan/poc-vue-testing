require("expect-puppeteer");
const { setDefaultOptions } = require("expect-puppeteer");

setDefaultOptions({ timeout: 1000 });
jest.setTimeout(120000);
