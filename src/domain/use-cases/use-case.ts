export abstract class UseCase<Result = void, Param = void> {
  abstract readonly: boolean
  abstract execute(param: Param): Result
}
