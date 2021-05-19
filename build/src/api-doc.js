"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./api-doc/user");
const doctor_1 = require("./api-doc/doctor");
const pharmacy_1 = require("./api-doc/pharmacy");
const patient_1 = require("./api-doc/patient");
const prescription_1 = require("./api-doc/prescription");
exports.apiDoc = {
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
        '/v1/signin': user_1.pathLoginUser,
        '/v1/updateUser/{userId}': user_1.pathUpdateUser,
        '/v1/delete/{userId}': user_1.pathDeleteUser,
        '/v1/doctor/{doctorId} ': doctor_1.pathGetDoctor,
        '/v1/doctor': doctor_1.pathDoctor,
        '/v1/doctor/{doctorId}': doctor_1.pathUpdateDoctor,
        '/v1/pharmacy/{pharmacyId} ': pharmacy_1.pathGetPharmacy,
        '/v1/pharmacy': pharmacy_1.pathPharmacy,
        '/v1/pharmacy/{pharmacyId}': pharmacy_1.pathUpdatePharmacy,
        '/v1/patient': patient_1.pathPatient,
        '/v1/patient/{patientId}': patient_1.pathUpdatePatient,
        '/v1/patient/{patientId} ': patient_1.pathGetPatient,
        '/v1/patients': patient_1.pathGetPatients,
        '/v1/patient/cpf/{cpf}': patient_1.pathGetPatientByCpf,
        '/v1/prescription': prescription_1.pathPrescription,
        '/v1/prescription/{prescriptionId}': prescription_1.pathUpdatePrescription,
        '/v1/prescription/take/{prescriptionId}': prescription_1.pathTakePrescription,
        '/v1/prescription/{prescriptionId} ': prescription_1.pathDeletePrescription,
        '/v1/prescriptions': prescription_1.pathGetPrescriptions,
        '/v1/prescription/{prescriptionId}  ': prescription_1.pathGetPrescription
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLWRvYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hcGktZG9jLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBSXVCO0FBQ3ZCLDZDQUd5QjtBQUN6QixpREFJMkI7QUFDM0IsK0NBTTBCO0FBQzFCLHlEQU8rQjtBQUVsQixRQUFBLE1BQU0sR0FBRztJQUNsQixPQUFPLEVBQUUsS0FBSztJQUNkLFFBQVEsRUFBRSxNQUFNO0lBQ2hCLElBQUksRUFBRTtRQUNGLEtBQUssRUFBRSx5QkFBeUI7UUFDaEMsV0FBVyxFQUFFLGtEQUFrRDtRQUMvRCxPQUFPLEVBQUUsT0FBTztLQUNuQjtJQUVELElBQUksRUFBRTtRQUNGO1lBQ0ksSUFBSSxFQUFFLE1BQU07WUFDWixXQUFXLEVBQUUsMEJBQTBCO1NBQzFDO1FBQ0Q7WUFDSSxJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFBRSw2QkFBNkI7U0FDN0M7UUFDRDtZQUNJLElBQUksRUFBRSxTQUFTO1lBQ2YsV0FBVyxFQUFFLCtCQUErQjtTQUMvQztRQUNEO1lBQ0ksSUFBSSxFQUFFLFVBQVU7WUFDaEIsV0FBVyxFQUFFLGlDQUFpQztTQUNqRDtRQUNEO1lBQ0ksSUFBSSxFQUFFLGNBQWM7WUFDcEIsV0FBVyxFQUFFLG9DQUFvQztTQUNwRDtLQUNKO0lBRUQsS0FBSyxFQUFFO1FBQ0gsWUFBWSxFQUFFLG9CQUFhO1FBQzNCLHlCQUF5QixFQUFFLHFCQUFjO1FBQ3pDLHFCQUFxQixFQUFFLHFCQUFjO1FBRXJDLHdCQUF3QixFQUFFLHNCQUFhO1FBQ3ZDLFlBQVksRUFBRSxtQkFBVTtRQUN4Qix1QkFBdUIsRUFBRSx5QkFBZ0I7UUFFekMsNEJBQTRCLEVBQUUsMEJBQWU7UUFDN0MsY0FBYyxFQUFFLHVCQUFZO1FBQzVCLDJCQUEyQixFQUFFLDZCQUFrQjtRQUUvQyxhQUFhLEVBQUUscUJBQVc7UUFDMUIseUJBQXlCLEVBQUUsMkJBQWlCO1FBQzVDLDBCQUEwQixFQUFFLHdCQUFjO1FBQzFDLGNBQWMsRUFBRSx5QkFBZTtRQUMvQix1QkFBdUIsRUFBRSw2QkFBbUI7UUFFNUMsa0JBQWtCLEVBQUUsK0JBQWdCO1FBQ3BDLG1DQUFtQyxFQUFFLHFDQUFzQjtRQUMzRCx3Q0FBd0MsRUFBRSxtQ0FBb0I7UUFDOUQsb0NBQW9DLEVBQUUscUNBQXNCO1FBQzVELG1CQUFtQixFQUFFLG1DQUFvQjtRQUN6QyxxQ0FBcUMsRUFBRSxrQ0FBbUI7S0FDN0Q7Q0FDSixDQUFBIn0=