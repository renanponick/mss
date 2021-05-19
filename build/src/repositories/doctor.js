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
const class_transformer_1 = require("class-transformer");
const doctor_1 = __importDefault(require("../models/doctor"));
let DoctorRepository = class DoctorRepository extends typeorm_1.Repository {
    async findAll() {
        return this
            .createQueryBuilder('doctor')
            .getMany();
    }
    async createAndSave(fields) {
        const entity = class_transformer_1.plainToClass(doctor_1.default, fields);
        return this.save(entity);
    }
};
DoctorRepository = __decorate([
    typeorm_1.EntityRepository(doctor_1.default)
], DoctorRepository);
exports.default = DoctorRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JlcG9zaXRvcmllcy9kb2N0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxxQ0FBc0Q7QUFDdEQseURBQWdEO0FBRWhELDhEQUFxQztBQUdyQyxJQUFxQixnQkFBZ0IsR0FBckMsTUFBcUIsZ0JBQWlCLFNBQVEsb0JBQWtCO0lBRTVELEtBQUssQ0FBQyxPQUFPO1FBQ1QsT0FBTyxJQUFJO2FBQ04sa0JBQWtCLENBQUMsUUFBUSxDQUFDO2FBQzVCLE9BQU8sRUFBRSxDQUFBO0lBQ2xCLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQWM7UUFDOUIsTUFBTSxNQUFNLEdBQUcsZ0NBQVksQ0FBQyxnQkFBTSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBRTNDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM1QixDQUFDO0NBRUosQ0FBQTtBQWRvQixnQkFBZ0I7SUFEcEMsMEJBQWdCLENBQUMsZ0JBQU0sQ0FBQztHQUNKLGdCQUFnQixDQWNwQztrQkFkb0IsZ0JBQWdCIn0=