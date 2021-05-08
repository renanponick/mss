import {
    Column,
    Entity,
    ManyToOne,
    PrimaryColumn
} from 'typeorm'

import { CreateDateColumn, JoinOnTableId, UpdateDateColumn } from './decorators'
import Doctor from './doctor'
import Patient from './patient'
import Pharmacy from './pharmacy'

@Entity('prescription')
export default class Prescription {

    @PrimaryColumn(
        'uuid',
        { default: () => 'uuid_generate_v1mc()' }
    )
    id: string

    @Column('uuid', { name: 'patient_id' })
    patientId: string

    @Column('uuid', { name: 'doctor_id' })
    doctorId: string

    @Column('uuid', { name: 'pharmacy_id', nullable: true })
    pharmacyId: string

    @Column('text')
    composed: string

    @Column('text')
    dosage: string

    @Column('int', { name: 'times_day' })
    timesDay: number

    @Column('text')
    note: string

    @Column('timestamptz')
    validity: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @Column('text', { name: 'external_id', nullable: true })
    externalId: string

    @JoinOnTableId('doctor_id')
    @ManyToOne(_ => Doctor, d => d.prescriptions)
    doctor: Doctor

    @JoinOnTableId('patient_id')
    @ManyToOne(_ => Patient, d => d.prescriptions)
    patient: Patient

    @JoinOnTableId('pharmacy_id')
    @ManyToOne(
        _ => Pharmacy,
        p => p.prescriptions,
        { nullable: true }
    )
    pharmacy?: Pharmacy

}
