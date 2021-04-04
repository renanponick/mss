import { 
    Column, 
    Entity,
    OneToMany,
    OneToOne,
    PrimaryColumn
} from 'typeorm'
import { CreateDateColumn, JoinOnTableId, UpdateDateColumn } from './decorators'
import Prescription from './prescription'
import User from './user'

@Entity('doctor')
export default class Doctor{

    @PrimaryColumn(
        'uuid',
        { default: () => 'uuid_generate_v1mc()' }
    )
    id: string

    @Column('uuid', { name: 'user_id' })
    userId: string

    @Column('text')
    name: string

    @Column('text')
    crx: string

    @Column('text', { name: 'uf_crx'})
    ufCrx: string

    @Column('text')
    cpf: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @JoinOnTableId('user_id')
    @OneToOne(_ => User, u => u.doctor)
    user: User

    @OneToMany(
        _ => Prescription,
        p => p.doctor
    )
    prescriptions: Prescription[]

}