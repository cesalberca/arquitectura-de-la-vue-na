import { GetTodosQry } from '../get-todos-qry'
import { instance, mock, verify, when } from 'ts-mockito'
import { StateManager } from '../../state-manager'
import { TodoRepository } from '../../../domain/todo/todo-repository'

describe('GetTodosQry', () => {
  it('should get the todos', () => {
    const { stateManager, getTodosQry } = setup()
    when(stateManager.state).thenReturn({
      todos: [{ id: 1, completed: false, text: 'irrelevant' }]
    })

    const actual = getTodosQry.internalExecute()

    expect(actual).toEqual([{ id: 1, completed: false, text: 'irrelevant' }])
  })

  it("should find the todos and get them if there weren't any previously", () => {
    const { stateManager, getTodosQry, todoRepository } = setup()
    when(stateManager.state)
      .thenReturn({
        todos: []
      })
      .thenReturn({ todos: [{ id: 1, completed: false, text: 'irrelevant' }] })
    when(todoRepository.findAll()).thenReturn([{ id: 1, completed: false, text: 'irrelevant' }])

    const actual = getTodosQry.internalExecute()

    expect(actual).toEqual([{ id: 1, completed: false, text: 'irrelevant' }])
    verify(todoRepository.findAll()).once()
  })
})

function setup() {
  const stateManager = mock<StateManager>()
  const todoRepository = mock<TodoRepository>()
  return {
    stateManager,
    todoRepository,
    getTodosQry: new GetTodosQry(instance(stateManager), instance(todoRepository))
  }
}
