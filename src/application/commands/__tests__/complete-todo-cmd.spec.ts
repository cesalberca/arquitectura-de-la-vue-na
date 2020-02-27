import { CompleteTodoCmd } from '../complete-todo-cmd'
import { capture, instance, mock, when } from 'ts-mockito'
import { StateManager } from '../../state-manager'
import { TodoRepository } from '../../../domain/todo/todo-repository'

describe('CompleteTodoCmd', () => {
  it('should mark as completed a todo that was not completed', () => {
    const { completeTodoCmd, stateManager } = setup()
    when(stateManager.state).thenReturn({
      todos: [{ completed: false, id: 1, text: 'irrelevant' }]
    })

    completeTodoCmd.internalExecute(1)

    const [actual] = capture(stateManager.patch).last()
    expect(actual.todos).toEqual([{ completed: true, id: 1, text: 'irrelevant' }])
  })

  it('should mark as not completed a todo that was completed', () => {
    const { completeTodoCmd, stateManager } = setup()
    when(stateManager.state).thenReturn({
      todos: [{ completed: true, id: 1, text: 'irrelevant' }]
    })

    completeTodoCmd.internalExecute(1)

    const [actual] = capture(stateManager.patch).last()
    expect(actual.todos).toEqual([{ completed: false, id: 1, text: 'irrelevant' }])
  })
})

function setup() {
  const stateManager = mock<StateManager>()
  when(stateManager.state).thenReturn({ todos: [] })
  const todoRepository = mock<TodoRepository>()
  return {
    todoRepository,
    stateManager,
    completeTodoCmd: new CompleteTodoCmd(instance(stateManager), instance(todoRepository))
  }
}
