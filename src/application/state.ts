import { Todo } from '../domain/todo'

export class State {
  loading = false
  todos: Todo[] = []
}
