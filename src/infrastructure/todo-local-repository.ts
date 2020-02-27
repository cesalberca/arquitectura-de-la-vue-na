import { Injectable } from '../domain/di/injectable'
import { TodoRepository } from '../domain/todo/todo-repository'
import { Todo } from '../domain/todo/todo'
import { TodoNotFoundError } from '../domain/todo/todo-not-found-error'
import { Inject } from '../domain/di/inject'
import { TYPES } from '../types'

@Injectable()
export class TodoLocalRepository implements TodoRepository {
  constructor(@Inject(TYPES.WINDOW) private readonly window: Window) {}

  private static readonly TODOS_KEY = 'TODOS'

  findAll(): Todo[] {
    const foundTodos = this.window.localStorage.getItem(TodoLocalRepository.TODOS_KEY) ?? undefined
    if (foundTodos === undefined) {
      return []
    }
    return JSON.parse(foundTodos)
  }

  create(todo: Todo): void {
    const todos = this.getTodosFromStorage()

    this.window.localStorage.setItem(
      TodoLocalRepository.TODOS_KEY,
      JSON.stringify([...todos, todo])
    )
  }

  update(id: number, todo: Partial<Todo>): void {
    const todos = this.getTodosFromStorage()

    if (todos.length === 0) {
      throw new TodoNotFoundError()
    }

    const updatedTodos = todos.map(oldTodo => {
      if (oldTodo.id === id) {
        return {
          ...oldTodo,
          ...todo
        }
      }

      return oldTodo
    })

    this.window.localStorage.setItem(TodoLocalRepository.TODOS_KEY, JSON.stringify(updatedTodos))
  }

  private getTodosFromStorage() {
    const foundTodos = this.window.localStorage.getItem(TodoLocalRepository.TODOS_KEY) ?? undefined

    if (foundTodos === undefined) {
      return []
    }

    const todos: Todo[] = JSON.parse(foundTodos)
    return todos
  }
}
