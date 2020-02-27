import { UseCase } from '../use-cases/use-case'

export interface Context {
  result: unknown
  param: unknown
  useCase: UseCase<unknown, unknown>
}
