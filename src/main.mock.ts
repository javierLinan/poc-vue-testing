import "reflect-metadata";
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { injectInMemoryRepositories } from "./repositories/inject-in-memory-repositories";
import { initRepositoriesWithData } from "./repositories/init-repositories-with-data";

Vue.config.productionTip = false;

injectInMemoryRepositories();
initRepositoriesWithData((window as any).data);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
