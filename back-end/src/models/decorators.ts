import * as typeorm from 'typeorm'

export function CreateDateColumn() {
    return typeorm.CreateDateColumn({ type: 'timestamptz', name: 'created_at' })
}

export function UpdateDateColumn() {
    return typeorm.UpdateDateColumn({ type: 'timestamptz', name: 'updated_at' })
}

export function DeleteDateColumn() {
    return typeorm.Column('timestamptz', { nullable: true })
}

export function DeactivateDateColumn() {
    return DeleteDateColumn()
}

export function PrimaryUuidColumn() {
    return typeorm.PrimaryColumn(
        'uuid',
        { default: () => 'uuid_generate_v1mc()' }
    )
}

export function JoinOnTableId(name: string) {
    return typeorm.JoinColumn({ name, referencedColumnName: 'id' })
}
