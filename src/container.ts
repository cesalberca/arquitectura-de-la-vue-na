import { interfaces } from 'inversify'
import { container } from 'inversify-props'
import { TYPES } from './types'
import { Logger } from './domain/use-cases/logger'
import { Application } from './ui/application'
import Vue, { VueConstructor } from 'vue'
import { StateManager } from './application/state-manager'
import { VueStateManager } from './infrastructure/vue-state-manager'
import { CreateTodoCmd } from './application/commands/create-todo-cmd'
import { GetTodosQry } from './application/queries/get-todos-qry'
import { CompleteTodoCmd } from './application/commands/complete-todo-cmd'
import { Runner } from './domain/runner/runner'
import { ExecutorLink } from './domain/runner/executor-link'
import { LoggerLink } from './domain/runner/logger-link'
import { ConsoleLogger } from './infrastructure/console-logger'
import { TodoRepository } from './domain/todo/todo-repository'
import { TodoInMemoryRepository } from './infrastructure/todo-in-memory-repository'

export class Container {
  private static _instance: Container | null = null
  private readonly _container: interfaces.Container

  private constructor() {
    container
      .bind<Logger>(TYPES.LOGGER)
      .to(ConsoleLogger)
      .inSingletonScope()
    container.bind<Window>(TYPES.WINDOW).toConstantValue(window)
    container
      .bind<StateManager>(TYPES.STATE_MANAGER)
      .to(VueStateManager)
      .inSingletonScope()
    container
      .bind<Application>(TYPES.APPLICATION)
      .to(Application)
      .inSingletonScope()
    container.bind<VueConstructor>(TYPES.VUE).toConstantValue(Vue)
    container
      .bind<CreateTodoCmd>(TYPES.CREATE_TODO_CMD)
      .to(CreateTodoCmd)
      .inSingletonScope()
    container
      .bind<GetTodosQry>(TYPES.GET_TODOS_QRY)
      .to(GetTodosQry)
      .inSingletonScope()
    container
      .bind<CompleteTodoCmd>(TYPES.COMPLETE_TODO_CMD)
      .to(CompleteTodoCmd)
      .inSingletonScope()
    container
      .bind<Runner>(TYPES.RUNNER)
      .to(Runner)
      .inSingletonScope()
    container
      .bind<ExecutorLink>(TYPES.EXECUTOR_LINK)
      .to(ExecutorLink)
      .inSingletonScope()
    container
      .bind<LoggerLink>(TYPES.LOGGER_LINK)
      .to(LoggerLink)
      .inSingletonScope()
    container
      .bind<TodoRepository>(TYPES.TODO_REPOSITORY)
      .to(TodoInMemoryRepository)
      .inSingletonScope()

    this._container = container
  }

  static instance() {
    if (this._instance === null) {
      Container._instance = new Container()
    }

    return this._instance!._container
  }
}
