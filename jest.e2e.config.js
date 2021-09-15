module.exports = {
  moduleFileExtensions: ["js", "jsx", "json", "vue", "ts", "tsx"],
  testMatch: ["**/tests/integration/**/*.spec.(js|ts)"],
  globalSetup: "<rootDir>/tests/integration/global-setup.js",
  globalTeardown: "<rootDir>/tests/integration/global-teardown.js",
  testEnvironment: "jest-environment-puppeteer",
  setupFilesAfterEnv: ["<rootDir>/tests/integration/jest.setup.js"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "^tests/(.*)$": "<rootDir>/tests/$1",
  },
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
  transform: {
    "^.+\\.vue$": require.resolve("vue-jest"),
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      require.resolve("jest-transform-stub"),
    "^.+\\.jsx?$": require.resolve("babel-jest"),
    "^.+\\.tsx?$": require.resolve("ts-jest"),
  },
  transformIgnorePatterns: ["/node_modules/"],
  // testEnvironment: "jest-environment-jsdom-fifteen",
  // https://github.com/facebook/jest/issues/6766
  watchPlugins: [
    require.resolve("jest-watch-typeahead/filename"),
    require.resolve("jest-watch-typeahead/testname"),
  ],
};
