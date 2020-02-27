import { State } from './state'
import { Subject } from '../domain/observer/subject'

export interface StateManager extends Subject {
  state: State
}
