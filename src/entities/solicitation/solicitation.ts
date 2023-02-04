import SolicitationStatus from './solicitation-status'

class Solicitation {
  private id: string
  private title: string
  private createdAt: Date
  private status: SolicitationStatus

  constructor(id: string, title: string, createdAt: Date, status: SolicitationStatus) {
    this.id = id
    this.title = title
    this.createdAt = createdAt
    this.status = status
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
}

export default Solicitation