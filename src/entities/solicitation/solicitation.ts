import SolicitationStatus from './solicitation-status'

class Solicitation {
  private id: string
  private title: string
  private createdAt: Date
  private status: SolicitationStatus
  private cost: number

  constructor(id: string, title: string, createdAt: Date, cost: number) {
    if(!this.validate(title)) throw new Error("Invalid input")
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

  finishSolicitation(): void {
    this.status = 'Finished'
  }

  private validate(title: string): boolean {
    const isTitleLengthGreaterThanThree = title.trim().length > 3
    const titleContainsAtLeastOneLetter = Boolean(title.trim().match(/[A-z]/g))
    return isTitleLengthGreaterThanThree && titleContainsAtLeastOneLetter
  }
}

export default Solicitation