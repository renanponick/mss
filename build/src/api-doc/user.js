"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const objects_1 = require("./objects");
exports.pathLoginUser = {
    post: {
        tags: ['user'],
        summary: 'Login with an user',
        operationId: 'login',
        parameters: [{
                in: 'body',
                name: 'login',
                schema: objects_1.user
            }],
        responses: {
            200: {
                description: 'Logged in user',
                schema: {
                    type: 'object',
                    properties: {
                        token: {
                            type: 'string'
                        }
                    }
                }
            },
            404: {
                description: `Exemple 404: "Não foi possivel concluir o login, pois login ou senha não conferem`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: objects_1.propertiesError
            }
        }
    }
};
exports.pathUpdateUser = {
    put: {
        tags: ['user'],
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
                name: 'updateUser',
                schema: {
                    type: 'object',
                    properties: {
                        lastPassword: {
                            type: 'string'
                        },
                        password: {
                            type: 'string'
                        }
                    }
                }
            }
        ],
        responses: {
            200: {
                description: 'Updated user ',
                schema: objects_1.propertiesError
            },
            400: {
                description: `Exemple 400: "Seu usuário não ter permissão para acessa esta rotina" or "A senha anterior não confere"`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: objects_1.propertiesError
            }
        }
    }
};
exports.pathDeleteUser = {
    delete: {
        tags: ['user'],
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
                schema: objects_1.propertiesError
            },
            400: {
                description: `Exemple 400: Seu usuário não ter permissão para acessa esta rotina`,
                schema: objects_1.propertiesError
            },
            404: {
                description: `Exemple 404: Could not find any entity of type User matching: login`,
                schema: objects_1.propertiesError
            },
            500: {
                description: `Exemple 500. "Internal Server Error"`,
                schema: objects_1.propertiesError
            }
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGktZG9jL3VzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FHa0I7QUFFTCxRQUFBLGFBQWEsR0FBRztJQUN6QixJQUFJLEVBQUU7UUFDRixJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDZCxPQUFPLEVBQUUsb0JBQW9CO1FBQzdCLFdBQVcsRUFBRSxPQUFPO1FBQ3BCLFVBQVUsRUFBRSxDQUFDO2dCQUNULEVBQUUsRUFBRSxNQUFNO2dCQUNWLElBQUksRUFBRSxPQUFPO2dCQUNiLE1BQU0sRUFBRSxjQUFJO2FBQ2YsQ0FBQztRQUNGLFNBQVMsRUFBRTtZQUNQLEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsZ0JBQWdCO2dCQUM3QixNQUFNLEVBQUU7b0JBQ0osSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFO3dCQUNSLEtBQUssRUFBRTs0QkFDSCxJQUFJLEVBQUUsUUFBUTt5QkFDakI7cUJBQ0o7aUJBQ0o7YUFDSjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsbUZBQW1GO2dCQUNoRyxNQUFNLEVBQUUseUJBQWU7YUFDMUI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsTUFBTSxFQUFFLHlCQUFlO2FBQzFCO1NBQ0o7S0FDSjtDQUNKLENBQUE7QUFFWSxRQUFBLGNBQWMsR0FBRztJQUMxQixHQUFHLEVBQUU7UUFDRCxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7UUFDZCxPQUFPLEVBQUUsd0NBQXdDO1FBQ2pELFdBQVcsRUFBRSxRQUFRO1FBQ3JCLFVBQVUsRUFBRTtZQUNSO2dCQUNJLEVBQUUsRUFBRSxNQUFNO2dCQUNWLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLElBQUksRUFBRSxRQUFRO2FBQ2pCO1lBQ0Q7Z0JBQ0ksRUFBRSxFQUFFLE1BQU07Z0JBQ1YsSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLE1BQU0sRUFBRTtvQkFDSixJQUFJLEVBQUUsUUFBUTtvQkFDZCxVQUFVLEVBQUU7d0JBQ1IsWUFBWSxFQUFFOzRCQUNWLElBQUksRUFBRSxRQUFRO3lCQUNqQjt3QkFDRCxRQUFRLEVBQUU7NEJBQ04sSUFBSSxFQUFFLFFBQVE7eUJBQ2pCO3FCQUNKO2lCQUNKO2FBQ0o7U0FDSjtRQUNELFNBQVMsRUFBRTtZQUNQLEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsZUFBZTtnQkFDNUIsTUFBTSxFQUFFLHlCQUFlO2FBQzFCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSx3R0FBd0c7Z0JBQ3JILE1BQU0sRUFBRSx5QkFBZTthQUMxQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsc0NBQXNDO2dCQUNuRCxNQUFNLEVBQUUseUJBQWU7YUFDMUI7U0FDSjtLQUNKO0NBQ0osQ0FBQTtBQUVZLFFBQUEsY0FBYyxHQUFHO0lBQzFCLE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxDQUFDLE1BQU0sQ0FBQztRQUNkLE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsV0FBVyxFQUFFLFFBQVE7UUFDckIsVUFBVSxFQUFFLENBQUM7Z0JBQ1QsRUFBRSxFQUFFLE1BQU07Z0JBQ1YsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsSUFBSSxFQUFFLFFBQVE7YUFDakIsQ0FBQztRQUNGLFNBQVMsRUFBRTtZQUNQLEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUsZUFBZTtnQkFDNUIsTUFBTSxFQUFFLHlCQUFlO2FBQzFCO1lBQ0QsR0FBRyxFQUFFO2dCQUNELFdBQVcsRUFBRSxvRUFBb0U7Z0JBQ2pGLE1BQU0sRUFBRSx5QkFBZTthQUMxQjtZQUNELEdBQUcsRUFBRTtnQkFDRCxXQUFXLEVBQUUscUVBQXFFO2dCQUNsRixNQUFNLEVBQUUseUJBQWU7YUFDMUI7WUFDRCxHQUFHLEVBQUU7Z0JBQ0QsV0FBVyxFQUFFLHNDQUFzQztnQkFDbkQsTUFBTSxFQUFFLHlCQUFlO2FBQzFCO1NBQ0o7S0FDSjtDQUNKLENBQUEifQ==