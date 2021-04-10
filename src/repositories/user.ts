import { EntityRepository, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import User from '../models/user'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

    async findAll() {
        const query = this.createQueryBuilder('user')
        return query.getMany()
    }

    async createAndSave(fields: object) {
        const entity = plainToClass(User, fields)
        console.log(Repository.toString())
        console.log(entity)
        return this.save(entity)
    }

}
