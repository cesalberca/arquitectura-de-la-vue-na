import { Injectable } from '../domain/di/injectable'
import { Logger } from '../domain/use-cases/logger'
import { LoggerCommandDecorator } from '../domain/use-cases/logger-command-decorator'
import { UseCase } from '../domain/use-cases/use-case'

@Injectable()
export class UseCaseDecorator {
  constructor(private readonly logger: Logger) {}

  decorate<T>(commandToBeDecorated: UseCase<unknown, unknown>): T {
    return (new LoggerCommandDecorator(commandToBeDecorated, this.logger) as unknown) as T
  }
}
