import { BaseLink } from './base-link'
import { Context } from './context'
import { Injectable } from '../di/injectable'

@Injectable()
export class ExecutorLink extends BaseLink {
  next(context: Context) {
    context.result = context.useCase.internalExecute(context.param)
    this.nextLink.next(context)
  }
}
