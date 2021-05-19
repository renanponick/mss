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
const typeorm_1 = require("typeorm");
const pharmacy_1 = __importDefault(require("../models/pharmacy"));
let PharmacyRepository = class PharmacyRepository extends typeorm_1.Repository {
    async findAll() {
        const query = this.createQueryBuilder('pharmacy');
        return query.getMany();
    }
    async createAndSave(fields) {
        return this.save(fields);
    }
};
PharmacyRepository = __decorate([
    typeorm_1.EntityRepository(pharmacy_1.default)
], PharmacyRepository);
exports.default = PharmacyRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvcmVwb3NpdG9yaWVzL3BoYXJtYWN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEscUNBQXNEO0FBRXRELGtFQUF5QztBQUd6QyxJQUFxQixrQkFBa0IsR0FBdkMsTUFBcUIsa0JBQW1CLFNBQVEsb0JBQW9CO0lBRWhFLEtBQUssQ0FBQyxPQUFPO1FBQ1QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRWpELE9BQU8sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzFCLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQWM7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzVCLENBQUM7Q0FFSixDQUFBO0FBWm9CLGtCQUFrQjtJQUR0QywwQkFBZ0IsQ0FBQyxrQkFBUSxDQUFDO0dBQ04sa0JBQWtCLENBWXRDO2tCQVpvQixrQkFBa0IifQ==