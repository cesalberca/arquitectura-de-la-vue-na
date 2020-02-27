export interface Command<T = void, P = void> {
  execute(param: P): Promise<T>
}
