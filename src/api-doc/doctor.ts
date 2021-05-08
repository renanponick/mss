import {
    user,
    returnDoctor,
    propertiesError
} from './objects'

export const pathDoctor = {
    post: {
        tags: ['doctor'],
        summary: 'Create a doctor',
        operationId: 'login',
        parameters: [
            {
                in: 'body',
                name: 'login',
                schema: {
                    type: 'object',
                    properties: {
                        user,
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
                        }
                    }
                }
            }
        ],
        responses: {
            200: {
                description: 'Logged in user',
                schema: returnDoctor
            },
            400: {
                description: `Exemple 400: Dados inválidos ou faltantes no corpo da requisição, favor conferir.`,
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
        summary: 'Update a doctor',
        operationId: 'update',
        parameters: [
            {
                in: 'path',
                name: 'doctorId',
                required: true,
                type: 'string'
            },
            {
                in: 'body',
                name: 'updateDoctor',
                schema: {
                    type: 'object',
                    properties: {
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
                        }
                    }
                }
            }
        ],
        responses: {
            200: {
                description: 'Updated user ',
                schema: returnDoctor
            },
            400: {
                description: `Exemple 400: "Seu usuário não ter permissão para acessa esta rotina" or "A senha anterior não confere"`,
                schema: propertiesError
            },
            401: {
                description: `Exemple 401: Usuário não autenticado. Favor realizar o login e tentar novamente`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: propertiesError
            }
        }
    }
}

export const pathGetDoctor = {
    get: {
        tags: ['doctor'],
        summary: 'Get a doctor',
        operationId: 'get',
        parameters: [{
            in: 'path',
            name: 'doctorId',
            required: true,
            type: 'string'
        }],
        responses: {
            200: {
                description: 'Get user',
                schema: returnDoctor
            },
            400: {
                description: `Exemple 400: Seu usuário não ter permissão para acessa esta rotina`,
                schema: propertiesError
            },
            401: {
                description: `Exemple 401: Usuário não autenticado. Favor realizar o login e tentar novamente`,
                schema: propertiesError
            },
            404: {
                description: `Exemple 404: Não foi possivel concluir a consulta. Doutor com id [ID] não encontrado.`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: propertiesError
            }
        }
    }
}
