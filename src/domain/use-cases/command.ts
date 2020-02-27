import { UseCase } from './use-case'

export abstract class Command<Param = void> extends UseCase<void, Param> {
  readonly = false
}
