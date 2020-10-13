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
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Inject } from '../../domain/di/inject'
import { TYPES } from '../../types'
import { CompleteTodoCmd } from '../../application/complete-todo-cmd'
import { Id } from '../../domain/todo/id'
import { Todo } from '../../domain/todo/todo'

@Component({ name: 'AppTodoList' })
export default class AppTodoList extends Vue {
  @Inject(TYPES.COMPLETE_TODO_CMD)
  readonly completeTodoCmd!: CompleteTodoCmd

  @Prop({ required: true })
  todos!: Todo[]

  completeTodo(id: Id) {
    this.completeTodoCmd.execute(id)
    this.$emit('updated')
  }
}
</script>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
