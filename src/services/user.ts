import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'
import bcrypt from 'bcrypt'
import UserRepository from '../repositories/user'
import { AuthUser } from '../type'

@Service()
export default class UserService {

    async hashPassword(plainPassword: string) {
        if (plainPassword === '') {
            // The password should not be empty
            throw new Error('A senha não pode ser vazia')
        }

        return bcrypt.hash(plainPassword, 10)
    }

    async create(fields: AuthUser) {
        const repository = getCustomRepository(UserRepository)
        const password = await this.hashPassword(fields.password)

        return repository.createAndSave({
            ...fields,
            password
        })
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
