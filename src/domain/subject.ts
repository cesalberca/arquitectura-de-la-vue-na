import { Observer } from './observer'

export interface Subject {
  register: (observer: Observer) => void
  notifyAll: () => void
}
