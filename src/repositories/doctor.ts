import { EntityRepository, Repository } from 'typeorm'
import Doctor from '../models/doctor'


@EntityRepository(Doctor)
export default class DoctorRepository extends Repository<Doctor> {

    async findAll() {
        const query = this.createQueryBuilder('doctor')
        return query.getMany()
    }

    async createAndSave(fields: object) {
        return this.save(fields)
    }

}
