import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import TodoList from "../views/TodoList.vue";
import CreateUpdateTodoItem from "../views/CreateUpdateTodoItem.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "TodoList",
    component: TodoList,
  },
  {
    path: "/new",
    name: "CreateTodoItem",
    component: CreateUpdateTodoItem,
  },
  {
    path: "/update/:id",
    name: "UpdateTodoItem",
    component: CreateUpdateTodoItem,
    props: true,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
