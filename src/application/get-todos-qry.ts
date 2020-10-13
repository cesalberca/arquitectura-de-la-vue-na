import { TYPES } from '../types'
import { Inject } from '../domain/di/inject'
import { Todo } from '../domain/todo/todo'
import { Injectable } from '../domain/di/injectable'
import { TodoRepository } from '../domain/todo/todo-repository'
import { UseCase } from '../domain/use-cases/use-case'

@Injectable()
export class GetTodosQry extends UseCase<Todo[]> {
  constructor(@Inject(TYPES.TODO_REPOSITORY) private readonly todoRepository: TodoRepository) {
    super()
  }

  internalExecute(): Todo[] {
    return this.todoRepository.findAll()
  }
}
