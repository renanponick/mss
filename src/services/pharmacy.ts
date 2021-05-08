import { omit } from 'ramda'
import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import PharmacyRepository from '../repositories/pharmacy'
import { CreatePharmacy, UpdatePharmacy } from '../type'

import UserService from './user'

@Service()
export default class PharmacyService {

    async create(fields: CreatePharmacy) {
        const repository = getCustomRepository(PharmacyRepository)
        const users: UserService = new UserService()
        const input = {
            email: fields.user.email,
            password: fields.user.password,
            type: 2
        }
        const user = await users.create(input)

        const pharmacy = {
            userId: user.id,
            ...omit(['user'], fields)
        }

        return repository.createAndSave(pharmacy)
    }

    async update(fields: UpdatePharmacy) {
        const repository = getCustomRepository(PharmacyRepository)
        const query = { id: fields.id }

        const pharmacy = await repository
            .findOneOrFail({ where: query })

        return repository.save({
            ...query,
            ...pharmacy,
            ...fields
        })
    }

    async findUser(userId: string) {
        const repository = getCustomRepository(PharmacyRepository)
        const query = { userId }

        return repository.findOneOrFail({ where: query })
    }

    async find(id: string) {
        const repository = getCustomRepository(PharmacyRepository)
        const query = { id }

        return repository.findOneOrFail({ where: query })
    }

    async findAll() {
        const repository = getCustomRepository(PharmacyRepository)

        return repository.findAll()
    }

}
