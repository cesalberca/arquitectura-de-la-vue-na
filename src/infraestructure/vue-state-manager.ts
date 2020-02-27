import Vue from 'vue'
import { Injectable } from '../domain/di/injectable'
import { State } from '../application/state'
import { Observer } from '../domain/observer/observer'
import { StateManager } from '../application/state-manager'

@Injectable()
export class VueStateManager implements StateManager {
  private _state: State = Vue.observable(new State())

  get state(): State {
    return this._state
  }

  set state(value: State) {
    this._state = value
    this.notifyAll()
  }

  private readonly observers: Observer[] = []

  notifyAll() {
    this.observers.forEach(observer => observer.notify())
  }

  register(observer: Observer) {
    this.observers.push(observer)
  }
}
