import {
    pathDeleteUser,
    pathLoginUser,
    pathUpdateUser
} from './api-doc/user'
import { pathGetDoctor,
    pathDoctor,
    pathUpdateDoctor
} from './api-doc/doctor'
import {
    pathGetPharmacy,
    pathPharmacy,
    pathUpdatePharmacy
} from './api-doc/pharmacy'
import {
    pathPatient,
    pathUpdatePatient,
    pathGetPatient,
    pathGetPatients,
    pathGetPatientByCpf
} from './api-doc/patient'
import {
    pathPrescription,
    pathUpdatePrescription,
    pathTakePrescription,
    pathDeletePrescription,
    pathGetPrescriptions,
    pathGetPrescription
} from './api-doc/prescription'

export const apiDoc = {
    swagger: '2.0',
    basePath: '/mss',
    info: {
        title: 'Medical Support System.',
        description: 'Documentation abount Medical Support System API.',
        version: '1.0.0'
    },

    tags: [
        {
            name: 'user',
            description: 'Endpoints about the user'
        },
        {
            name: 'doctor',
            description: 'Endpoints about the doctors'
        },
        {
            name: 'patient',
            description: 'Endpoints about the patients.'
        },
        {
            name: 'pharmacy',
            description: 'Endpoints about the pharmacies.'
        },
        {
            name: 'prescription',
            description: 'Endpoints about the prescriptions.'
        }
    ],

    paths: {
        '/v1/signin': pathLoginUser,
        '/v1/updateUser/{userId}': pathUpdateUser,
        '/v1/delete/{userId}': pathDeleteUser,

        '/v1/doctor/{doctorId} ': pathGetDoctor,
        '/v1/doctor': pathDoctor,
        '/v1/doctor/{doctorId}': pathUpdateDoctor,

        '/v1/pharmacy/{pharmacyId} ': pathGetPharmacy,
        '/v1/pharmacy': pathPharmacy,
        '/v1/pharmacy/{pharmacyId}': pathUpdatePharmacy,

        '/v1/patient': pathPatient,
        '/v1/patient/{patientId}': pathUpdatePatient,
        '/v1/patient/{patientId} ': pathGetPatient,
        '/v1/patients': pathGetPatients,
        '/v1/patient/cpf/{cpf}': pathGetPatientByCpf,

        '/v1/prescription': pathPrescription,
        '/v1/prescription/{prescriptionId}': pathUpdatePrescription,
        '/v1/prescription/take/{prescriptionId}': pathTakePrescription,
        '/v1/prescription/{prescriptionId} ': pathDeletePrescription,
        '/v1/prescriptions': pathGetPrescriptions,
        '/v1/prescription/{prescriptionId}  ': pathGetPrescription
    }
}
