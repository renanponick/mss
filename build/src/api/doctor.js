"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../error");
const doctor_1 = __importDefault(require("../services/doctor"));
const type_1 = require("../type");
class DoctorApi {
    constructor() {
        this.doctorService = new doctor_1.default();
    }
    async createDoctor(req, res) {
        const body = req.body;
        if (!type_1.CreateDoctor.is(body)) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.doctorService.create(body);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({
                message: error_1.messageError(1),
                err: err.message
            });
        }
    }
    async updateDoctor(req, res) {
        const body = req.body;
        body.id = req.params.doctorId;
        const doctor = await this.doctorService.findUser(body.userId);
        if (doctor.id !== body.id) {
            res.status(400).send({ message: error_1.messageError(8) });
        }
        if (!type_1.UpdateDoctor.is(body) || !req.params.doctorId) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.doctorService.update(body);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({
                message: error_1.messageError(2),
                err: err.message
            });
        }
    }
    async getDoctor(req, res) {
        const doctorId = req.params.doctorId;
        const doctor = await this.doctorService.findUser(req.body.userId);
        if (doctor.id !== doctorId) {
            res.status(400).send({ message: error_1.messageError(8) });
        }
        if (!doctorId) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.doctorService.find(doctorId);
            res.send(result);
        }
        catch (err) {
            res.status(404).send({
                message: error_1.messageError(4, `Doutor com id ${doctorId} não encontrado.`),
                err: err.message
            });
        }
    }
    async getDoctors(_, res) {
        try {
            const result = await this.doctorService.findAll();
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
exports.default = DoctorApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9kb2N0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxvQ0FBdUM7QUFDdkMsZ0VBQThDO0FBQzlDLGtDQUFvRDtBQUVwRCxNQUFxQixTQUFTO0lBQTlCO1FBRVksa0JBQWEsR0FBRyxJQUFJLGdCQUFhLEVBQUUsQ0FBQTtJQWtGL0MsQ0FBQztJQWhGRyxLQUFLLENBQUMsWUFBWSxDQUFDLEdBQVksRUFBRSxHQUFhO1FBQzFDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7UUFFckIsSUFBSSxDQUFDLG1CQUFZLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3hCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLG9CQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1NBQ3JEO1FBRUQsSUFBSTtZQUNBLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDcEQsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtTQUNuQjtRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1YsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxvQkFBWSxDQUFDLENBQUMsQ0FBQztnQkFDeEIsR0FBRyxFQUFFLEdBQUcsQ0FBQyxPQUFPO2FBQ25CLENBQUMsQ0FBQTtTQUNMO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUMsR0FBWSxFQUFFLEdBQWE7UUFDMUMsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUNyQixJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxD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