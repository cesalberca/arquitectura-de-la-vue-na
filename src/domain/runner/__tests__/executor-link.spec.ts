import { ExecutorLink } from '../executor-link'
import { instance, mock, verify, when } from 'ts-mockito'
import { UseCase } from '../../use-cases/use-case'

describe('ExecutorLink', () => {
  it('should execute a use case with the given parameter', () => {
    const { executorLink } = setup()
    const useCase = mock<UseCase<string, string>>()
    const context = { useCase: instance(useCase), result: undefined, param: 'foo' }

    executorLink.next(context)

    verify(useCase.internalExecute('foo')).once()
  })

  it('should save the result in the context', () => {
    const { executorLink } = setup()
    const useCase = mock<UseCase<string, string>>()
    when(useCase.internalExecute('foo')).thenReturn('bar')
    const context = { useCase: instance(useCase), result: undefined, param: 'foo' }

    executorLink.next(context)

    expect(context.result).toBe('bar')
  })
})

function setup() {
  return {
    executorLink: new ExecutorLink()
  }
}
