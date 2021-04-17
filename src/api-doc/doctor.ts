import {
    userEx,
    newUserEx,
    propertiesError
} from "./objects"

export const pathUserEx = {
    parameters: [],
    post: {
        tags: ['doctor'],
        summary: 'Exemple',
        operationId: 'exemple',
        parameters: [
            {
                in: 'body',
                name: 'exemple',
                schema: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'object',
                            properties: {
                                user: userEx,
                                newUser: newUserEx
                            }
                        },
                    },
                    required: ['id', 'message'],
                }
            }
        ],
        responses: {
            200: {
                description: 'User successfully created',
                schema: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                        },
                        email: {
                            type: 'string',
                        },
                        name: {
                            type: 'string',
                        },
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
                description: `Exemple 404.`,
                schema: propertiesError
            },
            500: {
                description: `Exemple 500.`,
                schema: propertiesError
            }
        }
    }
}