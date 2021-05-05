export const user = {
    type: 'object',
    properties: {
        login: {
            type: 'string'
        },
        password: {
            type: 'string'
        }
    }
}

export const returnDoctor = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        userId: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        crx: {
            type: 'string'
        },
        ufCrx: {
            type: 'string'
        },
        cpf: {
            type: 'string'
        },
        createdAt: {
            type: 'string'
        },
        updatedAt: {
            type: 'string'
        }
    }
}

export const returnPharmacy = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        userId: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        crx: {
            type: 'string'
        },
        ufCrx: {
            type: 'string'
        },
        cpf: {
            type: 'string'
        },
        createdAt: {
            type: 'string'
        },
        updatedAt: {
            type: 'string'
        }
    }
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