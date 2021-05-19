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
const patient_1 = __importDefault(require("../models/patient"));
let PatientRepository = class PatientRepository extends typeorm_1.Repository {
    async findAll() {
        const query = this.createQueryBuilder('patient');
        return query.getMany();
    }
    async createAndSave(fields) {
        return this.save(fields);
    }
};
PatientRepository = __decorate([
    typeorm_1.EntityRepository(patient_1.default)
], PatientRepository);
exports.default = PatientRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvcGF0aWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQUFzRDtBQUV0RCxnRUFBdUM7QUFHdkMsSUFBcUIsaUJBQWlCLEdBQXRDLE1BQXFCLGlCQUFrQixTQUFRLG9CQUFtQjtJQUU5RCxLQUFLLENBQUMsT0FBTztRQUNULE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQTtRQUVoRCxPQUFPLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUMxQixDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFjO1FBQzlCLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTtJQUM1QixDQUFDO0NBRUosQ0FBQTtBQVpvQixpQkFBaUI7SUFEckMsMEJBQWdCLENBQUMsaUJBQU8sQ0FBQztHQUNMLGlCQUFpQixDQVlyQztrQkFab0IsaUJBQWlCIn0=