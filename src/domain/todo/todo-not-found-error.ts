export class TodoNotFoundError extends Error {
  constructor() {
    super('The todo with the given Id was not found')
  }
}
