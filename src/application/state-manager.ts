import { State } from './state'
import { Subject } from '../domain/subject'

export interface StateManager extends Subject {
  state: State
}
