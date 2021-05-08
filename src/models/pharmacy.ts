import {
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryColumn,
    Unique
} from 'typeorm'

import { CreateDateColumn, JoinOnTableId, UpdateDateColumn } from './decorators'
import Prescription from './prescription'
import User from './user'

@Entity('pharmacy')
@Unique(['cnpj'])
export default class Pharmacy {

    @PrimaryColumn(
        'uuid',
        { default: () => 'uuid_generate_v1mc()' }
    )
    id: string

    @Column('uuid', { name: 'user_id' })
    userId: string

    @Column('text', { name: 'social_name' })
    socialName: string

    @Column('text')
    cnpj: string

    @Column('text')
    address: string

    @Column('text')
    city: string

    @Column('text')
    province: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @JoinOnTableId('user_id')
    @OneToOne(_ => User, u => u.pharmacy)
    user: User

    @OneToMany(
        _ => Prescription,
        p => p.pharmacy
    )
    prescriptions: Prescription[]

}
