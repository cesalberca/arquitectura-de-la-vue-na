import 'reflect-metadata'
import { Application } from './ui/application'
import { Container } from './container'
import { TYPES } from './types'
import App from './ui/App.vue'

Container.instance()
  .get<Application>(TYPES.APPLICATION)
  .create(App)
