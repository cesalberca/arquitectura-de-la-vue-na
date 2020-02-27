<template>
  <ul>
    <li
      v-for="todo in todos"
      :key="todo.id"
      :class="{ completed: todo.completed }"
      @click="() => completeTodo(todo.id)"
    >
      {{ todo.text }}
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Inject } from '../../domain/di/inject'
import { TYPES } from '../../types'
import { GetTodosQry } from '../../application/queries/get-todos-qry'
import { CompleteTodoCmd } from '../../application/commands/complete-todo-cmd'
import { Id } from '../../domain/todo/id'

@Component({ name: 'AppTodoList' })
export default class AppTodoList extends Vue {
  @Inject(TYPES.GET_TODOS_QRY)
  readonly getTodosQry!: GetTodosQry

  @Inject(TYPES.COMPLETE_TODO_CMD)
  readonly completeTodoCmd!: CompleteTodoCmd

  completeTodo(id: Id) {
    this.completeTodoCmd.execute(id)
  }

  get todos() {
    return this.getTodosQry.execute()
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
