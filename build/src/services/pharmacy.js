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
const pharmacy_1 = __importDefault(require("../repositories/pharmacy"));
const user_1 = __importDefault(require("./user"));
let PharmacyService = class PharmacyService {
    async create(fields) {
        const repository = typeorm_1.getCustomRepository(pharmacy_1.default);
        const users = new user_1.default();
        const input = {
            email: fields.user.email,
            password: fields.user.password,
            type: 2
        };
        const user = await users.create(input);
        const pharmacy = {
            userId: user.id,
            ...ramda_1.omit(['user'], fields)
        };
        return repository.createAndSave(pharmacy);
    }
    async update(fields) {
        const repository = typeorm_1.getCustomRepository(pharmacy_1.default);
        const query = { id: fields.id };
        const pharmacy = await repository
            .findOneOrFail({ where: query });
        return repository.save({
            ...query,
            ...pharmacy,
            ...fields
        });
    }
    async findUser(userId) {
        const repository = typeorm_1.getCustomRepository(pharmacy_1.default);
        const query = { userId };
        return repository.findOneOrFail({ where: query });
    }
    async find(id) {
        const repository = typeorm_1.getCustomRepository(pharmacy_1.default);
        const query = { id };
        return repository.findOneOrFail({ where: query });
    }
    async findAll() {
        const repository = typeorm_1.getCustomRepository(pharmacy_1.default);
        return repository.findAll();
    }
};
PharmacyService = __decorate([
    typedi_1.Service()
], PharmacyService);
exports.default = PharmacyService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc2VydmljZXMvcGhhcm1hY3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxpQ0FBNEI7QUFDNUIsbUNBQWdDO0FBQ2hDLHFDQUE2QztBQUU3Qyx3RUFBeUQ7QUFHekQsa0RBQWdDO0FBR2hDLElBQXFCLGVBQWUsR0FBcEMsTUFBcUIsZUFBZTtJQUVoQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQXNCO1FBQy9CLE1BQU0sVUFBVSxHQUFHLDZCQUFtQixDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDMUQsTUFBTSxLQUFLLEdBQWdCLElBQUksY0FBVyxFQUFFLENBQUE7UUFDNUMsTUFBTSxLQUFLLEdBQUc7WUFDVixLQUFLLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ3hCLFFBQVEsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVE7WUFDOUIsSUFBSSxFQUFFLENBQUM7U0FDVixDQUFBO1FBQ0QsTUFBTSxJQUFJLEdBQUcsTUFBTSxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRXRDLE1BQU0sUUFBUSxHQUFHO1lBQ2IsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQ2YsR0FBRyxZQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxNQUFNLENBQUM7U0FDNUIsQ0FBQTtRQUVELE9BQU8sVUFBVSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUM3QyxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFzQjtRQUMvQixNQUFNLFVBQVUsR0FBRyw2QkFBbUIsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO1FBQzFELE1BQU0sS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQTtRQUUvQixNQUFNLFFBQVEsR0FBRyxNQUFNLFVBQVU7YUFDNUIsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUE7UUFFcEMsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ25CLEdBQUcsS0FBSztZQUNSLEdBQUcsUUFBUTtZQUNYLEdBQUcsTUFBTTtTQUNaLENBQUMsQ0FBQTtJQUNOLENBQUM7SUFFRCxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQWM7UUFDekIsTUFBTSxVQUFVLEdBQUcsNkJBQW1CLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUMxRCxNQUFNLEtBQUssR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFBO1FBRXhCLE9BQU8sVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQVU7UUFDakIsTUFBTSxVQUFVLEdBQUcsNkJBQW1CLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUMxRCxNQUFNLEtBQUssR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFBO1FBRXBCLE9BQU8sVUFBVSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQ3JELENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTztRQUNULE1BQU0sVUFBVSxHQUFHLDZCQUFtQixDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFFMUQsT0FBTyxVQUFVLENBQUMsT0FBTyxFQUFFLENBQUE7SUFDL0IsQ0FBQztDQUVKLENBQUE7QUF0RG9CLGVBQWU7SUFEbkMsZ0JBQU8sRUFBRTtHQUNXLGVBQWUsQ0FzRG5DO2tCQXREb0IsZUFBZSJ9