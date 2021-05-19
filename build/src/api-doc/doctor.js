"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = require("./objects");
exports.pathDoctor = {
    post: {
        tags: ['doctor'],
        summary: 'Create a doctor',
        operationId: 'createDoctor',
        parameters: [
            {
                in: 'body',
                name: 'createDoctor',
                schema: {
                    type: 'object',
                    properties: {
                        user: objects_1.user,
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
                schema: objects_1.returnDoctor
            },
            400: {
                description: `Exemple 400: Dados inválidos ou faltantes no corpo da requisição, favor conferir.`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500.`,
                schema: objects_1.propertiesError
            }
        }
    }
};
exports.pathUpdateDoctor = {
    put: {
        tags: ['doctor'],
        summary: 'Update a doctor',
        operationId: 'updateDoctor',
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
                description: 'Updated user ',
                schema: objects_1.returnDoctor
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
exports.pathGetDoctor = {
    get: {
        tags: ['doctor'],
        summary: 'Get a doctor',
        operationId: 'getDoctor',
        parameters: [{
                in: 'path',
                name: 'doctorId',
                required: true,
                type: 'string'
            }],
        responses: {
            200: {
                description: 'Get user',
                schema: objects_1.returnDoctor
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Doutor com id [ID] não encontrado.`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: objects_1.propertiesError
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS1kb2MvZG9jdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsdUNBSWtCO0FBRUwsUUFBQSxVQUFVLEdBQUc7SUFDdEIsSUFBSSxFQUFFO1FBQ0YsSUFBSSxFQUFFLENBQUMsUUFBUSxDQUFDO1FBQ2hCLE9BQU8sRUFBRSxpQkFBaUI7UUFDMUIsV0FBVyxFQUFFLGNBQWM7UUFDM0IsVUFBVSxFQUFFO1lBQ1I7Z0JBQ0ksRUFBRSxFQUFFLE1BQU07Z0JBQ1YsSUFBSSxFQUFFLGNBQWM7Z0JBQ3BCLE1BQU0sRUFBRTtvQkFDSixJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUU7d0JBQ1IsSUFBSSxFQUFKLGNBQUk7d0JBQ0osSUFBSSxFQUFFOzRCQUNGLElBQUksRUFBRSxRQUFRO3lCQUNqQjt3QkFDRCxHQUFHLEVBQUU7NEJBQ0QsSUFBSSxFQUFFLFFBQVE7eUJBQ2pCO3dCQUNELEtBQUssRUFBRTs0QkFDSCxJQUFJLEVBQUUsUUFBUTt5QkFDakI7d0JBQ0QsR0FBRyxFQUFFOzRCQUNELElBQUksRUFBRSxRQUFRO3lCQUNqQjt3QkFDRCxRQUFRLEVBQUU7NEJBQ04sSUFBSSxFQUFFLFFBQVE7eUJBQ2pCO3dCQUNELElBQUksRUFBRTs0QkFDRixJQUFJLEVBQUUsUUFBUTt5QkFDakI7d0JBQ0QsT0FBTyxFQUFFOzRCQUNMLElBQUksRUFBRSxRQUFRO3lCQUNqQjtxQkFDSjtpQkFDSjthQUNKO1NBQ0o7UUFDRCxTQUFTLEVBQUU7WUFDUCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLGdCQUFnQjtnQkFDN0IsTUFBTSxFQUFFLHNCQUFZO2FBQ3ZCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSxtRkFBbUY7Z0JBQ2hHLE1BQU0sRUFBRSx5QkFBZTthQUMxQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsY0FBYztnQkFDM0Is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