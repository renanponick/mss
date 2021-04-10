type CreateUser = {
    login: string
    password: string
    id?: string
    isActive?: boolean
}

export type CreateDoctor = {
    user: CreateUser
    name: string
    crx: string
    ufCrx: string
    cpf: string
}

type UpdateUser = {
    login?: string
    password?: string
    id?: string
    isActive?: boolean
}

export type UpdateDoctor = {
    id: string
    user?: UpdateUser
    name?: string
    crx?: string
    ufCrx?: string
    cpf?: string
}