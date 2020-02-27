import { Runner } from '../runner'
import { anything, instance, mock, verify, when } from 'ts-mockito'
import { LoggerLink } from '../logger-link'
import { ExecutorLink } from '../executor-link'
import { UseCase } from '../../use-cases/use-case'

describe('Runner', () => {
  it('should create the chain', () => {
    const { loggerLink, executorLink } = setup()

    verify(executorLink.setNext(instance(loggerLink))).once()
  })

  it('should start the chain', () => {
    const { executorLink, runner } = setup()
    const useCase = mock<UseCase>()

    runner.run(instance(useCase), 1)

    verify(executorLink.next(anything())).once()
  })
})

function setup() {
  const executorLink = mock(ExecutorLink)
  const loggerLink = mock(LoggerLink)

  when(executorLink.setNext(anything())).thenReturn(instance(executorLink))

  return {
    executorLink,
    loggerLink,
    runner: new Runner(instance(executorLink), instance(loggerLink))
  }
}
