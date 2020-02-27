import { CreateTodoCmd } from '../create-todo-cmd'
import { capture, instance, mock, when } from 'ts-mockito'
import { StateManager } from '../../state-manager'
import { TodoRepository } from '../../../domain/todo/todo-repository'

describe('CreateTodoCmd', () => {
  it('should create a new todo with an initial id', () => {
    const { stateManager, createTodoCmd } = setup()

    createTodoCmd.internalExecute('foo')

    const [actual] = capture(stateManager.patch).last()
    expect(actual).toEqual({ todos: [{ completed: false, text: 'foo', id: 1 }] })
  })

  it('should create a new todo with a consecutive id', () => {
    const { stateManager, createTodoCmd } = setup()
    when(stateManager.state).thenReturn({
      todos: [{ completed: false, text: 'irrelevant', id: 3 }]
    })

    createTodoCmd.internalExecute('foo')

    const [actual] = capture(stateManager.patch).last()
    expect(actual.todos).toContainEqual({ completed: false, text: 'foo', id: 4 })
  })
})

function setup() {
  const stateManager = mock<StateManager>()
  const todoRepository = mock<TodoRepository>()

  when(stateManager.state).thenReturn({ todos: [] })
  return {
    stateManager,
    createTodoCmd: new CreateTodoCmd(instance(stateManager), instance(todoRepository))
  }
}
