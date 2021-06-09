import { skip, suite, test } from 'mocha-typescript'

import BaseTest, { expect } from '../utils/base-test'
import PrescriptionService from '../../src/services/prescription'

@suite('prescriptions')
export default class PrescriptionTest extends BaseTest {

    private readonly prescriptions: PrescriptionService

    constructor(
        prescriptions: PrescriptionService,
    ) {
        super()
        this.prescriptions = prescriptions
    }

    @test @skip
    async ['should create a prescription']() {
        const input = {
            composed: 'Composição',
            dosage: 'Dosage',
            timesDay: 2,
            note: 'Nota',
            validity: '2021-03-20T19:59:39.677Z',
            doctorId: 'aa7ef6ee-a6e9-11eb-a825-173e511d6e4a',
            patientId: '860a4700-a6e9-11eb-82b6-2bc550c71cf0'
        }
        const prescription = await this.prescriptions.create(input)

        expect(prescription.composed).to.be.equal(input.composed)
        expect(prescription.dosage).to.be.equal(input.dosage)
        expect(prescription.timesDay).to.be.equal(input.timesDay)
        expect(prescription.note).to.be.equal(input.note)
        expect(prescription.validity).to.be.equal(input.validity)
        expect(prescription.doctorId).to.be.equal(input.doctorId)
        expect(prescription.patientId).to.be.equal(input.patientId)
    }

    @test @skip
    async ['should update a prescription']() {
        const newInput = {
            composed: 'Composição',
            dosage: 'Dosage',
            timesDay: 2,
            note: 'Nota',
            validity: '2021-03-20T19:59:39.677Z',
            doctorId: 'aa7ef6ee-a6e9-11eb-a825-173e511d6e4a',
            patientId: '860a4700-a6e9-11eb-82b6-2bc550c71cf0'
        }
        const newPrescription = await this.prescriptions.create(newInput)

        const input = {
            id: newPrescription.id,
            composed: 'Composição',
            dosage: 'Dosage',
            timesDay: 2,
            note: 'Nota',
            doctorId: 'aa7ef6ee-a6e9-11eb-a825-173e511d6e4a',
            patientId: '860a4700-a6e9-11eb-82b6-2bc550c71cf0',
            externalId: '999a4700-a6e9-ab89-82b6-2bc550c71999'
        }
        const prescription = await this.prescriptions.update(input)

        expect(prescription.composed).to.be.equal(input.composed)
        expect(prescription.dosage).to.be.equal(input.dosage)
        expect(prescription.timesDay).to.be.equal(input.timesDay)
        expect(prescription.note).to.be.equal(input.note)
        expect(prescription.doctorId).to.be.equal(input.doctorId)
        expect(prescription.patientId).to.be.equal(input.patientId)
        expect(prescription.externalId).to.be.equal(input.externalId)
    }

    @test @skip
    async ['should get a prescription']() {
        const prescription = await this.prescriptions.find('f5402e86-a6f4-11eb-a44d-639077f1f0bd')

        expect(prescription.composed).to.be.equal('Paracetamol 200ml')
        expect(prescription.dosage).to.be.equal('1 a cada 2 dias')
        expect(prescription.timesDay).to.be.equal(1)
        expect(prescription.note).to.be.equal('Não tomar com Vinho')
        expect(prescription.validity).to.be.equalDate(new Date('2021-03-20 19:59:39.677+00'))
        expect(prescription.doctorId).to.be.equal('aa7ef6ee-a6e9-11eb-a825-173e511d6e4a')
        expect(prescription.patientId).to.be.equal('860a4700-a6e9-11eb-82b6-2bc550c71cf0')
    }

    @test @skip
    async ['should get prescriptions']() {
        const prescription = await this.prescriptions.getPrescriptions('c85570e8-89d0-11eb-a43d-e37781ba023d')

        if (prescription) {
            expect(prescription[0].composed).to.be.equal('Paracetamol 200ml')
            expect(prescription[0].dosage).to.be.equal('1 a cada 2 dias')
            expect(prescription[0].timesDay).to.be.equal(1)
            expect(prescription[0].note).to.be.equal('Não tomar com Vinho')
            expect(prescription[0].validity).to.be.equalDate(new Date('2021-03-20 19:59:39.677+00'))
            expect(prescription[0].doctorId).to.be.equal('aa7ef6ee-a6e9-11eb-a825-173e511d6e4a')
            expect(prescription[0].patientId).to.be.equal('860a4700-a6e9-11eb-82b6-2bc550c71cf0')
        }
    }

}
