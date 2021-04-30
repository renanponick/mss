import { omit } from 'ramda'
import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

import PatientRepository from '../repositories/patient'
import { CreatePatient, UpdatePatient } from '../type'
import UserService from './user'

@Service()
export default class PatientService {

    async create(fields: CreatePatient) {
        const repository = getCustomRepository(PatientRepository)
        const users: UserService = new UserService()
        const input ={
            login: fields.user.login,
            password: fields.user.password,
            type: 1
        }
        const user = await users.create(input)

        const patient = {
            userId: user.id,
            ...omit(['user'], fields)
        }

        return repository.createAndSave(patient)
    }

    async update(fields: UpdatePatient) {
        const repository = getCustomRepository(PatientRepository)
        const query = { id: fields.id }

        const patient = await repository
            .findOneOrFail({ where: query })

        return repository.save({
            ...query,
            ...patient,
            ...fields
        })
    }

    async findUser(userId: string) {
        const repository = getCustomRepository(PatientRepository)
        const query = { userId }

        return repository.findOneOrFail({ where: query })
    }

    async find(id: string) {
        const repository = getCustomRepository(PatientRepository)
        const query = { id }

        return repository.findOneOrFail({ where: query })
    }

    async findAll() {
        const repository = getCustomRepository(PatientRepository)
        return repository.findAll()
    }

}
