import * as t from 'io-ts'

const User = t.intersection([
    t.type({
        login: t.string,
        password: t.string
    }),
    t.partial({
        id: t.string,
        isActive: t.boolean
    })
])

export const CreateDoctor = t.type({
    user: User,
    name: t.string,
    crx: t.string,
    ufCrx: t.string,
    cpf: t.string
})

export type CreateDoctor = t.TypeOf<typeof CreateDoctor>

export const UpdateDoctor = t.partial({
    user: User,
    id: t.string,
    name: t.string,
    crx: t.string,
    ufCrx: t.string,
    cpf: t.string
})

export type UpdateDoctor = t.TypeOf<typeof UpdateDoctor>

export const CreatePatient = t.type({
    user: User,
    name: t.string,
    cpf: t.string,
    address: t.string
})

export type CreatePatient = t.TypeOf<typeof CreatePatient>

export const UpdatePatient = t.partial({
    user: User,
    id: t.string,
    name: t.string,
    cpf: t.string,
    address: t.string
})

export type UpdatePatient = t.TypeOf<typeof UpdatePatient>

export const CreatePharmacy = t.type({
    user: User,
    socialName: t.string,
    cnpj: t.string,
    address: t.string
})

export type CreatePharmacy = t.TypeOf<typeof CreatePharmacy>

export const UpdatePharmacy = t.partial({
    user: User,
    id: t.string,
    socialName: t.string,
    cnpj: t.string,
    address: t.string
})

export type UpdatePharmacy = t.TypeOf<typeof UpdatePharmacy>

export const CreatePrescription = t.type({
    composed: t.string,
    dosage: t.string,
    timesDay: t.number,
    note: t.string,
    validity: t.string,
    doctorId: t.string,
    patientId: t.string,
    address: t.string
})

export type CreatePrescription = t.TypeOf<typeof CreatePrescription>

export const UpdatePrescription = t.partial({
    id: t.string,
    composed: t.string,
    dosage: t.string,
    timesDay: t.number,
    note: t.string,
    validity: t.string,
    doctorId: t.string,
    patientId: t.string,
    pharmacyId: t.string
})

export type UpdatePrescription = t.TypeOf<typeof UpdatePrescription>
