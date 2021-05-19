"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = require("./objects");
exports.pathPrescription = {
    post: {
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
                schema: objects_1.returnPrescription
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
exports.pathUpdatePrescription = {
    put: {
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
                schema: objects_1.returnPrescription
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
                description: `Exemple 500. "Não é possivel alterar uma prescrição gerada a mais de um dia."
                                            "Internal Server Error"
                                            "Não é possivel alterar uma receita já dispensada"`,
                schema: objects_1.propertiesError
            }
        }
    }
};
exports.pathTakePrescription = {
    put: {
        tags: ['prescription'],
        summary: 'Take a prescription',
        operationId: 'takePrescription',
        parameters: [{
                in: 'path',
                name: 'prescriptionId',
                required: true,
                type: 'string'
            },
            {
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
                schema: objects_1.returnPrescription
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Receita com id [ID] não encontrada.`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: objects_1.propertiesError
            }
        }
    }
};
exports.pathDeletePrescription = {
    delete: {
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
                schema: objects_1.returnPrescription
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Receita com id [ID] não encontrada.`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500. "Não é possivel excluir uma prescrição gerada a mais de um dia."
                                            "Internal Server Error"
                                            "Não é possivel excluir uma receita já dispensada`,
                schema: objects_1.propertiesError
            }
        }
    }
};
exports.pathGetPrescriptions = {
    get: {
        tags: ['prescription'],
        summary: 'Get prescriptions',
        operationId: 'getPrescriptions',
        parameters: [],
        responses: {
            200: {
                description: 'Get prescriptions',
                schema: objects_1.returnPrescription
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Receita com id [ID] não encontrada.`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: objects_1.propertiesError
            }
        }
    }
};
exports.pathGetPrescription = {
    get: {
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
                schema: objects_1.returnPrescription
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Receita com id [ID] não encontrada.`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: objects_1.propertiesError
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2NyaXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS1kb2MvcHJlc2NyaXB0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBR2tCO0FBRUwsUUFBQSxnQkFBZ0IsR0FBRztJQUM1QixJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsQ0FBQyxjQUFjLENBQUM7UUFDdEIsT0FBTyxFQUFFLHVCQUF1QjtRQUNoQyxXQUFXLEVBQUUsb0JBQW9CO1FBQ2pDLFVBQVUsRUFBRTtZQUNSO2dCQUNJLEVBQUUsRUFBRSxNQUFNO2dCQUNWLElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLE1BQU0sRUFBRTtvQkFDSixJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUU7d0JBQ1IsU0FBUyxFQUFFOzRCQUNQLElBQUksRUFBRSxRQUFRO3lCQUNqQjt3QkFDRCxRQUFRLEVBQUU7NEJBQ04sSUFBSSxFQUFFLFFBQVE7eUJBQ2pCO3dCQUNELFFBQVEsRUFBRTs0QkFDTixJQUFJLEVBQUUsUUFBUTt5QkFDakI7d0JBQ0QsTUFBTSxFQUFFOzRCQUNKLElBQUksRUFBRSxRQUFRO3lCQUNqQjt3QkFDRCxRQUFRLEVBQUU7NEJBQ04sSUFBSSxFQUFFLFFBQVE7eUJBQ2pCO3dCQUNELElBQUksRUFBRTs0QkFDRixJQUFJLEVBQUUsUUFBUTt5QkFDakI7d0JBQ0QsUUFBUSxFQUFFOzRCQUNOLElBQUksRUFBRSxRQUFRO3lCQUNqQjtxQkFDSjtpQkFDSjthQUNKO1NBQ0o7UUFDRCxTQUFTLEVBQUU7WUFDUCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLGdCQUFnQjtnQkFDN0IsTUFBTSxFQUFFLDRCQUFrQjthQUM3QjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsY0FBYztnQkFDM0IsTUFBTSxFQUFFLHlCQUFlO2FBQzFCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSxpRkFBaUY7Z0JBQzlGLE1B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