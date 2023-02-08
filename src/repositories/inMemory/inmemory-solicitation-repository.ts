import Solicitation from '@/entities/solicitation/solicitation'
import { IRepositoryCount, IRepositoryCreate } from '../irepository'

export interface IRepositorySolicitation
  extends
    IRepositoryCreate<Solicitation>,
    IRepositoryCount<Solicitation>
{}

export class InMemorySolicitationRepository implements IRepositorySolicitation {
  private solicitationList: Solicitation[] = []
  
  async create(solicitation: Solicitation): Promise<void> {
    await this.solicitationList.push(solicitation)
  }

  async count(): Promise<number> {
    return await this.solicitationList.length
  }
}