"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../error");
const pharmacy_1 = __importDefault(require("../services/pharmacy"));
const type_1 = require("../type");
class PharmacyApi {
    constructor() {
        this.pharmacyService = new pharmacy_1.default();
    }
    async createPharmacy(req, res) {
        const body = req.body;
        if (!type_1.CreatePharmacy.is(body)) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.pharmacyService.create(body);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({
                message: error_1.messageError(1),
                err: err.message
            });
        }
    }
    async updatePharmacy(req, res) {
        const body = req.body;
        body.id = req.params.pharmacyId;
        const pharmacy = await this.pharmacyService.findUser(body.userId);
        if (pharmacy.id !== body.id) {
            res.status(400).send({ message: error_1.messageError(8) });
        }
        if (!type_1.UpdatePharmacy.is(body) || !req.params.pharmacyId) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.pharmacyService.update(body);
            res.send(result);
        }
        catch (err) {
            res.status(500).send({
                message: error_1.messageError(2),
                err: err.message
            });
        }
    }
    async getPharmacy(req, res) {
        const pharmacyId = req.params.pharmacyId;
        const pharmacy = await this.pharmacyService.findUser(req.body.userId);
        if (pharmacy.id !== pharmacyId) {
            res.status(400).send({ message: error_1.messageError(8) });
        }
        if (!pharmacyId) {
            res.status(400).send({ message: error_1.messageError(5) });
        }
        try {
            const result = await this.pharmacyService.find(pharmacyId);
            res.send(result);
        }
        catch (err) {
            res.status(404).send({
                message: error_1.messageError(4, `Farmacia com id ${pharmacyId} não encontrado.`),
                err: err.message
            });
        }
    }
    async getPharmacies(_, res) {
        try {
            const result = await this.pharmacyService.findAll();
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
exports.default = PharmacyApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBpL3BoYXJtYWN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUEsb0NBQXVDO0FBQ3ZDLG9FQUFrRDtBQUNsRCxrQ0FBd0Q7QUFFeEQsTUFBcUIsV0FBVztJQUFoQztRQUVZLG9CQUFlLEdBQUcsSUFBSSxrQkFBZSxFQUFFLENBQUE7SUFrRm5ELENBQUM7SUFoRkcsS0FBSyxDQUFDLGNBQWMsQ0FBQyxHQUFZLEVBQUUsR0FBYTtRQUM1QyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBRXJCLElBQUksQ0FBQyxxQkFBYyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMxQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtTQUNyRDtRQUVELElBQUk7WUFDQSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBQ3RELEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDbkI7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNqQixPQUFPLEVBQUUsb0JBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLEdBQUcsRUFBRSxHQUFHLENBQUMsT0FBTzthQUNuQixDQUFDLENBQUE7U0FDTDtJQUNMLENBQUM7SUFFRCxLQUFLLENBQUMsY0FBYyxDQUFDLEdBQVksRUFBRSxHQUFhO1FBQzVDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7UUFDckIsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLFVB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