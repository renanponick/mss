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
const class_transformer_1 = require("class-transformer");
const typeorm_1 = require("typeorm");
const prescription_1 = __importDefault(require("../models/prescription"));
let PrescriptionRepository = class PrescriptionRepository extends typeorm_1.Repository {
    async findAll() {
        const query = this.createQueryBuilder('prescription');
        return query.getMany();
    }
    async createAndSave(fields) {
        const entity = class_transformer_1.plainToClass(prescription_1.default, fields);
        return this.save(entity);
    }
};
PrescriptionRepository = __decorate([
    typeorm_1.EntityRepository(prescription_1.default)
], PrescriptionRepository);
exports.default = PrescriptionRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2NyaXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JlcG9zaXRvcmllcy9wcmVzY3JpcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx5REFBZ0Q7QUFDaEQscUNBQXNEO0FBRXRELDBFQUFpRDtBQUdqRCxJQUFxQixzQkFBc0IsR0FBM0MsTUFBcUIsc0JBQXVCLFNBQVEsb0JBQXdCO0lBRXhFLEtBQUssQ0FBQyxPQUFPO1FBQ1QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBRXJELE9BQU8sS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzFCLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQWM7UUFDOUIsTUFBTSxNQUFNLEdBQUcsZ0NBQVksQ0FBQyxzQkFBWSxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBRWpELE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM1QixDQUFDO0NBRUosQ0FBQTtBQWRvQixzQkFBc0I7SUFEMUMsMEJBQWdCLENBQUMsc0JBQVksQ0FBQztHQUNWLHNCQUFzQixDQWMxQztrQkFkb0Isc0JBQXNCIn0=