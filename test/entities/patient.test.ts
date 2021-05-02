import { suite, test } from 'mocha-typescript'
import BaseTest, { expect } from '../utils/base-test'

import PatientService from '../../src/services/patient'

@suite('patients')
export default class PatientTest extends BaseTest {

    private readonly patients: PatientService

    constructor(
        patients: PatientService,
    ) {
        super()
        this.patients = patients
    }

    @test
    async ['should create a patient']() {
        const input = {
            user: {
                login: 'test patient',
                password: 'abc123'
                },
            name: 'Doutor',
            address: 'Olavio Pascoali, N 210',
            cpf: '11111111111'
        }
        const patient = await this.patients.create(input)

        expect(patient.name).to.be.equal(input.name)
        expect(patient.address).to.be.equal(input.address)
        expect(patient.cpf).to.be.equal(input.cpf)
    }

    @test
    async ['should update a patient']() {
        const input = {
            id: '860a4700-a6e9-11eb-82b6-2bc550c71cf0',
            name: 'PatientEditado',
            address: 'Olavio Pascoali, N 210',
            cpf: '222222222'
        }
        const patient = await this.patients.update(input)

        expect(patient.name).to.be.equal(input.name)
        expect(patient.address).to.be.equal(input.address)
        expect(patient.cpf).to.be.equal(input.cpf)
    }

    @test
    async ['should get a patient']() {
        const patient = await this.patients.find('860a4700-a6e9-11eb-82b6-2bc550c71cf0')

        expect(patient.name).to.be.equal('João')
        expect(patient.cpf).to.be.equal('625.803.820-46')
        expect(patient.address).to.be.equal('Rua SC nº 123 - Jvll')
    }

    @test
    async ['should get patients']() {
        const patient = await this.patients.findAll()

        expect(patient[0].name).to.be.equal('João')
        expect(patient[0].cpf).to.be.equal('625.803.820-46')
        expect(patient[0].address).to.be.equal('Rua SC nº 123 - Jvll')
    }

}
