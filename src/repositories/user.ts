import { EntityRepository, Repository } from 'typeorm'

import User from '../models/user'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

    async findAll() {
        const query = this.createQueryBuilder('user')
        return query.getMany()
    }

    async createAndSave(fields: object) {
        return this.save(fields)
    }

}
