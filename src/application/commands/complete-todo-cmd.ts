import { Injectable } from '../../domain/di/injectable'
import { Command } from '../../domain/use-cases/command'
import { Inject } from '../../domain/di/inject'
import { TYPES } from '../../types'
import { StateManager } from '../state-manager'
import { Id } from '../../domain/todo/id'
import { TodoRepository } from '../../domain/todo/todo-repository'
import { TodoNotFoundError } from '../../domain/todo/todo-not-found-error'
import { Todo } from '../../domain/todo/todo'

@Injectable()
export class CompleteTodoCmd extends Command<Id> {
  constructor(
    @Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager,
    @Inject(TYPES.TODO_REPOSITORY) private readonly todoRepository: TodoRepository
  ) {
    super()
  }

  internalExecute(id: Id): void {
    const todos = this.stateManager.state.todos
    const foundTodo = todos.find(todo => todo.id === id)

    if (foundTodo === undefined) {
      throw new TodoNotFoundError()
    }

    this.todoRepository.update(id, { ...foundTodo, completed: !foundTodo.completed })
    this.updateState(id, todos)
  }

  private updateState(id: number, todos: Todo[]) {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        }
      }
      return todo
    })
    this.stateManager.patch({ todos: updatedTodos })
  }
}
