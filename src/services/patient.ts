import { Service } from 'typedi'
import { CreatePatient, UpdatePatient } from '../type'
import PatientRepository from '../repositories/patient'

@Service()
export default class PatientService {

    private repository = new PatientRepository()

    async create(fields: CreatePatient) {
        return this.repository.createAndSave(fields)
    }

    async update(fields: UpdatePatient) {
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
