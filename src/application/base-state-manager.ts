import { State } from './state'
import { Injectable } from '../domain/injectable'
import { StateManager } from './state-manager'
import { Observer } from '../domain/observer'

@Injectable()
export class BaseStateManager implements StateManager {
  private readonly observers: Observer[] = []

  state = new State()

  notifyAll() {
    this.observers.forEach(observer => observer.notify())
  }

  register(observer: Observer) {
    this.observers.push(observer)
  }
}
