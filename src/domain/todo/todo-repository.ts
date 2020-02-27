import { Todo } from './todo'
import { Id } from './id'

export interface TodoRepository {
  findAll(): Todo[]
  update(id: Id, todo: Partial<Todo>): void
  create(todo: Todo): void
}
