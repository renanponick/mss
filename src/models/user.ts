import { 
    Column,
    Entity, 
    OneToOne, 
    PrimaryColumn,
    Unique
} from 'typeorm'

import { CreateDateColumn } from './decorators'
import Doctor from './doctor'
import Patient from './patient'
import Pharmacy from './pharmacy'

@Entity('user')
@Unique(['login'])
export default class User {

    @PrimaryColumn(
        'uuid',
        { default: () => 'uuid_generate_v1mc()' }
    )
    id: string

    @Column('boolean', { name: 'is_active', default: true } )
    isActive: boolean

    @Column('text')
    login: string

    @Column('text')
    password: string

    @Column('int')
    type: number

    @CreateDateColumn()
    createdAt: Date

    @OneToOne(_ => Doctor, d => d.user)
    doctor: Doctor

    @OneToOne(_ => Patient, p => p.user)
    patient: Patient

    @OneToOne(_ => Pharmacy, p => p.user)
    pharmacy: Pharmacy
    
}
