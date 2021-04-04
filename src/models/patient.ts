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

@Entity('patient')
export default class Patient{

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
    cpf: string

    @Column('text')
    address: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @JoinOnTableId('user_id')
    @OneToOne(_ => User, u => u.patient)
    user: User

    @OneToMany(
        _ => Prescription,
        p => p.patient
    )
    prescriptions: Prescription[]

}
