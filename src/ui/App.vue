<template>
  <main>
    <app-todo-list></app-todo-list>
    <app-create-todo></app-create-todo>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppTodoList from './features/app-todo-list.vue'
import AppCreateTodo from './features/app-create-todo.vue'

@Component({
  components: {
    AppTodoList,
    AppCreateTodo
  }
})
export default class App extends Vue {}
</script>
