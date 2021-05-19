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
const doctor_1 = __importDefault(require("../repositories/doctor"));
const user_1 = __importDefault(require("./user"));
let DoctorService = class DoctorService {
    async create(fields) {
        const repository = typeorm_1.getCustomRepository(doctor_1.default);
        const users = new user_1.default();
        const input = {
            email: fields.user.email,
            password: fields.user.password,
            type: 0
        };
        const user = await users.create(input);
        const doctor = {
            userId: user.id,
            ...ramda_1.omit(['user'], fields)
        };
        return repository.createAndSave(doctor);
    }
    async update(fields) {
        const repository = typeorm_1.getCustomRepository(doctor_1.default);
        const query = { id: fields.id };
        const doctor = await repository
            .findOneOrFail({ where: query });
        return repository.save({
            ...query,
            ...doctor,
            ...fields
        });
    }
    async findUser(userId) {
        const repository = typeorm_1.getCustomRepository(doctor_1.default);
        const query = { userId };
        return repository.findOneOrFail({ where: query });
    }
    async find(id) {
        const repository = typeorm_1.getCustomRepository(doctor_1.default);
        const query = { id };
        return repository.findOneOrFail({ where: query });
    }
    async findAll() {
        const repository = typeorm_1.getCustomRepository(doctor_1.default);
        return repository.findAll();
    }
};
DoctorService = __decorate([
    typedi_1.Service()
], DoctorService);
exports.default = DoctorService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2RvY3Rvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLGlDQUE0QjtBQUM1QixtQ0FBZ0M7QUFDaEMscUNBQTZDO0FBRTdDLG9FQUFxRDtBQUdyRCxrREFBZ0M7QUFHaEMsSUFBcUIsYUFBYSxHQUFsQyxNQUFxQixhQUFhO0lBRTlCLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBb0I7UUFDN0IsTUFBTSxVQUFVLEdBQUcsNkJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUN4RCxNQUFNLEtBQUssR0FBZ0IsSUFBSSxjQUFXLEVBQUUsQ0FBQTtRQUM1QyxNQUFNLEtBQUssR0FBRztZQUNWLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUs7WUFDeEIsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUTtZQUM5QixJQUFJLEVBQUUsQ0FBQztTQUNWLENBQUE7UUFDRCxNQUFNLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFFdEMsTUFBTSxNQUFNLEdBQUc7WUFDWCxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDZixHQUFHLFlBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQztTQUM1QixDQUFBO1FBRUQsT0FBTyxVQUFVLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzNDLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQW9CO1FBQzdCLE1BQU0sVUFBVSxHQUFHLDZCQUFtQixDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDeEQsTUFBTSxLQUFLLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFBO1FBRS9CLE1BQU0sTUFBTSxHQUFHLE1BQU0sVUFBVTthQUMxQixhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUVwQyxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDbkIsR0FBRyxLQUFLO1lBQ1IsR0FBRyxNQUFNO1lBQ1QsR0FBRyxNQUFNO1NBQ1osQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBYztRQUN6QixNQUFNLFVBQVUsR0FBRyw2QkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3hELE1BQU0sS0FBSyxHQUFHLEVBQUUsTUFBTSxFQUFFLENBQUE7UUFFeEIsT0FBTyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBVTtRQUNqQixNQUFNLFVBQVUsR0FBRyw2QkFBbUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ3hELE1BQU0sS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUE7UUFFcEIsT0FBTyxVQUFVLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7SUFDckQsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPO1FBQ1QsTUFBTSxVQUFVLEdBQUcsNkJBQW1CLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUV4RCxPQUFPLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUMvQixDQUFDO0NBRUosQ0FBQTtBQXREb0IsYUFBYTtJQURqQyxnQkFBTyxFQUFFO0dBQ1csYUFBYSxDQXNEakM7a0JBdERvQixhQUFhIn0=