import { Injectable } from '../domain/injectable'
import { Command } from '../domain/command'
import { Logger } from '../domain/logger'
import { LoggerCommandDecorator } from '../domain/logger-command-decorator'

@Injectable()
export class UseCaseDecorator {
  constructor(private readonly logger: Logger) {}

  decorate<T>(commandToBeDecorated: Command<unknown, unknown>): T {
    return (new LoggerCommandDecorator(commandToBeDecorated, this.logger) as unknown) as T
  }
}
