import { CompleteTodoCmd } from '../complete-todo-cmd'
import { capture, instance, mock, when } from 'ts-mockito'
import { TodoRepository } from '../../domain/todo/todo-repository'

describe('CompleteTodoCmd', () => {
  it('should mark as completed a todo that was not completed', () => {
    const { todoRepository, completeTodoCmd } = setup()
    when(todoRepository.findAll()).thenReturn([{ completed: false, id: 1, text: 'irrelevant' }])

    completeTodoCmd.internalExecute(1)

    const [id, todo] = capture(todoRepository.update).last()
    expect(id).toBe(1)
    expect(todo).toEqual({ completed: true, id: 1, text: 'irrelevant' })
  })

  it('should mark as not completed a todo that was completed', () => {
    const { todoRepository, completeTodoCmd } = setup()
    when(todoRepository.findAll()).thenReturn([{ completed: true, id: 1, text: 'irrelevant' }])

    completeTodoCmd.internalExecute(1)

    const [id, todo] = capture(todoRepository.update).last()
    expect(id).toBe(1)
    expect(todo).toEqual({ completed: false, id: 1, text: 'irrelevant' })
  })
})

function setup() {
  const todoRepository = mock<TodoRepository>()
  return {
    todoRepository,
    completeTodoCmd: new CompleteTodoCmd(instance(todoRepository))
  }
}
