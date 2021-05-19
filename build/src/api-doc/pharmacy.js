"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = require("./objects");
exports.pathPharmacy = {
    post: {
        tags: ['pharmacy'],
        summary: 'Create a pharmacy',
        operationId: 'createPharmacy',
        parameters: [
            {
                in: 'body',
                name: 'createPharmacy',
                schema: {
                    type: 'object',
                    properties: {
                        user: objects_1.user,
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
            }
        ],
        responses: {
            200: {
                description: 'Successfully registered',
                schema: objects_1.returnPharmacy
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
exports.pathUpdatePharmacy = {
    put: {
        tags: ['pharmacy'],
        summary: 'Update a pharmacy',
        operationId: 'updatePharmacy',
        parameters: [
            {
                in: 'path',
                name: 'pharmacyId',
                required: true,
                type: 'string'
            },
            {
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
            }
        ],
        responses: {
            200: {
                description: 'Updated user ',
                schema: objects_1.returnPharmacy
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
exports.pathGetPharmacy = {
    get: {
        tags: ['pharmacy'],
        summary: 'Get a pharmacy',
        operationId: 'getPharmacy',
        parameters: [{
                in: 'path',
                name: 'pharmacyId',
                required: true,
                type: 'string'
            }],
        responses: {
            200: {
                description: 'Get user',
                schema: objects_1.returnPharmacy
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
                description: `Exemple 404: Não foi possivel concluir a consulta. Farmacia com id [ID] não encontrado.`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: objects_1.propertiesError
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBpLWRvYy9waGFybWFjeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHVDQUlrQjtBQUVMLFFBQUEsWUFBWSxHQUFHO0lBQ3hCLElBQUksRUFBRTtRQUNGLElBQUksRUFBRSxDQUFDLFVBQVUsQ0FBQztRQUNsQixPQUFPLEVBQUUsbUJBQW1CO1FBQzVCLFdBQVcsRUFBRSxnQkFBZ0I7UUFDN0IsVUFBVSxFQUFFO1lBQ1I7Z0JBQ0ksRUFBRSxFQUFFLE1BQU07Z0JBQ1YsSUFBSSxFQUFFLGdCQUFnQjtnQkFDdEIsTUFBTSxFQUFFO29CQUNKLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRTt3QkFDUixJQUFJLEVBQUosY0FBSTt3QkFDSixVQUFVLEVBQUU7NEJBQ1IsSUFBSSxFQUFFLFFBQVE7eUJBQ2pCO3dCQUNELFFBQVEsRUFBRTs0QkFDTixJQUFJLEVBQUUsUUFBUTt5QkFDakI7d0JBQ0QsSUFBSSxFQUFFOzRCQUNGLElBQUksRUFBRSxRQUFRO3lCQUNqQjt3QkFDRCxPQUFPLEVBQUU7NEJBQ0wsSUFBSSxFQUFFLFFBQVE7eUJBQ2pCO3dCQUNELElBQUksRUFBRTs0QkFDRixJQUFJLEVBQUUsUUFBUTt5QkFDakI7cUJBQ0o7aUJBQ0o7YUFDSjtTQUNKO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSx5QkFBeUI7Z0JBQ3RDLE1BQU0sRUFBRSx3QkFBYzthQUN6QjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsbUZBQW1GO2dCQUNoRyxNQUFNLEVBQUUseUJBQWU7YUFDMUI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLGNBQWM7Z0JBQzNCLE1BQU0sRUFBRSx5QkFBZTthQUMxQjtTQUNKO0tBQ0o7Q0FDSixDQUFBO0FBRVksUUFBQSxrQkFBa0IsR0FBRztJQUM5QixHQUFHLEVBQUU7UUFDRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDbEIsT0FBTyxFQUFFLG1CQUFtQjtRQUM1QixXQUFXLEVBQUUsZ0JBQWdCO1FBQzdCLFVBQVUsRUFBRTtZQUNSO2dCQUNJLEVBQUUsRUFBRSxNQUFNO2dCQUNWLElBQUksRUFBRSxZQUFZO2dCQUNsQixRQUFRLEVBQUUsSUFBSTtnQkFDZCxJQUFJLEVBQUUsUUFBUTthQUNqQjtZQUNEO2dCQUNJLEVBQUUsRUFBRSxNQUFNO2dCQUNWLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLE1BQU0sRUFBRTtvQkFDSixJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUU7d0JBQ1IsVUFBVSxFQUFFOzRCQUNSLElBQUksRUFBRSxRQUFRO3lCQUNqQjt3QkFDRCxRQUFRLEVBQUU7NEJBQ04sSUFBSSxFQUFFLFFBQVE7eUJBQ2pCO3dCQUNELElBQUksRUFBRTs0QkFDRixJQUFJLEVBQUUsUUFBUTt5QkFDakI7d0JBQ0QsT0FBTyxFQUFFOzRCQUNMLElBQUksRUFBRSxRQUFRO3lCQUNqQjt3QkFDRCxJQUFJLEVBQUU7NEJBQ0YsSUFBSSxFQUFFLFFBQVE7eUJBQ2pCO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtRQUNELFNBQVMsRUFBRTtZQUNQLEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsZUFBZTtnQkFDNUIsTUFBTSxFQUFFLHdCQUFjO2FBQ3pCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSx3R0FBd0c7Z0JBQ3JILE1BQU0sRUFBRSx5QkFBZTthQUMxQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsaUZBQWlGO2dCQUM5RixNQUFNLEVBQUUseUJBQWU7YUFDMUI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsTUFBTSxFQUFFLHlCQUFlO2FBQzFCO1NBQ0o7S0FDSjtDQUNKLENBQUE7QUFFWSxRQUFBLGVBQWUsR0FBRztJQUMzQixHQUFHLEVBQUU7UUFDRCxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUM7UUFDbEIsT0FBTyxFQUFFLGdCQUFnQjtRQUN6QixXQUFXLEVBQUUsYUFBYTtRQUMxQixVQUFVLEVBQUUsQ0FBQztnQkFDVCxFQUFFLEVBQUUsTUFBTTtnQkFDVixJQUFJLEVBQUUsWUFBWTtnQkFDbEIsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsSUFBSSxFQUFFLFFBQVE7YUFDakIsQ0FBQztRQUNGLFNBQVMsRUFBRTtZQUNQLEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsVUFBVTtnQkFDdkIsTUFBTSxFQUFFLHdCQUFjO2FBQ3pCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSxvRUFBb0U7Z0JBQ2pGLE1BQU0sRUFBRSx5QkFBZTthQUMxQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsaUZBQWlGO2dCQUM5RixNQUFNLEVBQUUseUJBQWU7YUFDMUI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLHlGQUF5RjtnQkFDdEcsTUFBTSxFQUFFLHlCQUFlO2FBQzFCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSxzQ0FBc0M7Z0JBQ25ELE1BQU0sRUFBRSx5QkFBZTthQUMxQjtTQUNKO0tBQ0o7Q0FDSixDQUFBIn0=