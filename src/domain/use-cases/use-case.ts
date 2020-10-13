import { container } from 'inversify-props'
import { TYPES } from '../../types'
import { Runner } from '../runner/runner'

export abstract class UseCase<Result = void, Param = void> {
  abstract internalExecute(param: Param): Result

  execute(param: Param): Result {
    return container.get<Runner>(TYPES.RUNNER).run(this, param) as Result
  }
}
