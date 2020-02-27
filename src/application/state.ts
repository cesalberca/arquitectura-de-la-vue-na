import { Todo } from '../domain/todo/todo'

export class State {
  loading = false
  todos: Todo[] = [{ completed: false, id: 1, text: 'Dar una Charla en VueJS Madrid' }]
}
