import { LoggerLink } from '../logger-link'
import { capture, instance, mock } from 'ts-mockito'
import { Logger } from '../../use-cases/logger'
import { UseCase } from '../../use-cases/use-case'

describe('LoggerLink', () => {
  it("should log information about the use case's properties", () => {
    const { loggerLink, logger } = setup()
    const useCase = mock<UseCase>()

    loggerLink.next({ result: undefined, useCase: instance(useCase), param: 'foo' })

    const [name] = capture(logger.group).first()
    const [parameters] = capture(logger.group).second()
    const [result] = capture(logger.group).third()
    expect(name).toBe('Object')
    expect(parameters).toBe('Parameters')
    expect(result).toBe('Result')
  })

  it('should log the parameters', () => {
    const { loggerLink, logger } = setup()
    const useCase = mock<UseCase>()

    loggerLink.next({ result: undefined, useCase: instance(useCase), param: 'foo' })

    const [actual] = capture(logger.log).first()
    expect(actual).toBe('foo')
  })

  it('should log the result', () => {
    const { loggerLink, logger } = setup()
    const useCase = mock<UseCase>()

    loggerLink.next({ result: 'foo', useCase: instance(useCase), param: undefined })

    const [actual] = capture(logger.object).first()
    expect(actual).toBe('foo')
  })
})

function setup() {
  const logger = mock<Logger>()
  return {
    logger,
    loggerLink: new LoggerLink(instance(logger))
  }
}
