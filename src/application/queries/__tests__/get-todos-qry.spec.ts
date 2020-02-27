import { GetTodosQry } from '../get-todos-qry'
import { instance, mock, when } from 'ts-mockito'
import { StateManager } from '../../state-manager'

describe('GetTodosQry', () => {
  it('should get the todos', () => {
    const { stateManager, getTodosQry } = setup()
    when(stateManager.state).thenReturn({
      todos: [{ id: 1, completed: false, text: 'irrelevant' }]
    })

    const actual = getTodosQry.internalExecute()

    expect(actual).toEqual([{ id: 1, completed: false, text: 'irrelevant' }])
  })
})

function setup() {
  const stateManager = mock<StateManager>()
  return {
    stateManager,
    getTodosQry: new GetTodosQry(instance(stateManager))
  }
}
