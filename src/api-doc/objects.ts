export const user = {
    login: {
        type: 'string'
    },
    password: {
        type: 'string'
    },
}

export const newUser = {
    type: 'object',
    properties: {
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        fullName: {
            type: 'string'
        },
        cpf: {
            type: 'string'
        }
    }
}

export const propertiesError = {
    type: 'object',
    properties: {
        message: {
            type: 'string',
        }
    }
}