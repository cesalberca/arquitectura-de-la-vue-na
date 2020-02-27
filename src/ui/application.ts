import { VueConstructor } from 'vue'
import { TYPES } from '../types'
import { Injectable } from '../domain/di/injectable'
import { Inject } from '../domain/di/inject'

@Injectable()
export class Application {
  constructor(@Inject(TYPES.VUE) private readonly vue: VueConstructor) {}

  create(app: VueConstructor) {
    this.vue.config.productionTip = false

    return new this.vue({
      render: create => create(app)
    }).$mount('#app')
  }
}
