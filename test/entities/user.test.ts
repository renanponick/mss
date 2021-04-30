import { skip, suite, test } from 'mocha-typescript'
import BaseTest, { expect } from '../utils/base-test'
import bcrypt from 'bcrypt'

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
    async ['should create a user']() {
        const input = {
            user: {
                login: "test doctor",
                password: "abc123"
                },
            name: "Doutor",
            crx: "123",
            ufCrx: "SC",
            cpf: "11111111111"
        }
        const doctor = await this.doctors.create(input)
        const user = await this.users.find(doctor.userId)

        expect(user.login).to.be.equal(input.user.login)
        expect(await bcrypt.compare(input.user.password, user.password))
            .to.be.equal(true)
        expect(user.type).to.be.equal(0)
    }

    @test
    async ['should update a activity user']() {
        const input = {
            userId: 'c85570e8-89d0-11eb-a43d-e37781ba023d',
            password: "abc123a",
            lastPassword: "abc123"
        }
        await this.users.update(input)
        const user = await this.users.find(input.userId)

        expect(user.id).to.be.equal(input.userId)
        expect(await bcrypt.compare(input.password, user.password))
            .to.be.equal(true)
    }

    @test @skip
    async ['should update a desctivity user and reactivate']() {
        const input = {
            userId: 'c85570e8-89d0-11eb-a43d-e37781ba023d',
            password: "abc123a",
            lastPassword: "abc123"
        }
        await this.users.update(input)
        const user = await this.users.find(input.userId)

        expect(user.id).to.be.equal(input.userId)
        expect(await bcrypt.compare(input.password, user.password))
            .to.be.equal(true)
    }

    @test @skip
    async ['should deactive a doctor']() {
        //await expect().rejectedWith(MESSAGE_OF_NOT_FOUND)
    }

}
