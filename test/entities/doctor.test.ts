import { suite, test } from 'mocha-typescript'

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
                email: 'test@doctor.com',
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

        expect(doctor.name).to.be.equal(input.name)
        expect(doctor.crx).to.be.equal(`${input.crx}@${input.ufCrx}`)
        expect(doctor.cpf).to.be.equal(input.cpf)
        expect(doctor.address).to.be.equal(input.address)
        expect(doctor.city).to.be.equal(input.city)
        expect(doctor.province).to.be.equal(input.province)
        expect(doctor.role).to.be.equal(input.role)
    }

    @test
    async ['should update a doctor']() {
        const input = {
            id: 'aa7ef6ee-a6e9-11eb-a825-173e511d6e4a',
            name: 'DoutorEditado',
            cpf: '222222222',
            address: 'Rua 2123',
            city: 'Joinville',
            province: 'SC',
            role: 'Psiquiatra'
        }
        const doctor = await this.doctors.update(input)

        expect(doctor.name).to.be.equal(input.name)
        expect(doctor.cpf).to.be.equal(input.cpf)
        expect(doctor.address).to.be.equal(input.address)
        expect(doctor.city).to.be.equal(input.city)
        expect(doctor.province).to.be.equal(input.province)
        expect(doctor.role).to.be.equal(input.role)
    }

    @test
    async ['should get a doctor']() {
        const doctor = await this.doctors
            .find('aa7ef6ee-a6e9-11eb-a825-173e511d6e4a')

        expect(doctor.name).to.be.equal('Patricia')
        expect(doctor.crx).to.be.equal('12332@SC')
        expect(doctor.cpf).to.be.equal('32423882084')
        expect(doctor.address).to.be.equal('Rua Pascoali')
        expect(doctor.city).to.be.equal('Joinville')
        expect(doctor.province).to.be.equal('SC')
        expect(doctor.role).to.be.equal('Psiquiatra')
    }

    @test
    async ['should get doctors']() {
        const doctor = await this.doctors.findAll()

        expect(doctor[0].name).to.be.equal('Patricia')
        expect(doctor[0].crx).to.be.equal('12332@SC')
        expect(doctor[0].cpf).to.be.equal('32423882084')
        expect(doctor[0].address).to.be.equal('Rua Pascoali')
        expect(doctor[0].city).to.be.equal('Joinville')
        expect(doctor[0].province).to.be.equal('SC')
    }

}
