import Solicitation from '@/entities/solicitation/solicitation'
import { IRepositoryCount, IRepositoryCreate, IRepositoryFindById } from '../irepository'

export interface IRepositorySolicitation
  extends
    IRepositoryCreate<Solicitation>,
    IRepositoryCount<Solicitation>,
    IRepositoryFindById<Solicitation>
{}

export class InMemorySolicitationRepository implements IRepositorySolicitation {
  private solicitationList: Solicitation[] = []
  
  async create(solicitation: Solicitation): Promise<void> {
    await this.solicitationList.push(solicitation)
  }

  async count(): Promise<number> {
    return await this.solicitationList.length
  }

  async findById(id: string): Promise<Solicitation | undefined> {
    return this.solicitationList.find(solicitation => solicitation.getID() === id)
  }
}