import { EntityRepository, Repository } from 'typeorm'
import Pharmacy from '../models/pharmacy'

@EntityRepository(Pharmacy)
export default class PharmacyRepository extends Repository<Pharmacy> {

    async findAll() {
        const query = this.createQueryBuilder('pharmacy')
        return query.getMany()
    }

    async createAndSave(fields: object) {
        return this.save(fields)
    }

}
