"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = {
    type: 'object',
    properties: {
        email: {
            type: 'string'
        },
        password: {
            type: 'string'
        }
    }
};
exports.returnDoctor = {
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
};
exports.returnPatient = {
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
};
exports.returnPrescription = {
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
};
exports.returnPharmacy = {
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
};
exports.newUser = {
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
};
exports.propertiesError = {
    type: 'object',
    properties: {
        message: {
            type: 'string'
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2JqZWN0cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGktZG9jL29iamVjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLElBQUksR0FBRztJQUNoQixJQUFJLEVBQUUsUUFBUTtJQUNkLFVBQVUsRUFBRTtRQUNSLEtBQUssRUFBRTtZQUNILElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFFLFFBQVE7U0FDakI7S0FDSjtDQUNKLENBQUE7QUFFWSxRQUFBLFlBQVksR0FBRztJQUN4QixJQUFJLEVBQUUsUUFBUTtJQUNkLFVBQVUsRUFBRTtRQUNSLEVBQUUsRUFBRTtZQUNBLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsTUFBTSxFQUFFO1lBQ0osSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxHQUFHLEVBQUU7WUFDRCxJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNQLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1AsSUFBSSxFQUFFLFFBQVE7U0FDakI7UUFDRCxRQUFRLEVBQUU7WUFDTixJQUFJLEVBQUUsUUFBUTtTQUNqQjtRQUNELElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsT0FBTyxFQUFFO1lBQ0wsSUFBSSxFQUFFLFFBQVE7U0FDakI7S0FDSjtDQUNKLENBQUE7QUFFWSxRQUFBLGFBQWEsR0FBRztJQUN6QixJQUFJLEVBQUUsUUFBUTtJQUNkLFVBQVUsRUFBRTtRQUNSLEVBQUUsRUFBRTtZQUNBLElBQUksRUFBRSxRQUFRO1NBQ2pCO1FBQ0QsTUFB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