import { Injectable } from '../di/injectable'
import { LoggerLink } from './logger-link'
import { ExecutorLink } from './executor-link'
import { UseCase } from '../use-cases/use-case'
import { Inject } from '../di/inject'
import { TYPES } from '../../types'

@Injectable()
export class Runner {
  chain = this.executorLink.setNext(this.loggerLink)

  constructor(
    @Inject(TYPES.EXECUTOR_LINK) private readonly executorLink: ExecutorLink,
    @Inject(TYPES.LOGGER_LINK) private readonly loggerLink: LoggerLink
  ) {}

  run(useCase: UseCase<unknown, unknown>, param: unknown): unknown {
    const context = { useCase, result: undefined, param }
    this.chain.next(context)
    return context.result
  }
}
