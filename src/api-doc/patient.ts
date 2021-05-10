import {
    user,
    returnPatient,
    propertiesError
} from './objects'

export const pathPatient = {
    post: {
        tags: ['patient'],
        summary: 'Create a patient',
        operationId: 'createPatient',
        parameters: [
            {
                in: 'body',
                name: 'createPatient',
                schema: {
                    type: 'object',
                    properties: {
                        user,
                        name: {
                            type: 'string'
                        },
                        cpf: {
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
                        }
                    }
                }
            }
        ],
        responses: {
            200: {
                description: 'Logged in user',
                schema: returnPatient
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

export const pathUpdatePatient = {
    put: {
        tags: ['patient'],
        summary: 'Update patient',
        operationId: 'updatePatient',
        parameters: [
            {
                in: 'path',
                name: 'patientId',
                required: true,
                type: 'string'
            },
            {
                in: 'body',
                name: 'updatePatient',
                schema: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string'
                        },
                        cpf: {
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
                        }
                    }
                }
            }
        ],
        responses: {
            200: {
                description: 'Updated patient',
                schema: returnPatient
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

export const pathGetPatient = {
    get: {
        tags: ['patient'],
        summary: 'Get a patient',
        operationId: 'getPatient',
        parameters: [{
            in: 'path',
            name: 'patientId',
            required: true,
            type: 'string'
        }],
        responses: {
            200: {
                description: 'Get patient',
                schema: returnPatient
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Paciente com id [ID] não encontrado.`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: propertiesError
            }
        }
    }
}

export const pathGetPatients = {
    get: {
        tags: ['patient'],
        summary: 'Get patients',
        operationId: 'getPatients',
        parameters: [],
        responses: {
            200: {
                description: 'Get patient',
                schema: returnPatient
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Paciente com id [ID] não encontrado.`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: propertiesError
            }
        }
    }
}

export const pathGetPatientByCpf = {
    get: {
        tags: ['patient'],
        summary: 'Get a patient by CPF',
        operationId: 'getPatientCpf',
        parameters: [{
            in: 'path',
            name: 'patientId',
            required: true,
            type: 'string'
        }],
        responses: {
            200: {
                description: 'Get patient',
                schema: returnPatient
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Paciente com id [ID] não encontrado.`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: propertiesError
            }
        }
    }
}
