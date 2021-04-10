import { Service } from 'typedi'
import PrescriptionRepository from '../repositories/prescription'

@Service()
export default class PrescriptionService {

    private repository = new PrescriptionRepository()

    async create(fields: any) {
        return this.repository.createAndSave(fields)
    }

    async update(fields: any) {
        const query = { id: fields.id }

        const prescription = await this.repository
            .findOneOrFail({ where: query })

        return this.repository.save({
            ...query,
            ...prescription,
            ...fields
        })
    }

    async remove(id: string) {
        const query = { id }
        const prescription = await this.repository.findOneOrFail(query)
        await this.repository.remove({ ...prescription })

        return prescription
    }

    async find(id: string) {
        const query = { id }

        return this.repository.findOneOrFail({ where: query })
    }

    async findAll() {
        return this.repository.findAll()
    }

}
