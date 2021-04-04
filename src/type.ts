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

export const UpdateDoctor = t.partial({
    user: User,
    name: t.string,
    crx: t.string,
    ufCrx: t.string,
    cpf: t.string
})
