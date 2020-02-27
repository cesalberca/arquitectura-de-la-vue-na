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
    const foundTodo = this.stateManager.state.todos.find(todo => todo.id === id)
    if (foundTodo !== undefined) {
      foundTodo.completed = !foundTodo.completed
    }
  }
}
