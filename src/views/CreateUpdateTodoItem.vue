<template>
  <div class="create-todo-item">
    <h1>{{ header }}</h1>
    <label for="create-todo-item__text">Text</label>
    <textarea type="text" id="create-todo-item__text" v-model="todo.text" />
    <p><button @click="createOrUpdate">Send</button></p>
  </div>
</template>

<script lang="ts">
import { Request } from "@/domain/request-handlers/request";
import { getTodoRepository } from "@/repositories/get-todo-repository";
import Vue from "vue";
import router from "../router/index";

export default Vue.extend({
  name: "CreateTodoItem",
  props: {
    id: {
      type: String,
    },
  },
  data() {
    return {
      todo: {
        id: undefined,
        text: "",
        done: false,
      },
    };
  },
  computed: {
    header() {
      return this.todo.id ? "Update TODO" : "Create TODO";
    },
  },
  methods: {
    async createOrUpdate() {
      let response;

      if (this.todo.id) {
        response = await getTodoRepository().update(this.todo);
      } else {
        response = await getTodoRepository().create(
          this.todo.text,
          this.todo.done
        );
      }

      if (response instanceof Request.Success) {
        router.push("/");
      }
    },
  },
  async mounted() {
    this.todo = {
      id: undefined,
      text: "",
      done: false,
    };

    if (this.id) {
      const response = await getTodoRepository().findById(this.id);

      if (response instanceof Request.Success) {
        this.todo = response.value;
      }
    }
  },
});
</script>

<style>
.todo-list {
  margin: 0 30px;
}
</style>
