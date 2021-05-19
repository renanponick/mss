"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const bluebird_1 = require("bluebird");
const logger_1 = __importDefault(require("./logger"));
const database_1 = __importDefault(require("./database"));
const api_doc_1 = require("./api-doc");
const health_check_1 = require("./health-check");
const doctor_1 = __importDefault(require("./api/doctor"));
const patient_1 = __importDefault(require("./api/patient"));
const pharmacy_1 = __importDefault(require("./api/pharmacy"));
const prescription_1 = __importDefault(require("./api/prescription"));
const user_1 = __importDefault(require("./api/user"));
const auth_1 = __importDefault(require("./middlewares/auth"));
async function gracefulExit(signal) {
    logger_1.default.info(`Signal "${signal}" received, shutting down...`);
    const connection = await database_1.default;
    await bluebird_1.race([bluebird_1.delay(5000), connection.close()]);
    process.exit(0);
}
logger_1.default.info(`Process id: ${process.pid}`);
process.on('SIGTERM', gracefulExit);
process.on('SIGINT', gracefulExit);
const app = express_1.default();
const doctorApi = new doctor_1.default();
const pharmacyApi = new pharmacy_1.default();
const patientApi = new patient_1.default();
const prescriptionService = new prescription_1.default();
const userService = new user_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.get('/mss/v1/ping', async (_, res) => {
    logger_1.default.info('Call route /ping');
    res.send({ message: 'Hello! Ping it\'s OK!' });
});
app.get('/mss/v1/health-check', health_check_1.healthCheck);
const binder = (api, method) => async (req, res) => {
    api[method](req, res);
};
// Doctor - 0
app.post('/mss/v1/doctor', binder(doctorApi, 'createDoctor'));
app.put('/mss/v1/doctor/:doctorId', auth_1.default([0]), binder(doctorApi, 'updateDoctor'));
app.get('/mss/v1/doctor/:doctorId', auth_1.default([0]), binder(doctorApi, 'getDoctor'));
// App.get("/mss/v1/doctors", AuthMiddleware([0]), binder(doctorApi, 'getDoctors'))
// Patient - 1
app.post('/mss/v1/patient', binder(patientApi, 'createPatient'));
app.put('/mss/v1/patient/:patientId', auth_1.default([1]), binder(patientApi, 'updatePatient'));
app.get('/mss/v1/patient/:patientId', auth_1.default([1]), binder(patientApi, 'getPatient'));
app.get('/mss/v1/patients', auth_1.default([0]), binder(patientApi, 'getPatients'));
app.get('/mss/v1/patient/cpf/:cpf', auth_1.default([2]), binder(patientApi, 'getPatientByCpf'));
// Phanrmacy - 2
app.post('/mss/v1/pharmacy', binder(pharmacyApi, 'createPharmacy'));
app.put('/mss/v1/pharmacy/:pharmacyId', auth_1.default([2]), binder(pharmacyApi, 'updatePharmacy'));
app.get('/mss/v1/pharmacy/:pharmacyId', auth_1.default([2]), binder(pharmacyApi, 'getPharmacy'));
// App.get("/mss/v1/pharmacies", binder(pharmacyApi, 'getPharmacies'))
// Prescription
app.post('/mss/v1/prescription', auth_1.default([0]), binder(prescriptionService, 'createPrescription'));
app.put('/mss/v1/prescription/:prescriptionId', auth_1.default([0]), binder(prescriptionService, 'updatePrescription'));
app.put('/mss/v1/prescription/take/:prescriptionId', auth_1.default([2]), binder(prescriptionService, 'takePrescription'));
app.delete('/mss/v1/prescription/:prescriptionId', auth_1.default([0]), binder(prescriptionService, 'deletePrescription'));
app.get('/mss/v1/prescriptions/', auth_1.default([0, 1, 2]), binder(prescriptionService, 'getPrescriptions'));
app.get('/mss/v1/prescription/:prescriptionId', auth_1.default([0, 1, 2]), binder(prescriptionService, 'getPrescription'));
// User
app.post('/mss/v1/signin', binder(userService, 'loginAuthUser'));
app.put('/mss/v1/updateUser/:userId', auth_1.default([0, 1, 2], true), binder(userService, 'updateUser'));
app.delete('/mss/v1/removeUser/:userId', auth_1.default([0, 1, 2]), binder(userService, 'removeUser'));
async function run() {
    await database_1.default;
    app.listen(3000, () => {
        logger_1.default.info(`Servidor rodando: http://localhost:3000`);
    });
    app.use('/api-doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(api_doc_1.apiDoc));
}
exports.default = run().catch(err => {
    logger_1.default.error(err);
    logger_1.default.error(err.stack);
    process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLHNEQUFvRDtBQUNwRCw4REFBb0M7QUFDcEMsNEVBQTBDO0FBQzFDLHVDQUFzQztBQUd0QyxzREFBMEI7QUFDMUIsMERBQXFDO0FBQ3JDLHVDQUFrQztBQUNsQyxpREFBNEM7QUFDNUMsMERBQW9DO0FBQ3BDLDREQUFzQztBQUN0Qyw4REFBd0M7QUFDeEMsc0VBQWdEO0FBQ2hELHNEQUFnQztBQUNoQyw4REFBK0M7QUFFL0MsS0FBSyxVQUFVLFlBQVksQ0FBQyxNQUFzQjtJQUM5QyxnQkFBRyxDQUFDLElBQUksQ0FBQyxXQUFXLE1BQU0sOEJBQThCLENBQUMsQ0FBQTtJQUN6RCxNQUFNLFVBQVUsR0FBRyxNQUFNLGtCQUFZLENBQUE7SUFFckMsTUFBTSxlQUFJLENBQUMsQ0FBQyxnQkFBSyxDQUFDLElBQUksQ0FBQyxFQUFFLFVBQVUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUE7SUFDN0MsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNuQixDQUFDO0FBRUQsZ0JBQUcsQ0FBQyxJQUFJLENBQUMsZUFBZSxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtBQUV0QyxPQUFPLENBQUMsRUFBRSxDQUFDLFNBQVMsRUFBRSxZQUFZLENBQUMsQ0FBQTtBQUNuQyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFZLENBQUMsQ0FBQTtBQUVsQyxNQUFNLEdBQUcsR0FBRyxpQkFBTyxFQUFFLENBQUE7QUFFckIsTUFBTSxTQUFTLEdBQUcsSUFBSSxnQkFBUyxFQUFFLENBQUE7QUFDakMsTUFBTSxXQUFXLEdBQUcsSUFBSSxrQkFBVyxFQUFFLENBQUE7QUFDckMsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQkFBVSxFQUFFLENBQUE7QUFDbkMsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLHNCQUFlLEVBQUUsQ0FBQTtBQUNqRCxNQUFNLFdBQVcsR0FBRyxJQUFJLGNBQU8sRUFBRSxDQUFBO0FBRWpDLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBQzFCLEdBQUcsQ0FBQyxHQUFHLENBQUMscUJBQVUsQ0FBQyxVQUFVLENBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFBO0FBRWxELEdBQUcsQ0FBQyxHQUFHLENBQUMsY0FBYyxFQUFFLEtBQUssRUFBRSxDQUFVLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDeEQsZ0JBQUcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtJQUU1QixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLHVCQUF1QixFQUFFLENBQUMsQ0FBQTtBQUNsRCxDQUFDLENBQUMsQ0FBQTtBQUVGLEdBQUcsQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsMEJBQVcsQ0FBQyxDQUFBO0FBRTVDLE1BQU0sTUFBTSxHQUFHLENBQUMsR0FBUSxFQUFFLE1BQWMsRUFBRSxFQUFFLENBQ3hDLEtBQUssRUFBRSxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDbEMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQTtBQUN6QixDQUFDLENBQUE7QUFFTCxhQUFhO0FBQ2IsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUE7QUFDN0QsR0FBRyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQTtBQUMzRixHQUFHLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFBO0FBQ3hGLG1GQUFtRjtBQUVuRixjQUFjO0FBQ2QsR0FBRyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLGVBQWUsQ0FBQyxDQUFDLENBQUE7QUFDaEUsR0FBRyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQTtBQUMvRixHQUFHLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFBO0FBQzVGLEdBQUcsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUE7QUFDbkYsR0FBRyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO0FBRS9GLGdCQUFnQjtBQUNoQixHQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQyxDQUFBO0FBQ25FLEdBQUcsQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUFFLGdCQUFnQixDQUFDLENBQUMsQ0FBQTtBQUNuRyxHQUFHLENBQUMsR0FBRyxDQUFDLDhCQUE4QixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFBO0FBQ2hHLHNFQUFzRTtBQUV0RSxlQUFlO0FBQ2YsR0FBRyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUE7QUFDeEcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxzQ0FBc0MsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUE7QUFDdkgsR0FBRyxDQUFDLEdBQUcsQ0FBQywyQ0FBMkMsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDLENBQUE7QUFDMUgsR0FBRyxDQUFDLE1BQU0sQ0FBQyxzQ0FBc0MsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxtQkFBbUIsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUE7QUFDMUgsR0FBRyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLG1CQUFtQixFQUFFLGtCQUFrQixDQUFDLENBQUMsQ0FBQTtBQUMzRyxHQUFHLENBQUMsR0FBRyxDQUFDLHNDQUFzQyxFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsbUJBQW1CLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxDQUFBO0FBRXhILE9BQU87QUFDUCxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQTtBQUNoRSxHQUFHLENBQUMsR0FBRyxDQUFDLDRCQUE0QixFQUFFLGNBQWMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLFdBQVcsRUFBRSxZQUFZLENBQUMsQ0FBQyxDQUFBO0FBQ3ZHLEdBQUcsQ0FBQyxNQUFNLENBQUMsNEJBQTRCLEVBQUUsY0FBYyxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQTtBQUVwRyxLQUFLLFVBQVUsR0FBRztJQUNkLE1BQU0sa0JBQVksQ0FBQTtJQUVsQixHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7UUFDbEIsZ0JBQUcsQ0FBQyxJQUFJLENBQUMseUNBQXlDLENBQUMsQ0FBQTtJQUN2RCxDQUFDLENBQUMsQ0FBQTtJQUVGLEdBQUcsQ0FBQyxHQUFHLENBQ0gsVUFBVSxFQUNWLDRCQUFTLENBQUMsS0FBSyxFQUNmLDRCQUFTLENBQUMsS0FBSyxDQUFDLGdCQUFNLENBQUMsQ0FDMUIsQ0FBQTtBQUNMLENBQUM7QUFFRCxrQkFBZSxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7SUFDN0IsZ0JBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDZCxnQkFBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDcEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNuQixDQUFDLENBQUMsQ0FBQSJ9