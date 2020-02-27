import { interfaces } from 'inversify'
import { container } from 'inversify-props'
import { TYPES } from './types'
import { Logger } from './domain/logger'
import { Application } from './ui/application'
import Vue, { VueConstructor } from 'vue'
import { StateManager } from './application/state-manager'
import { BaseStateManager } from './application/base-state-manager'
import { VueStateManager } from './infraestructure/vue-state-manager'
import { UseCaseDecorator } from './application/use-case-decorator'

export class Container {
  private static _instance: Container | null = null
  private readonly _container: interfaces.Container

  private constructor() {
    container
      .bind<UseCaseDecorator>(TYPES.USE_CASE_DECORATOR)
      .to(UseCaseDecorator)
      .inSingletonScope()
    container.bind<Logger>(TYPES.LOGGER).toConstantValue(window.console)
    container
      .bind<StateManager>(TYPES.STATE_MANAGER)
      .to(VueStateManager)
      .inSingletonScope()
    container
      .bind<BaseStateManager>(TYPES.BASE_STATE_MANAGER)
      .to(BaseStateManager)
      .inSingletonScope()
    container
      .bind<Application>(TYPES.APPLICATION)
      .to(Application)
      .inSingletonScope()
    container.bind<VueConstructor>(TYPES.VUE).toConstantValue(Vue)

    this._container = container
  }

  static instance() {
    if (this._instance === null) {
      Container._instance = new Container()
    }

    return this._instance!._container
  }
}
