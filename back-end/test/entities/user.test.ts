import { suite, test } from 'mocha-typescript'
import bcrypt from 'bcrypt'

import BaseTest, { expect } from '../utils/base-test'
import DoctorService from '../../src/services/doctor'
import UserService from '../../src/services/user'

@suite('users')
export default class UserTest extends BaseTest {

    private readonly doctors: DoctorService
    private readonly users: UserService

    constructor(
        doctors: DoctorService,
        users: UserService,
    ) {
        super()
        this.doctors = doctors
        this.users = users
    }

    @test
    async ['should create an user']() {
        const input = {
            user: {
                email: 'test doctor',
                password: 'abc123'
            },
            name: 'Doutor',
            crx: '123',
            ufCrx: 'SC',
            cpf: '11111111111',
            address: 'Rua',
            city: 'Joinville',
            province: 'SC',
            role: 'Psiquiatra'
        }
        const doctor = await this.doctors.create(input)
        const user = await this.users.find(doctor.userId)

        expect(user.email).to.be.equal(input.user.email)
        expect(await bcrypt.compare(input.user.password, user.password))
            .to.be.equal(true)
        expect(user.type).to.be.equal(0)
    }

    @test
    async ['should update am activity user']() {
        const input = {
            userId: 'c85570e8-89d0-11eb-a43d-e37781ba023d',
            password: 'abc123a',
            lastPassword: 'abc123'
        }
        await this.users.update(input)
        const user = await this.users.find(input.userId)

        expect(user.id).to.be.equal(input.userId)
        expect(await bcrypt.compare(input.password, user.password))
            .to.be.equal(true)
    }

    @test
    async ['should deactive an user']() {
        const input = 'c85570e8-89d0-11eb-a43d-e37781ba023d'
        await this.users.remove(input)
        const user = await this.users.find(input)

        expect(user.id).to.be.equal(input)
        expect(user.isActive).to.be.equal(false)
    }

    @test
    async ['should update a desctivity user and reactivate']() {
        const userId = 'c85570e8-89d0-11eb-a43d-e37781ba023d'
        await this.users.remove(userId)
        const userDeactivate = await this.users.find(userId)

        expect(userDeactivate.id).to.be.equal(userId)
        expect(userDeactivate.isActive).to.be.equal(false)

        const input = {
            userId,
            password: 'abc123a',
            lastPassword: 'abc123'
        }

        await this.users.update(input)
        const user = await this.users.find(input.userId)

        expect(user.id).to.be.equal(input.userId)
        expect(await bcrypt.compare(input.password, user.password))
            .to.be.equal(true)
        expect(user.isActive).to.be.equal(true)
    }

}
