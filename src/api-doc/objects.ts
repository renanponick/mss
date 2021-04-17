export const userEx = {
    type: 'object',
    properties: {
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        userType: {
            type: 'number'
        }
    }
}

export const newUserEx = {
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
        details: {
            type: 'string',
        }
    }
}