import { StateManager } from '../state-manager'
import { TYPES } from '../../types'
import { Inject } from '../../domain/di/inject'
import { Todo } from '../../domain/todo/todo'
import { Injectable } from '../../domain/di/injectable'
import { Query } from '../../domain/use-cases/query'
import { TodoRepository } from '../../domain/todo/todo-repository'

@Injectable()
export class GetTodosQry extends Query<Todo[]> {
  constructor(
    @Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager,
    @Inject(TYPES.TODO_REPOSITORY) private readonly todoRepository: TodoRepository
  ) {
    super()
  }

  internalExecute(): Todo[] {
    if (this.stateManager.state.todos.length === 0) {
      const todos = this.todoRepository.findAll()
      this.stateManager.patch({ todos })
    }
    return this.stateManager.state.todos
  }
}
