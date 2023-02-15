export class InvalidInputError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "InvalidInputError"
  }
}

export class ResourceNotFound extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ResourceNotFound"
  }
}