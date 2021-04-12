import { EntityRepository, Repository } from 'typeorm'
import Doctor from '../models/doctor'
import { plainToClass } from 'class-transformer'

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
