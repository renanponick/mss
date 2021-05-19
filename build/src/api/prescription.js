"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../error");
const prescription_1 = __importDefault(require("../services/prescription"));
const type_1 = require("../type");
class PrescriptionApi {
    constructor() {
        this.prescriptionService = new prescription_1.default();
    }
    async createPrescription(req, res) {
        const body = req.body;
        if (!type_1.CreatePrescription.is(body)) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.prescriptionService.create(body);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({
                message: error_1.messageError(1),
                err: err.message
            });
        }
    }
    async takePrescription(req, res) {
        const body = req.body;
        body.id = req.params.prescriptionId;
        if (!type_1.TakePrescription.is(body)) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.prescriptionService.takePrescription(body);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({
                message: error_1.messageError(2),
                err: err.message
            });
        }
    }
    async updatePrescription(req, res) {
        const body = req.body;
        body.id = req.params.prescriptionId;
        if (!type_1.UpdatePrescription.is(body)) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.prescriptionService.update(body);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({
                message: error_1.messageError(2),
                err: err.message
            });
        }
    }
    async deletePrescription(req, res) {
        const prescriptionId = req.params.prescriptionId;
        if (!prescriptionId) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.prescriptionService.remove(prescriptionId);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({
                message: error_1.messageError(3),
                err: err.message
            });
        }
    }
    async getPrescription(req, res) {
        try {
            const userId = req.body.userId;
            const prescriptionId = req.params.prescriptionId;
            const result = await this.prescriptionService
                .getPrescription(userId, prescriptionId);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({
                message: error_1.messageError(4),
                err: err.message
            });
        }
    }
    async getPrescriptions(req, res) {
        try {
            const result = await this.prescriptionService
                .getPrescriptions(req.body.userId);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({
                message: error_1.messageError(4),
                err: err.message
            });
        }
    }
}
exports.default = PrescriptionApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2NyaXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2FwaS9wcmVzY3JpcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFFQSxvQ0FBdUM7QUFDdkMsNEVBQTBEO0FBQzFELGtDQUlnQjtBQUVoQixNQUFxQixlQUFlO0lBQXBDO1FBRVksd0JBQW1CLEdBQUcsSUFBSSxzQkFBbUIsRUFBRSxDQUFBO0lBdUczRCxDQUFDO0lBckdHLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxHQUFZLEVBQUUsR0FBYTtRQUNoRCxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBRXJCLElBQUksQ0FBQyx5QkFBa0IsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDOUIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsb0JBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7U0FDckQ7UUFFRCxJQUFJO1lBQ0EsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQzFELEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDbkI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNqQixPQUFPLEVBQUUsb0JBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLEdBQUcsRUFBRSxHQUFHLENBQUMsT0FBTzthQUNuQixDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsZ0JBQWdCLENBQUMsR0FBWSxFQUFFLEdBQWE7UUFDOUMsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQTtRQUNyQixJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcs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