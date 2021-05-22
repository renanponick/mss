import {
    user,
    returnPharmacy,
    propertiesError
} from './objects'

export const pathPharmacy = {
    post: {
        tags: ['pharmacy'],
        summary: 'Create a pharmacy',
        operationId: 'createPharmacy',
        parameters: [{
            in: 'body',
            name: 'createPharmacy',
            schema: {
                type: 'object',
                properties: {
                    user,
                    socialName: {
                        type: 'string'
                    },
                    province: {
                        type: 'string'
                    },
                    city: {
                        type: 'string'
                    },
                    address: {
                        type: 'string'
                    },
                    cnpj: {
                        type: 'string'
                    }
                }
            }
        }],
        responses: {
            200: {
                description: 'Successfully registered',
                schema: returnPharmacy
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

export const pathUpdatePharmacy = {
    put: {
        tags: ['pharmacy'],
        summary: 'Update a pharmacy',
        operationId: 'updatePharmacy',
        parameters: [{
            in: 'body',
            name: 'updatePharmacy',
            schema: {
                type: 'object',
                properties: {
                    socialName: {
                        type: 'string'
                    },
                    province: {
                        type: 'string'
                    },
                    city: {
                        type: 'string'
                    },
                    address: {
                        type: 'string'
                    },
                    cnpj: {
                        type: 'string'
                    }
                }
            }
        }],
        responses: {
            200: {
                description: 'Updated user ',
                schema: returnPharmacy
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

export const pathGetPharmacy = {
    get: {
        tags: ['pharmacy'],
        summary: 'Get a pharmacy',
        operationId: 'getPharmacy',
        responses: {
            200: {
                description: 'Get user',
                schema: returnPharmacy
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Farmacia com id [ID] não encontrado.`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: propertiesError
            }
        }
    }
}
