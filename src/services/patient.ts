import { Inject, Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'
import PatientRepository from '../repositories/patient'

@Service()
export default class PatientService {

    @InjectRepository(PatientRepository)
    private readonly repository: PatientRepository

    async create(fields: any) {
        return this.repository.createAndSave(fields)
    }

    async update(fields: any) {
        const query = { id: fields.id }

        const patient = await this.repository
            .findOneOrFail({ where: query })

        return this.repository.save({
            ...query,
            ...patient,
            ...fields
        })
    }

    async find(id: string) {
        const query = { id }

        return this.repository.findOneOrFail({ where: query })
    }

    async findAll() {
        return this.repository.findAll()
    }

}
