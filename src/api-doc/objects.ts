export const user = {
    type: 'object',
    properties: {
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        }
    }
}

export const returnDoctor = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        userId: {
            type: 'string'
        },
        name: {
            type: 'string'
        },
        crx: {
            type: 'string'
        },
        role: {
            type: 'string'
        },
        cpf: {
            type: 'string'
        },
        createdAt: {
            type: 'string'
        },
        updatedAt: {
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

export const returnPatient = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        userId: {
            type: 'string'
        },
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
        createdAt: {
            type: 'string'
        },
        updatedAt: {
            type: 'string'
        },
        address: {
            type: 'string'
        }
    }
}

export const returnPrescription = {
    type: 'object',
    properties: {
        patientId: {
            type: 'string'
        },
        doctorId: {
            type: 'string'
        },
        pharmacyId: {
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
        },
        createdAt: {
            type: 'string'
        },
        updatedAt: {
            type: 'string'
        },
        externalId: {
            type: 'string'
        },
        doctor: {
            type: 'object',
            properties: {
                id: {
                    type: 'string'
                },
                userId: {
                    type: 'string'
                },
                name: {
                    type: 'string'
                },
                crx: {
                    type: 'string'
                },
                role: {
                    type: 'string'
                },
                cpf: {
                    type: 'string'
                },
                createdAt: {
                    type: 'string'
                },
                updatedAt: {
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
        },
        patient: {
            type: 'object',
            properties: {
                id: {
                    type: 'string'
                },
                userId: {
                    type: 'string'
                },
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
                createdAt: {
                    type: 'string'
                },
                updatedAt: {
                    type: 'string'
                },
                address: {
                    type: 'string'
                }
            }
        }
    }
}

export const returnPharmacy = {
    type: 'object',
    properties: {
        id: {
            type: 'string'
        },
        userId: {
            type: 'string'
        },
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
        createdAt: {
            type: 'string'
        },
        updatedAt: {
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

export const newUser = {
    type: 'object',
    properties: {
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        },
        fullName: {
            type: 'string'
        },
        cpf: {
            type: 'string'
        }
    }
}

export const propertiesError = {
    type: 'object',
    properties: {
        message: {
            type: 'string'
        }
    }
}
