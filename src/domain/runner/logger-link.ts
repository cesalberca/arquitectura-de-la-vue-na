import { BaseLink } from './base-link'
import { Context } from './context'
import { TYPES } from '../../types'
import { Injectable } from '../di/injectable'
import { Inject } from '../di/inject'
import { Logger } from '../use-cases/logger'

@Injectable()
export class LoggerLink extends BaseLink {
  constructor(@Inject(TYPES.LOGGER) private readonly logger: Logger) {
    super()
  }

  next(context: Context): void {
    this.logger.log(context.useCase.constructor.name)
    this.logger.log(`Parameters: ${context.param !== undefined ? context.param : '-'}`)
    this.nextLink.next(context)
  }
}
