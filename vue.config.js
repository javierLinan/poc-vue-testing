const path = require("path");

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  productionSourceMap: false,
  configureWebpack: {
    devtool: "source-map",
  },
  chainWebpack: (config) => {
    if (process.env.MOCK_API) {
      config.entry("app").clear();
      config.entry("app").add("./src/main.mock.ts");
    }

    return config;
  },
};
