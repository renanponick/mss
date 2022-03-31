import { EntityRepository, Repository } from 'typeorm'

import Patient from '../models/patient'

@EntityRepository(Patient)
export default class PatientRepository extends Repository<Patient> {

    async findAll() {
        const query = this.createQueryBuilder('patient')

        return query.getMany()
    }

    async createAndSave(fields: object) {
        return this.save(fields)
    }

}
