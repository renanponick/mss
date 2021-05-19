"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../error");
const patient_1 = __importDefault(require("../services/patient"));
const type_1 = require("../type");
class PatientApi {
    constructor() {
        this.patientService = new patient_1.default();
    }
    async createPatient(req, res) {
        const body = req.body;
        if (!type_1.CreatePatient.is(body)) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.patientService.create(body);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({
                message: error_1.messageError(1),
                err: err.message
            });
        }
    }
    async updatePatient(req, res) {
        const body = req.body;
        body.id = req.params.patientId;
        const patient = await this.patientService.findUser(body.userId);
        if (patient.id !== body.id) {
            res.status(400).send({ message: error_1.messageError(8) });
        }
        if (!type_1.UpdatePatient.is(body) || !req.params.patientId) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.patientService.update(body);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({
                message: error_1.messageError(2),
                err: err.message
            });
        }
    }
    async getPatient(req, res) {
        const patientId = req.params.patientId;
        const patient = await this.patientService.findUser(req.body.userId);
        if (patient.id !== patientId) {
            res.status(400).send({ message: error_1.messageError(8) });
        }
        if (!patientId) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.patientService.find(patientId);
            res.send(result);
        }
        catch (err) {
            res.status(404).send({
                message: error_1.messageError(4, `Paciente com id ${patientId} não encontrado.`),
                err: err.message
            });
        }
    }
    async getPatientByCpf(req, res) {
        const cpf = req.params.cpf;
        if (!cpf) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.patientService.findByCpf(cpf);
            res.send(result);
        }
        catch (err) {
            res.status(404).send({
                message: error_1.messageError(4, `Paciente com CPF: ${cpf} não encontrado.`),
                err: err.message
            });
        }
    }
    async getPatients(_, res) {
        try {
            const result = await this.patientService.findAll();
            res.send(result);
        }
        catch (err) {
            res.status(404).send({
                message: error_1.messageError(4),
                err: err.message
            });
        }
    }
}
exports.default = PatientApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvcGF0aWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLG9DQUF1QztBQUN2QyxrRUFBZ0Q7QUFDaEQsa0NBQXNEO0FBRXRELE1BQXFCLFVBQVU7SUFBL0I7UUFFWSxtQkFBYyxHQUFHLElBQUksaUJBQWMsRUFBRSxDQUFBO0lBdUdqRCxDQUFDO0lBckdHLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBWSxFQUFFLEdBQWE7UUFDM0MsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUVyQixJQUFJLENBQUMsb0JBQWEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDekIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsb0JBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDckQ7UUFFRCxJQUFJO1lBQ0EsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNyRCxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO1NBQ25CO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDakIsT0FBTyxFQUFFLG9CQUFZLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixHQUFHLEVBQUUsR0FBRyxDQUFDLE9BQU87YUFDbkIsQ0FBQyxDQUFBO1NBQ0w7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxHQUFZLEVBQUUsR0FBYTtRQUMzQyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBQ3JCLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxTQUFT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