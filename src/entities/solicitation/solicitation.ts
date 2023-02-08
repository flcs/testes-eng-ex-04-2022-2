import SolicitationStatus from './solicitation-status'

class Solicitation {
  private id: string
  private title: string
  private createdAt: Date
  private status: SolicitationStatus
  private cost: number

  constructor(id: string, title: string, createdAt: Date, cost: number) {
    this.id = id
    this.title = title
    this.createdAt = createdAt
    this.status = 'Opened'
    this.cost = cost
  }

  getID(): string {
    return this.id
  }

  getTitle(): string {
    return this.title
  }

  getCreatedAt(): Date {
    return this.createdAt
  }

  getStatus(): SolicitationStatus {
    return this.status
  }

  getCost(): number {
    return this.cost
  }
}

export default Solicitation