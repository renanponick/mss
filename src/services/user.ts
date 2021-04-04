import { Inject, Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'

import UserRepository from '../repositories/user'

@Service()
export default class UserService {

    @InjectRepository(UserRepository)
    private readonly repository: UserRepository

    async create(fields: any) {
        return this.repository.createAndSave(fields)
    }

    async update(fields: any) {
        const query = { id: fields.id }

        const user = await this.repository
            .findOneOrFail({ where: query })

        return this.repository.save({
            ...query,
            ...user,
            ...fields
        })
    }

    async remove(id: string) {
        const query = { id }
        const user = await this.repository.findOneOrFail(query)
        await this.repository.remove({ ...user })

        return user
    }

    async find(id: string) {
        const query = { id }

        return this.repository.findOneOrFail({ where: query })
    }

    async findAll() {
        return this.repository.findAll()
    }

}
