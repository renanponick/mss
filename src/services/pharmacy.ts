import { Service } from 'typedi'
import { CreatePharmacy, UpdatePharmacy } from '../type'
import PharmacyRepository from '../repositories/pharmacy'

@Service()
export default class PharmacyService {

    private repository = new PharmacyRepository()

    async create(fields: CreatePharmacy) {
        return this.repository.createAndSave(fields)
    }

    async update(fields: UpdatePharmacy) {
        const query = { id: fields.id }

        const pharmacy = await this.repository
            .findOneOrFail({ where: query })

        return this.repository.save({
            ...query,
            ...pharmacy,
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
