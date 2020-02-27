import { StateManager } from '../state-manager'
import { TYPES } from '../../types'
import { Inject } from '../../domain/di/inject'
import { Todo } from '../../domain/todo/todo'
import { Injectable } from '../../domain/di/injectable'
import { Query } from '../../domain/use-cases/query'

@Injectable()
export class GetTodosQry extends Query<Todo[]> {
  constructor(@Inject(TYPES.STATE_MANAGER) private readonly stateManager: StateManager) {
    super()
  }

  execute(): Todo[] {
    return this.stateManager.state.todos
  }
}
