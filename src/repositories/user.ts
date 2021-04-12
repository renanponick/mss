import { EntityRepository, Repository } from 'typeorm'
import { plainToClass } from 'class-transformer'

import User from '../models/user'

@EntityRepository(User)
export default class UserRepository extends Repository<User> {

    async findAll() { 
        return this
            .createQueryBuilder('user')
            .getMany()
    }

    async createAndSave(fields: object) {
        const entity = plainToClass(User, fields)
        return this.save(entity)
    }

}
