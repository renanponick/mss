import {
    user,
    newUser,
    propertiesError
} from "./objects"

export const pathDoctor = {
    post: {
        tags: ['doctor'],
        summary: 'Login with an user',
        operationId: 'login',
        parameters: [
            {
                in: 'body',
                name: 'login',
                schema: {
                    type: 'object',
                    properties: user,
                }
            }
        ],
        responses: {
            200: {
                description: 'Logged in user',
                schema: {
                    type: 'object',
                    properties: {
                        toekn: {
                            type: 'string',
                        }
                    }
                }
            },
            400: {
                description: `Exemple 400.`,
                schema: propertiesError
            },
            403: {
                description: `Exemple 403.`,
                schema: propertiesError
            },
            404: {
                description: `Exemple 404: "Não foi possivel concluir o login, pois login ou senha não conferem`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500.`,
                schema: propertiesError
            }
        }
    }
}

export const pathUpdateDoctor = {
    put: {
        tags: ['doctor'],
        summary: 'Update a password and activate an user',
        operationId: 'update',
        parameters: [
            {
                in: 'path',
                name: 'userId',
                required: true,
                type: 'string'
            },
            {
                in: 'body',
                name: 'updateDoctor',
                schema: {
                    type: 'object',
                    properties: {
                        lastPassword: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        },
                    }
                }
            }
        ],
        responses: {
            200: {
                description: 'Updated user ',
                schema: propertiesError
            },
            400: {
                description: `Exemple 400: "Seu usuário não ter permissão para acessa esta rotina" or "A senha anterior não confere"`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: propertiesError
            }
        }
    }
}

export const pathDeleteDoctor = {
    delete: {
        tags: ['doctor'],
        summary: 'Delete an user',
        operationId: 'delete',
        parameters: [{
            in: 'path',
            name: 'userId',
            required: true,
            type: 'string'
        }],
        responses: {
            200: {
                description: 'Deleted user ',
                schema: propertiesError
            },
            400: {
                description: `Exemple 400: Seu usuário não ter permissão para acessa esta rotina`,
                schema: propertiesError
            },
            404: {
                description: `Exemple 404: Could not find any entity of type user matching: login`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: propertiesError
            }
        }
    }
}