import { Injectable } from './injectable'
import { Command } from './command'
import { Logger } from './logger'

@Injectable()
export class LoggerCommandDecorator implements Command<unknown, unknown> {
  constructor(
    private readonly decoratedCommand: Command<unknown, unknown>,
    private readonly logger: Logger
  ) {}

  execute(param: unknown): Promise<unknown> {
    this.logger.log(
      this.decoratedCommand.constructor.name +
        ' - ' +
        Object.getOwnPropertyNames(this.decoratedCommand)
    )
    return this.decoratedCommand.execute(param)
  }
}
