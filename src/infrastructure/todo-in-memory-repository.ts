import { Injectable } from '../domain/di/injectable'
import { TodoRepository } from '../domain/todo/todo-repository'
import { Todo } from '../domain/todo/todo'
import { Id } from '../domain/todo/id'
import { TodoNotFoundError } from '../domain/todo/todo-not-found-error'

@Injectable()
export class TodoInMemoryRepository implements TodoRepository {
  private readonly todos = new Map<Id, Todo>()

  findAll(): Todo[] {
    return Array.from(this.todos.values())
  }

  update(id: number, todo: Partial<Todo>): void {
    const oldTodo = this.todos.get(id)

    if (oldTodo === undefined) {
      throw new TodoNotFoundError()
    }

    const updatedTodo: Todo = {
      ...oldTodo,
      ...todo
    }

    this.todos.set(id, updatedTodo)
  }

  create(todo: Todo): void {
    this.todos.set(todo.id, todo)
  }
}
