export interface Logger {
  log(message: string): void
  group(label: string): void
  groupEnd(): void
  object<T>(object: T): void
  info(message: string): void
}
