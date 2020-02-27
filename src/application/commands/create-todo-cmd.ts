import { Command } from '../../domain/use-cases/command'
import { StateManager } from '../state-manager'
import { TYPES } from '../../types'
import { Inject } from '../../domain/di/inject'
import { Todo } from '../../domain/todo/todo'
import { Injectable } from '../../domain/di/injectable'

@Injectable()
export class CreateTodoCmd extends Command<string> {
  constructor(@Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager) {
    super()
  }

  execute(text: string): void {
    const currentId =
      this.stateManager.state.todos
        .map(todo => todo.id)
        .slice()
        .sort()[0] ?? 0

    const newTodo: Todo = {
      id: currentId + 1,
      completed: false,
      text
    }
    this.stateManager.state.todos.push(newTodo)
  }
}
