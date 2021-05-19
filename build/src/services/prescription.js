"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const date_fns_1 = require("date-fns");
const ramda_1 = require("ramda");
const prescription_1 = __importDefault(require("../repositories/prescription"));
const user_1 = __importDefault(require("./user"));
const doctor_1 = __importDefault(require("./doctor"));
const patient_1 = __importDefault(require("./patient"));
const pharmacy_1 = __importDefault(require("./pharmacy"));
// - import DocuSign from './docusign/integration'
let PrescriptionService = class PrescriptionService {
    constructor() {
        this.userService = new user_1.default();
        this.doctorService = new doctor_1.default();
        this.patientService = new patient_1.default();
        this.pharmacyService = new pharmacy_1.default();
    }
    async create(fields) {
        // - const docu = new DocuSign()
        // - console.log(await docu.getToken())
        const repository = typeorm_1.getCustomRepository(prescription_1.default);
        return repository.createAndSave(ramda_1.omit(['userId'], fields));
    }
    async update(fields) {
        const repository = typeorm_1.getCustomRepository(prescription_1.default);
        const query = { id: fields.id };
        const prescription = await repository
            .findOneOrFail({ where: query });
        if (!date_fns_1.isToday(prescription.createdAt)) {
            throw new Error('Não é possivel alterar uma prescrição gerada a mais de um dia.');
        }
        if (prescription.pharmacyId) {
            throw new Error('Não é possivel alterar uma receita já dispensada.');
        }
        return repository.save({
            ...query,
            ...prescription,
            ...ramda_1.omit(['userId'], fields)
        });
    }
    async takePrescription(fields) {
        const repository = typeorm_1.getCustomRepository(prescription_1.default);
        const query = { id: fields.id };
        const prescription = await repository
            .findOneOrFail({ where: query });
        if (date_fns_1.isAfter(new Date(), new Date(prescription.validity))) {
            throw new Error('Receita vencida.');
        }
        if (prescription.pharmacyId) {
            throw new Error('Receita já dispensada.');
        }
        return repository.save({
            ...query,
            ...prescription,
            pharmacyId: fields.pharmacyId
        });
    }
    async remove(id) {
        const repository = typeorm_1.getCustomRepository(prescription_1.default);
        const query = { id };
        const prescription = await repository.findOneOrFail(query);
        if (!date_fns_1.isToday(prescription.createdAt)) {
            throw new Error('Não é possivel excluir uma receita gerada a mais de um dia.');
        }
        if (prescription.pharmacyId) {
            throw new Error('Não é possivel excluir uma receita já dispensada.');
        }
        await repository.remove({ ...prescription });
        return ramda_1.omit(['userId'], prescription);
    }
    async getPrescription(userId, prescriptionId) {
        const { type } = await this.userService.find(userId);
        try {
            let result;
            if (type === 0) {
                const { id } = await this.doctorService.findUser(userId);
                result = await this.findByDoctor(id);
            }
            else if (type === 1) {
                const { id } = await this.patientService.findUser(userId);
                result = await this.findByPatient(id);
            }
            else if (type === 2) {
                const { id } = await this.pharmacyService.findUser(userId);
                result = await this.findByPharmacy(id);
            }
            if (result && result.length > 0) {
                return result.find(prescription => prescription.id === prescriptionId);
            }
            else {
                throw new Error('Receita não encontrada para usuário logado.');
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async find(id) {
        const repository = typeorm_1.getCustomRepository(prescription_1.default);
        const query = { id };
        return repository.findOneOrFail({ where: query });
    }
    async getPrescriptions(userId) {
        const { type } = await this.userService.find(userId);
        try {
            if (type === 0) {
                const { id } = await this.doctorService.findUser(userId);
                const result = await this.findByDoctor(id);
                return result;
            }
            else if (type === 1) {
                const { id } = await this.patientService.findUser(userId);
                const result = await this.findByPatient(id);
                return result;
            }
            else if (type === 2) {
                const { id } = await this.pharmacyService.findUser(userId);
                const result = await this.findByPharmacy(id);
                return result;
            }
        }
        catch (err) {
            throw new Error(err);
        }
    }
    async findByDoctor(doctorId) {
        const repository = typeorm_1.getCustomRepository(prescription_1.default);
        const query = { doctorId };
        return repository.find({ where: query });
    }
    async findByPatient(patientId) {
        const repository = typeorm_1.getCustomRepository(prescription_1.default);
        const query = { patientId };
        return repository.find({ where: query });
    }
    async findByPharmacy(pharmacyId) {
        const repository = typeorm_1.getCustomRepository(prescription_1.default);
        const query = { pharmacyId };
        return repository.find({ where: query });
    }
};
PrescriptionService = __decorate([
    typedi_1.Service()
], PrescriptionService);
exports.default = PrescriptionService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2NyaXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL3ByZXNjcmlwdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG1DQUFnQztBQUNoQyxxQ0FBNkM7QUFDN0MsdUNBQTJDO0FBQzNDLGlDQUE0QjtBQUU1QixnRkFBaUU7QUFPakUsa0RBQWdDO0FBQ2hDLHNEQUFvQztBQUNwQyx3REFBc0M7QUFDdEMsMERBQXdDO0FBQ3hDLGtEQUFrRDtBQUdsRCxJQUFxQixtQkFBbUIsR0FBeEMsTUFBcUIsbUJBQW1CO0lBQXhDO1FBRVksZ0JBQVcsR0FBRyxJQUFJLGNBQVcsRUFBRSxDQUFBO1FBQy9CLGtCQUFhLEdBQUcsSUFBSSxnQkFBYSxFQUFFLENBQUE7UUFDbkMsbUJBQWMsR0FBRyxJQUFJLGlCQUFjLEVBQUUsQ0FBQTtRQUNyQyxvQkFBZSxHQUFHLElBQUksa0JBQWUsRUFBRSxDQUFBO0lBNEpuRCxDQUFDO0lBMUpHLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBMEI7UUFDbkMsZ0NBQWdDO1FBQ2hDLHVDQUF1QztRQUN2QyxNQUFNLFVBQVUsR0FBRyw2QkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBRTlELE9BQU8sVUFBVSxDQUFDLGFBQWEsQ0FDM0IsWUFBSSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQzNCLENBQUE7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUEwQjtRQUNuQyxNQUFNLFVBQVUsR0FBRyw2QkFBbUIsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO1FBQzlELE1BQU0sS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQTtRQUMvQixNQUFNLFlBQVksR0FBRyxNQUFNLFVBQVU7YUFDaEMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7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