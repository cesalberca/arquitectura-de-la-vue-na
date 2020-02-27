import { Injectable } from '../di/injectable'
import { Logger } from './logger'
import { UseCase } from './use-case'

@Injectable()
export class LoggerCommandDecorator implements UseCase<unknown, unknown> {
  readonly = false

  constructor(
    private readonly decoratedCommand: UseCase<unknown, unknown>,
    private readonly logger: Logger
  ) {}

  execute(param: unknown): unknown {
    this.logger.log(
      this.decoratedCommand.constructor.name +
        ' - ' +
        Object.getOwnPropertyNames(this.decoratedCommand)
    )
    return this.decoratedCommand.execute(param)
  }
}
