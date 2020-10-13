import { CreateTodoCmd } from '../create-todo-cmd'
import { capture, instance, mock, when } from 'ts-mockito'
import { TodoRepository } from '../../domain/todo/todo-repository'

describe('CreateTodoCmd', () => {
  it('should create a new todo with an initial id', () => {
    const { todoRepository, createTodoCmd } = setup()
    when(todoRepository.findAll()).thenReturn([])

    createTodoCmd.internalExecute('foo')

    const [actual] = capture(todoRepository.create).last()
    expect(actual).toEqual({ completed: false, text: 'foo', id: 1 })
  })

  it('should create a new todo with a consecutive id', () => {
    const { todoRepository, createTodoCmd } = setup()
    when(todoRepository.findAll()).thenReturn([{ completed: false, text: 'irrelevant', id: 3 }])

    createTodoCmd.internalExecute('foo')

    const [actual] = capture(todoRepository.create).last()
    expect(actual).toEqual({ completed: false, text: 'foo', id: 4 })
  })
})

function setup() {
  const todoRepository = mock<TodoRepository>()

  return {
    todoRepository,
    createTodoCmd: new CreateTodoCmd(instance(todoRepository))
  }
}
