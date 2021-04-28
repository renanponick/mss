import { skip, suite, test } from 'mocha-typescript'
import BaseTest, { expect } from '../utils/base-test'

import DoctorService from '../../src/services/doctor'

@suite('doctors')
export default class DoctorTest extends BaseTest {

    private readonly doctors: DoctorService

    constructor(
        doctors: DoctorService,
    ) {
        super()
        this.doctors = doctors
    }

    @test
    async ['should create a doctor']() {
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

        expect(doctor.name).to.be.equal(input.name)
        expect(doctor.crx).to.be.equal(input.crx)
        expect(doctor.ufCrx).to.be.equal(input.ufCrx)
        expect(doctor.cpf).to.be.equal(input.cpf)
    }

    @test
    async ['should update a doctor']() {
        const input = {
            id: 'aa7ef6ee-a6e9-11eb-a825-173e511d6e4a',
            name: "DoutorEditado",
            crx: "123456",
            ufCrx: "AC",
            cpf: "222222222"
        }
        const doctor = await this.doctors.update(input)

        expect(doctor.name).to.be.equal(input.name)
        expect(doctor.crx).to.be.equal(input.crx)
        expect(doctor.ufCrx).to.be.equal(input.ufCrx)
        expect(doctor.cpf).to.be.equal(input.cpf)
    }

    @test @skip
    async ['should get a doctor']() {
        
    }

    @test @skip
    async ['should get doctors']() {
        
    }

}
