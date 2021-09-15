// See https://github.com/smooth-code/jest-puppeteer for more information about these options
const config = {
  server: {
    command: "npm run serve:mock",
    port: 8080,
    launchTimeout: 90000,
    usedPortAction: "kill",
  },
};

if (process.env.HEADLESS === "false") {
  config.launch = {
    slowMo: 500,
    headless: false,
    defaultViewport: { width: 1400, height: 900 },
    args: ["--no-sandbox"],
  };
} else {
  config.launch = {
    args: ["—headless", "--no-sandbox"],
  };
}

module.exports = config;
