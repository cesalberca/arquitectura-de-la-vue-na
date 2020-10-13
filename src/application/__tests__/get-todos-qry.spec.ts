import { GetTodosQry } from '../get-todos-qry'
import { instance, mock, when } from 'ts-mockito'
import { TodoRepository } from '../../domain/todo/todo-repository'

describe('GetTodosQry', () => {
  it('should get the todos', () => {
    const { getTodosQry, todoRepository } = setup()
    when(todoRepository.findAll()).thenReturn([{ id: 1, completed: false, text: 'irrelevant' }])

    const actual = getTodosQry.internalExecute()

    expect(actual).toEqual([{ id: 1, completed: false, text: 'irrelevant' }])
  })
})

function setup() {
  const todoRepository = mock<TodoRepository>()
  return {
    todoRepository,
    getTodosQry: new GetTodosQry(instance(todoRepository))
  }
}
