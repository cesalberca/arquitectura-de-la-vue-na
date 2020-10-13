import { TYPES } from '../types'
import { Inject } from '../domain/di/inject'
import { Todo } from '../domain/todo/todo'
import { Injectable } from '../domain/di/injectable'
import { TodoRepository } from '../domain/todo/todo-repository'
import { UseCase } from '../domain/use-cases/use-case'

@Injectable()
export class CreateTodoCmd extends UseCase<void, string> {
  constructor(@Inject(TYPES.TODO_REPOSITORY) private readonly todoRepository: TodoRepository) {
    super()
  }

  internalExecute(text: string): void {
    const todos = this.todoRepository.findAll()
    const currentId =
      todos
        .map(todo => todo.id)
        .slice()
        .sort()
        .reverse()[0] ?? 0

    const newTodo: Todo = {
      id: currentId + 1,
      completed: false,
      text
    }
    this.todoRepository.create(newTodo)
  }
}
