export interface IRepositoryCreate<T> {
  create(t: T): Promise<void>
}

export interface IRepositoryCount<T> {
  count(): Promise<number>
}

export interface IRepositoryFindById<T> {
  findById(id: string): Promise<T | undefined>
}