import { Injectable } from '../../domain/di/injectable'
import { Command } from '../../domain/use-cases/command'
import { Inject } from '../../domain/di/inject'
import { TYPES } from '../../types'
import { StateManager } from '../state-manager'
import { Id } from '../../domain/todo/id'

@Injectable()
export class CompleteTodoCmd extends Command<Id> {
  constructor(@Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager) {
    super()
  }

  internalExecute(id: Id): void {
    const todos = this.stateManager.state.todos
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
