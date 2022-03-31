import {
    returnPrescription,
    propertiesError
} from './objects'

export const pathPrescription = {
    post: {
        security: [{ BearerJWT: [] }],
        tags: ['prescription'],
        summary: 'Create a prescription',
        operationId: 'createPrescription',
        parameters: [
            {
                in: 'body',
                name: 'createPrescription',
                schema: {
                    type: 'object',
                    properties: {
                        patientId: {
                            type: 'string'
                        },
                        doctorId: {
                            type: 'string'
                        },
                        composed: {
                            type: 'string'
                        },
                        dosage: {
                            type: 'string'
                        },
                        timesDay: {
                            type: 'number'
                        },
                        note: {
                            type: 'string'
                        },
                        validity: {
                            type: 'string'
                        }
                    }
                }
            }
        ],
        responses: {
            200: {
                description: 'Logged in user',
                schema: returnPrescription
            },
            400: {
                description: `Exemple 400.`,
                schema: propertiesError
            },
            401: {
                description: `Exemple 401: Usuário não autenticado. Favor realizar o login e tentar novamente`,
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

export const pathUpdatePrescription = {
    put: {
        security: [{ BearerJWT: [] }],
        tags: ['prescription'],
        summary: 'Update a prescription',
        operationId: 'updatePrescription',
        parameters: [
            {
                in: 'path',
                name: 'prescriptionId',
                required: true,
                type: 'string'
            },
            {
                in: 'body',
                name: 'updatePrescription',
                schema: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string'
                        },
                        patientId: {
                            type: 'string'
                        },
                        doctorId: {
                            type: 'string'
                        },
                        composed: {
                            type: 'string'
                        },
                        dosage: {
                            type: 'string'
                        },
                        timesDay: {
                            type: 'number'
                        },
                        note: {
                            type: 'string'
                        },
                        validity: {
                            type: 'string'
                        }
                    }
                }
            }
        ],
        responses: {
            200: {
                description: 'Updated user ',
                schema: returnPrescription
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
                description: `Exemple 500. "Não é possivel alterar uma prescrição gerada a mais de um dia."
                                            "Internal Server Error"
                                            "Não é possivel alterar uma receita já dispensada"`,
                schema: propertiesError
            }
        }
    }
}

export const pathTakePrescription = {
    put: {
        security: [{ BearerJWT: [] }],
        tags: ['prescription'],
        summary: 'Take a prescription',
        operationId: 'takePrescription',
        parameters: [{
            in: 'body',
            name: 'takePrescription',
            schema: {
                type: 'object',
                properties: {
                    pharmacyId: {
                        type: 'string'
                    }
                }
            }
        }],
        responses: {
            200: {
                description: 'Get user',
                schema: returnPrescription
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Receita com id [ID] não encontrada.`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: propertiesError
            }
        }
    }
}

export const pathDeletePrescription = {
    delete: {
        security: [{ BearerJWT: [] }],
        tags: ['prescription'],
        summary: 'Delete a prescription',
        operationId: 'deletePRescription',
        parameters: [{
            in: 'path',
            name: 'prescriptionId',
            required: true,
            type: 'string'
        }],
        responses: {
            200: {
                description: 'Prescription deleted',
                schema: returnPrescription
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Receita com id [ID] não encontrada.`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500. "Não é possivel excluir uma prescrição gerada a mais de um dia."
                                            "Internal Server Error"
                                            "Não é possivel excluir uma receita já dispensada`,
                schema: propertiesError
            }
        }
    }
}

export const pathGetPrescriptions = {
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['prescription'],
        summary: 'Get prescriptions',
        operationId: 'getPrescriptions',
        parameters: [],
        responses: {
            200: {
                description: 'Get prescriptions',
                schema: returnPrescription
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Receita com id [ID] não encontrada.`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: propertiesError
            }
        }
    }
}

export const pathGetPrescription = {
    get: {
        security: [{ BearerJWT: [] }],
        tags: ['prescription'],
        summary: 'Get a prescription',
        operationId: 'get',
        parameters: [{
            in: 'path',
            name: 'prescriptionId',
            required: true,
            type: 'string'
        }],
        responses: {
            200: {
                description: 'Get user',
                schema: returnPrescription
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Receita com id [ID] não encontrada.`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: propertiesError
            }
        }
    }
}
