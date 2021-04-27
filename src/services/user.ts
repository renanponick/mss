import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'
import bcrypt from 'bcrypt'
import UserRepository from '../repositories/user'
import { AuthUser, UpdateUser } from '../type'
import { omit } from 'ramda'

@Service()
export default class UserService {

    async hashPassword(plainPassword: string) {
        if (plainPassword === '') {
            throw new Error('A senha não pode ser vazia')
        }

        return bcrypt.hash(plainPassword, 10)
    }

    async create(fields: AuthUser) {
        const repository = getCustomRepository(UserRepository)
        const password = await this.hashPassword(fields.password)

        const result = await repository.createAndSave({
            ...fields,
            password
        })

        return omit(['password'], result)
    }

    async update(fields: UpdateUser) {
        const repository = getCustomRepository(UserRepository)
        const query = { id: fields.userId }

        const user = await repository
            .findOneOrFail({ where: query })

        if(!await bcrypt.compare(fields.lastPassword, user.password)){
            throw new Error('A senha anterior não confere')
        }

        const password = await this.hashPassword(fields.password)
        const result = await repository.save({
            ...query,
            ...user,
            password,
            isActive: true
        })

        return omit(['password'], result)
    }

    async remove(id: string) {
        const repository = getCustomRepository(UserRepository)
        const query = { id }

        const user = await repository
            .findOneOrFail({ where: query })

        const result = await repository.save({
            ...query,
            ...user,
            isActive: false
        })

        return omit(['password'], result)
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
