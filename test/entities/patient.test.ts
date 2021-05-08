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
                email: 'test patient',
                password: 'abc123'
            },
            name: 'Doutor',
            cpf: '11111111111',
            address: 'Rua 2123',
            city: 'Joinville',
            province: 'SC'
        }
        const patient = await this.patients.create(input)

        expect(patient.name).to.be.equal(input.name)
        expect(patient.address).to.be.equal(input.address)
        expect(patient.city).to.be.equal(input.city)
        expect(patient.province).to.be.equal(input.province)
        expect(patient.cpf).to.be.equal(input.cpf)
    }

    @test
    async ['should update a patient']() {
        const input = {
            id: '860a4700-a6e9-11eb-82b6-2bc550c71cf0',
            name: 'PatientEditado',
            address: 'Rua 2123',
            city: 'Joinville',
            province: 'SC',
            cpf: '222222222'
        }
        const patient = await this.patients.update(input)

        expect(patient.name).to.be.equal(input.name)
        expect(patient.address).to.be.equal(input.address)
        expect(patient.cpf).to.be.equal(input.cpf)
        expect(patient.address).to.be.equal(input.address)
        expect(patient.city).to.be.equal(input.city)
        expect(patient.province).to.be.equal(input.province)
    }

    @test
    async ['should get a patient']() {
        const patient = await this.patients.find('860a4700-a6e9-11eb-82b6-2bc550c71cf0')

        expect(patient.name).to.be.equal('João')
        expect(patient.cpf).to.be.equal('625.803.820-46')
        expect(patient.address).to.be.equal('Rua Pascoali')
        expect(patient.city).to.be.equal('Joinville')
        expect(patient.province).to.be.equal('SC')
    }

    @test
    async ['should get patients']() {
        const patient = await this.patients.findAll()

        expect(patient[0].name).to.be.equal('João')
        expect(patient[0].cpf).to.be.equal('625.803.820-46')
        expect(patient[0].address).to.be.equal('Rua Pascoali')
        expect(patient[0].city).to.be.equal('Joinville')
        expect(patient[0].province).to.be.equal('SC')
    }

}
