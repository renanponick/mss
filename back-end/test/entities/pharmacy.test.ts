import { suite, test } from 'mocha-typescript'

import BaseTest, { expect } from '../utils/base-test'
import PharmacyService from '../../src/services/pharmacy'

@suite('pharmacies')
export default class PharmacyTest extends BaseTest {

    private readonly pharmacies: PharmacyService

    constructor(
        pharmacies: PharmacyService,
    ) {
        super()
        this.pharmacies = pharmacies
    }

    @test
    async ['should create a pharmacy']() {
        const input = {
            user: {
                email: 'test pharmacy',
                password: 'abc123'
            },
            socialName: 'pharmacy',
            cnpj: '21123000151',
            address: 'Rua 2123',
            city: 'Joinville',
            province: 'SC'
        }
        const pharmacy = await this.pharmacies.create(input)

        expect(pharmacy.socialName).to.be.equal(input.socialName)
        expect(pharmacy.cnpj).to.be.equal(input.cnpj)
        expect(pharmacy.address).to.be.equal(input.address)
        expect(pharmacy.city).to.be.equal(input.city)
        expect(pharmacy.province).to.be.equal(input.province)
    }

    @test
    async ['should update a pharmacy']() {
        const input = {
            id: 'aa7c9228-a6e9-11eb-a825-2b3ce0086693',
            socialName: 'pharmacy',
            cnpj: '21123000151',
            address: 'Rua 2123',
            city: 'Joinville',
            province: 'SC'
        }
        const pharmacy = await this.pharmacies.update(input)

        expect(pharmacy.socialName).to.be.equal(input.socialName)
        expect(pharmacy.cnpj).to.be.equal(input.cnpj)
        expect(pharmacy.address).to.be.equal(input.address)
        expect(pharmacy.city).to.be.equal(input.city)
        expect(pharmacy.province).to.be.equal(input.province)
    }

    @test
    async ['should get a pharmacy']() {
        const pharmacy = await this.pharmacies.find('aa7c9228-a6e9-11eb-a825-2b3ce0086693')

        expect(pharmacy.socialName).to.be.equal('Precinho baixo')
        expect(pharmacy.cnpj).to.be.equal('41.041.717/0001-69')
        expect(pharmacy.address).to.be.equal('Rua Pascoali')
        expect(pharmacy.city).to.be.equal('Joinville')
        expect(pharmacy.province).to.be.equal('SC')
    }

    @test
    async ['should get pharmacies']() {
        const pharmacy = await this.pharmacies.findAll()

        expect(pharmacy[0].socialName).to.be.equal('Precinho baixo')
        expect(pharmacy[0].cnpj).to.be.equal('41.041.717/0001-69')
        expect(pharmacy[0].address).to.be.equal('Rua Pascoali')
        expect(pharmacy[0].city).to.be.equal('Joinville')
        expect(pharmacy[0].province).to.be.equal('SC')
    }

}
