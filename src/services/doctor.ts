import { omit } from 'ramda'
import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import DoctorRepository from '../repositories/doctor'
import { CreateDoctor, UpdateDoctor } from './types'
import UserService from './user'

@Service()
export default class DoctorService {
        
    async create(fields: CreateDoctor) {
        const repository = getCustomRepository(DoctorRepository)
        const users: UserService = new UserService()
        const input = {
            login: fields.user.login,
            password: fields.user.password,
            type: 0
        }
        const user = await users.create(input)

        const doctor = {
            userId: user.id,
            ...omit(['user'], fields)
        }

        return repository.createAndSave(doctor)
    }

    async update(fields: UpdateDoctor) {
        const repository = getCustomRepository(DoctorRepository)
        const query = { id: fields.id }

        const doctor = await repository
            .findOneOrFail({ where: query })

        return repository.save({
            ...query,
            ...doctor,
            ...fields
        })
    }

    async delete(id: string) {
        const repository = getCustomRepository(DoctorRepository)
        const query = { id }

        const doctor = await repository
            .findOneOrFail({ where: query })

        return repository.save({
            ...query,
            ...doctor,
            isActive: false
        })
    }

    async find(id: string) {
        const repository = getCustomRepository(DoctorRepository)
        const query = { id }

        return repository.findOneOrFail({ where: query })
    }

    async findAll() {
        const repository = getCustomRepository(DoctorRepository)
        return repository.findAll()
    }

}
