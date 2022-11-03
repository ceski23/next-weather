export const assertUnreachable = (_: never, message: string): never => {
  throw new Error(message);
}