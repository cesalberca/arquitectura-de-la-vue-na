<template>
  <main>
    <app-todo-list @updated="getNewTodos" :todos="todos"></app-todo-list>
    <app-create-todo @created="getNewTodos"></app-create-todo>
  </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppTodoList from './features/app-todo-list.vue'
import AppCreateTodo from './features/app-create-todo.vue'
import { Inject } from '../domain/di/inject'
import { TYPES } from '../types'
import { GetTodosQry } from '../application/get-todos-qry'

@Component({
  components: {
    AppTodoList,
    AppCreateTodo
  }
})
export default class App extends Vue {
  @Inject(TYPES.GET_TODOS_QRY)
  readonly getTodosQry!: GetTodosQry

  todos = this.getTodosQry.execute()

  getNewTodos() {
    this.todos = this.getTodosQry.execute()
  }
}
</script>
