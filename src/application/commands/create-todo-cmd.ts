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

  internalExecute(text: string): void {
    const todos = this.stateManager.state.todos
    const currentId =
      todos
        .map(todo => todo.id)
        .slice()
        .sort()
        .reverse()[0] ?? 0

    const newTodo: Todo = {
      id: currentId + 1,
      completed: false,
      text
    }
    this.stateManager.patch({ todos: [...todos, newTodo] })
  }
}
