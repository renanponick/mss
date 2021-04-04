import { omit } from 'ramda'
import { Inject, Service } from 'typedi'
import { InjectRepository } from 'typeorm-typedi-extensions'

import DoctorRepository from '../repositories/doctor'
import { CreateDoctor } from './types'
import UserService from './user'

@Service()
export default class DoctorService {

    @InjectRepository(DoctorRepository)
    private readonly repository: DoctorRepository

    @Inject(_ => UserService)
    users: UserService

    async create(fields: CreateDoctor) {
        const input = {
            login: fields.user.login,
            password: fields.user.password,
            type: 0
        }
        const user = await this.users.create(input)

        const doctor = {
            userId: user.id,
            ...omit(['user'], fields)
        }

        return this.repository.createAndSave(doctor)
    }

    async update(fields: any) {
        const query = { id: fields.id }

        const doctor = await this.repository
            .findOneOrFail({ where: query })

        return this.repository.save({
            ...query,
            ...doctor,
            ...fields
        })
    }

    async find(id: string) {
        const query = { id }

        return this.repository.findOneOrFail({ where: query })
    }

    async findAll() {
        return this.repository.findAll()
    }

}
