type User = {
    login: string
    password: string
    id?: string
    isActive?: boolean
}

export type CreateDoctor = {
    user: User
    name: string
    crx: string
    ufCrx: string
    cpf: string
}