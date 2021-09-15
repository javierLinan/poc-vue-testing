<template>
  <div class="todo-list">
    <h1>List of TODOs</h1>

    <ul>
      <li
        :data-id="todo.id"
        class="todo-list__item"
        v-for="todo of todos"
        :key="todo.id"
      >
        <input
          type="checkbox"
          v-model="todo.done"
          @change="toggleDone(todo.id)"
        />

        <RouterLink :to="`/update/${todo.id}`">{{ todo.text }}</RouterLink>
        <button @click="remove(todo.id)">Remove</button>
      </li>
    </ul>

    <p><RouterLink to="/new" tag="button">New TODO</RouterLink></p>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Request } from "@/domain/request-handlers/request";
import { getTodoRepository } from "@/repositories/get-todo-repository";
import { Todo } from "../domain/model/todo";

export default Vue.extend({
  name: "TodoList",
  data() {
    return {
      todosDictionary: {},
    };
  },
  computed: {
    todos() {
      return Object.values(this.todosDictionary);
    },
  },
  methods: {
    async loadTodos() {
      const response = await getTodoRepository().find();

      if (response instanceof Request.Success) {
        this.todosDictionary = response.value;
      }
    },
    async toggleDone(id) {
      const response = await getTodoRepository().update(
        this.todosDictionary[id]
      );

      if (response instanceof Request.Success) {
        await this.loadTodos();
      }
    },
    async remove(id) {
      const response = await getTodoRepository().remove(id);

      if (response instanceof Request.Success) {
        await this.loadTodos();
      }
    },
  },
  async mounted() {
    this.loadTodos();
  },
});
</script>

<style>
.todo-list {
  margin: 0 30px;
}

.todo-list button {
  margin-left: 10px;
}
</style>
