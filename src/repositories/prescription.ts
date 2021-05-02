import { plainToClass } from 'class-transformer'
import { EntityRepository, Repository } from 'typeorm'
import Prescription from '../models/prescription'

@EntityRepository(Prescription)
export default class PrescriptionRepository extends Repository<Prescription> {

    async findAll() {
        const query = this.createQueryBuilder('prescription')
        return query.getMany()
    }

    async createAndSave(fields: object) {
        const entity = plainToClass(Prescription, fields)
        return this.save(entity)
    }

}
