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
const ramda_1 = require("ramda");
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const patient_1 = __importDefault(require("../repositories/patient"));
const user_1 = __importDefault(require("./user"));
let PatientService = class PatientService {
    async create(fields) {
        const repository = typeorm_1.getCustomRepository(patient_1.default);
        const users = new user_1.default();
        const input = {
            email: fields.user.email,
            password: fields.user.password,
            type: 1
        };
        const user = await users.create(input);
        const patient = {
            userId: user.id,
            ...ramda_1.omit(['user'], fields)
        };
        return repository.createAndSave(patient);
    }
    async update(fields) {
        const repository = typeorm_1.getCustomRepository(patient_1.default);
        const query = { id: fields.id };
        const patient = await repository
            .findOneOrFail({ where: query });
        return repository.save({
            ...query,
            ...patient,
            ...fields
        });
    }
    async findUser(userId) {
        const repository = typeorm_1.getCustomRepository(patient_1.default);
        const query = { userId };
        return repository.findOneOrFail({ where: query });
    }
    async findByCpf(cpf) {
        const repository = typeorm_1.getCustomRepository(patient_1.default);
        const query = { cpf };
        return repository.findOneOrFail({ where: query });
    }
    async find(id) {
        const repository = typeorm_1.getCustomRepository(patient_1.default);
        const query = { id };
        return repository.findOneOrFail({ where: query });
    }
    async findAll() {
        const repository = typeorm_1.getCustomRepository(patient_1.default);
        return repository.findAll();
    }
};
PatientService = __decorate([
    typedi_1.Service()
], PatientService);
exports.default = PatientService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy9wYXRpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsaUNBQTRCO0FBQzVCLG1DQUFnQztBQUNoQyxxQ0FBNkM7QUFFN0Msc0VBQXVEO0FBR3ZELGtEQUFnQztBQUdoQyxJQUFxQixjQUFjLEdBQW5DLE1BQXFCLGNBQWM7SUFFL0IsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFxQjtRQUM5QixNQUFNLFVBQVUsR0FBRyw2QkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBQ3pELE1BQU0sS0FBSyxHQUFnQixJQUFJLGNBQVcsRUFBRSxDQUFBO1FBQzVDLE1BQU0sS0FBSyxHQUFHO1lBQ1YsS0FBSyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSztZQUN4QixRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRO1lBQzlCLElBQUksRUFBRSxDQUFDO1NBQ1YsQ0FBQTtRQUNELE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUV0QyxNQUFNLE9BQU8sR0FBRztZQUNaLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNmLEdBQUcsWUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEVBQUUsTUFBTSxDQUFDO1NBQzVCLENBQUE7UUFFRCxPQUFPLFVBQVUsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBcUI7UUFDOUIsTUFBTSxVQUFVLEdBQUcsNkJBQW1CLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtRQUN6RCxNQUFNLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBRSxNQUFNLENBQUMsRUFBRSxFQUFFLENBQUE7UUFFL0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxVQUFVO2FBQzNCLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBRXBDLE9BQU8sVUFBVSxDQUFDLElBQUksQ0FBQztZQUNuQixHQUFHLEtBQUs7WUFDUixHQUFHLE9BQU87WUFDVixHQUFHLE1BQU07U0FDWixDQUFDLENBQUE7SUFDTixDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFjO1FBQ3pCLE1BQU0sVUFBVSxHQUFHLDZCQUFtQixDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDekQsTUFBTSxLQUFLLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQTtRQUV4QixPQUFPLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFXO1FBQ3ZCLE1BQU0sVUFBVSxHQUFHLDZCQUFtQixDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDekQsTUFBTSxLQUFLLEdBQUcsRUFBRSxHQUFHLEVBQUUsQ0FBQTtRQUVyQixPQUFPLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFVO1FBQ2pCLE1BQU0sVUFBVSxHQUFHLDZCQUFtQixDQUFDLGlCQUFpQixDQUFDLENBQUE7UUFDekQsTUFBTSxLQUFLLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQTtRQUVwQixPQUFPLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDVCxNQUFNLFVBQVUsR0FBRyw2QkFBbUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFBO1FBRXpELE9BQU8sVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQy9CLENBQUM7Q0FFSixDQUFBO0FBN0RvQixjQUFjO0lBRGxDLGdCQUFPLEVBQUU7R0FDVyxjQUFjLENBNkRsQztrQkE3RG9CLGNBQWMifQ==