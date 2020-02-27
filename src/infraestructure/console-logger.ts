import { Logger } from '../domain/use-cases/logger'
import { Injectable } from '../domain/di/injectable'
import { Inject } from '../domain/di/inject'
import { TYPES } from '../types'

@Injectable()
export class ConsoleLogger implements Logger {
  constructor(@Inject(TYPES.WINDOW) private readonly window: Window) {}

  object<T>(object: T): void {
    this.window.console.dir(object)
  }

  groupEnd(): void {
    this.window.console.groupEnd()
  }

  info(message: string): void {
    this.window.console.info(message)
  }

  group(label: string): void {
    this.window.console.group(label)
  }

  log(message: string): void {
    this.window.console.log(message)
  }
}
