import Vue from 'vue'
import { Injectable } from '../domain/di/injectable'
import { BaseStateManager } from '../application/base-state-manager'
import { State } from '../application/state'
import { Observer } from '../domain/observer/observer'

@Injectable()
export class VueStateManager extends BaseStateManager implements Observer {
  private _state: State

  constructor() {
    super()
    this._state = Vue.observable(new State())
  }

  get state(): State {
    return this._state
  }

  set state(value: State) {
    this._state = value
    this.notifyAll()
  }

  notify() {
    // TODO: Fix this
    this._state.loading = true
  }
}
