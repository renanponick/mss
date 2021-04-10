import { EntityRepository, Repository } from 'typeorm'
import Doctor from '../models/doctor'
import { plainToClass } from 'class-transformer'

@EntityRepository(Doctor)
export default class DoctorRepository extends Repository<Doctor> {

    async findAll() {
        const query = this.createQueryBuilder('doctor')
        return query.getMany()
    }

    async createAndSave(fields: object) {
        const entity = plainToClass(Doctor, fields)
        console.log(entity)
        console.log(this)
        return this.save(entity)
    }

}
