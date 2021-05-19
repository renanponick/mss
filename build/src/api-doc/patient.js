"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = require("./objects");
exports.pathPatient = {
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
                        user: objects_1.user,
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
                schema: objects_1.returnPatient
            },
            400: {
                description: `Exemple 400.`,
                schema: objects_1.propertiesError
            },
            401: {
                description: `Exemple 401: Usuário não autenticado. Favor realizar o login e tentar novamente`,
                schema: objects_1.propertiesError
            },
            403: {
                description: `Exemple 403.`,
                schema: objects_1.propertiesError
            },
            404: {
                description: `Exemple 404: "Não foi possivel concluir o login, pois login ou senha não conferem`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500.`,
                schema: objects_1.propertiesError
            }
        }
    }
};
exports.pathUpdatePatient = {
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
                schema: objects_1.returnPatient
            },
            400: {
                description: `Exemple 400: "Seu usuário não ter permissão para acessa esta rotina" or "A senha anterior não confere"`,
                schema: objects_1.propertiesError
            },
            401: {
                description: `Exemple 401: Usuário não autenticado. Favor realizar o login e tentar novamente`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: objects_1.propertiesError
            }
        }
    }
};
exports.pathGetPatient = {
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
                schema: objects_1.returnPatient
            },
            400: {
                description: `Exemple 400: Seu usuário não ter permissão para acessa esta rotina`,
                schema: objects_1.propertiesError
            },
            401: {
                description: `Exemple 401: Usuário não autenticado. Favor realizar o login e tentar novamente`,
                schema: objects_1.propertiesError
            },
            404: {
                description: `Exemple 404: Não foi possivel concluir a consulta. Paciente com id [ID] não encontrado.`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: objects_1.propertiesError
            }
        }
    }
};
exports.pathGetPatients = {
    get: {
        tags: ['patient'],
        summary: 'Get patients',
        operationId: 'getPatients',
        parameters: [],
        responses: {
            200: {
                description: 'Get patient',
                schema: objects_1.returnPatient
            },
            400: {
                description: `Exemple 400: Seu usuário não ter permissão para acessa esta rotina`,
                schema: objects_1.propertiesError
            },
            401: {
                description: `Exemple 401: Usuário não autenticado. Favor realizar o login e tentar novamente`,
                schema: objects_1.propertiesError
            },
            404: {
                description: `Exemple 404: Não foi possivel concluir a consulta. Paciente com id [ID] não encontrado.`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: objects_1.propertiesError
            }
        }
    }
};
exports.pathGetPatientByCpf = {
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
                schema: objects_1.returnPatient
            },
            400: {
                description: `Exemple 400: Seu usuário não ter permissão para acessa esta rotina`,
                schema: objects_1.propertiesError
            },
            401: {
                description: `Exemple 401: Usuário não autenticado. Favor realizar o login e tentar novamente`,
                schema: objects_1.propertiesError
            },
            404: {
                description: `Exemple 404: Não foi possivel concluir a consulta. Paciente com id [ID] não encontrado.`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: objects_1.propertiesError
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGktZG9jL3BhdGllbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FJa0I7QUFFTCxRQUFBLFdBQVcsR0FBRztJQUN2QixJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUM7UUFDakIsT0FBTyxFQUFFLGtCQUFrQjtRQUMzQixXQUFXLEVBQUUsZUFBZTtRQUM1QixVQUFVLEVBQUU7WUFDUjtnQkFDSSxFQUFFLEVBQUUsTUFBTTtnQkFDVixJQUFJLEVBQUUsZUFBZTtnQkFDckIsTUFBTSxFQUFFO29CQUNKLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRTt3QkFDUixJQUFJLEVBQUosY0FBSTt3QkFDSixJQUFJLEVBQUU7NEJBQ0YsSUFBSSxFQUFFLFFBQVE7eUJBQ2pCO3dCQUNELEdBQUcsRUFBRTs0QkFDRCxJQUFJLEVBQUUsUUFBUTt5QkFDakI7d0JBQ0QsUUFBUSxFQUFFOzRCQUNOLElBQUksRUFBRSxRQUFRO3lCQUNqQjt3QkFDRCxJQUFJLEVBQUU7NEJBQ0YsSUFBSSxFQUFFLFFBQVE7eUJBQ2pCO3dCQUNELE9BQU8sRUFBRTs0QkFDTCxJQUFJLEVBQUUsUUFBUTt5QkFDakI7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSxnQkFBZ0I7Z0JBQzdCLE1BQU0sRUFBRSx1QkFBYTthQUN4QjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsY0FBYztnQkFDM0IsTUFBTSxFQUFFLHlCQUFlO2FBQzFCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSxpRkFBaUY7Z0JBQzlGLE1BQU0sRUFBRSx5QkFBZTthQUMxQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsY0FBYztnQkFDM0IsTUFBTSxFQUFFLHlCQUFlO2FBQzFC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