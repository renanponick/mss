import { EntityRepository, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import Doctor from '../models/doctor'

@EntityRepository(Doctor)
export default class DoctorRepository extends Repository<Doctor> {

    async findAll() {
        return this
            .createQueryBuilder('doctor')
            .getMany()
    }

    async createAndSave(fields: object) {
        const entity = plainToClass(Doctor, fields)

        return this.save(entity)
    }

}
