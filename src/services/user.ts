import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import UserRepository from '../repositories/user'

@Service()
export default class UserService {

    async create(fields: any) {
        const repository = getCustomRepository(UserRepository)
        return repository.createAndSave(fields)
    }

    async update(fields: any) {
        const repository = getCustomRepository(UserRepository)
        const query = { id: fields.id }

        const user = await repository
            .findOneOrFail({ where: query })

        return repository.save({
            ...query,
            ...user,
            ...fields
        })
    }

    async remove(id: string) {
        const repository = getCustomRepository(UserRepository)
        const query = { id }
        const user = await repository.findOneOrFail(query)
        await repository.remove({ ...user })

        return user
    }

    async find(id: string) {
        const repository = getCustomRepository(UserRepository)
        const query = { id }

        return repository.findOneOrFail({ where: query })
    }

    async findAll() {
        const repository = getCustomRepository(UserRepository)
        return repository.findAll()
    }

}
