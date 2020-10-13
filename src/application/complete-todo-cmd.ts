import { Injectable } from '../domain/di/injectable'
import { Inject } from '../domain/di/inject'
import { TYPES } from '../types'
import { Id } from '../domain/todo/id'
import { TodoRepository } from '../domain/todo/todo-repository'
import { TodoNotFoundError } from '../domain/todo/todo-not-found-error'
import { UseCase } from '../domain/use-cases/use-case'

@Injectable()
export class CompleteTodoCmd extends UseCase<void, Id> {
  constructor(@Inject(TYPES.TODO_REPOSITORY) private readonly todoRepository: TodoRepository) {
    super()
  }

  internalExecute(id: Id): void {
    const todos = this.todoRepository.findAll()
    const foundTodo = todos.find(todo => todo.id === id)

    if (foundTodo === undefined) {
      throw new TodoNotFoundError()
    }

    this.todoRepository.update(id, { ...foundTodo, completed: !foundTodo.completed })
  }
}
