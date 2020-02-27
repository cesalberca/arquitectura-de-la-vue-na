<template>
  <div>
    <form @submit="event => event.preventDefault()">
      <app-input v-model="todoText">Todo</app-input>
      <app-button @clicked="createTodo">Crear</app-button>
    </form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AppInput from '../components/app-input.vue'
import { Inject } from '../../domain/di/inject'
import { TYPES } from '../../types'
import { CreateTodoCmd } from '../../application/commands/create-todo-cmd'
import AppButton from '../components/app-button.vue'

@Component({ name: 'AppCreateTodo', components: { AppButton, AppInput } })
export default class AppCreateTodo extends Vue {
  @Inject(TYPES.CREATE_TODO_CMD)
  createTodoCmd!: CreateTodoCmd

  todoText = ''

  createTodo() {
    this.createTodoCmd.execute(this.todoText)
    this.todoText = ''
  }
}
</script>
