"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const decorators_1 = require("./decorators");
const doctor_1 = __importDefault(require("./doctor"));
const patient_1 = __importDefault(require("./patient"));
const pharmacy_1 = __importDefault(require("./pharmacy"));
let User = class User {
};
__decorate([
    typeorm_1.PrimaryColumn('uuid', { default: () => 'uuid_generate_v1mc()' }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('boolean', { name: 'is_active', default: true }),
    __metadata("design:type", Boolean)
], User.prototype, "isActive", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Number)
], User.prototype, "type", void 0);
__decorate([
    decorators_1.CreateDateColumn(),
    __metadata("design:type", Date)
], User.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.OneToOne(_ => doctor_1.default, d => d.user),
    __metadata("design:type", doctor_1.default)
], User.prototype, "doctor", void 0);
__decorate([
    typeorm_1.OneToOne(_ => patient_1.default, p => p.user),
    __metadata("design:type", patient_1.default)
], User.prototype, "patient", void 0);
__decorate([
    typeorm_1.OneToOne(_ => pharmacy_1.default, p => p.user),
    __metadata("design:type", pharmacy_1.default)
], User.prototype, "pharmacy", void 0);
User = __decorate([
    typeorm_1.Entity('user'),
    typeorm_1.Unique(['email'])
], User);
exports.default = User;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHFDQU1nQjtBQUVoQiw2Q0FBK0M7QUFDL0Msc0RBQTZCO0FBQzdCLHdEQUErQjtBQUMvQiwwREFBaUM7QUFJakMsSUFBcUIsSUFBSSxHQUF6QixNQUFxQixJQUFJO0NBZ0N4QixDQUFBO0FBMUJHO0lBSkMsdUJBQWEsQ0FDVixNQUFNLEVBQ04sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsQ0FDNUM7O2dDQUNTO0FBR1Y7SUFEQyxnQkFBTSxDQUFDLFNBQVMsRUFBRSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDOztzQ0FDdkM7QUFHakI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7bUNBQ0Y7QUFHYjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOztzQ0FDQztBQUdoQjtJQURDLGdCQUFNLENBQUMsS0FBSyxDQUFDOztrQ0FDRjtBQUdaO0lBREMsNkJBQWdCLEVBQUU7OEJBQ1IsSUFBSTt1Q0FBQTtBQUdmO0lBREMsa0JBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGdCQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzhCQUMzQixnQkFBTTtvQ0FBQTtBQUdkO0lBREMsa0JBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFPLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDOzhCQUMzQixpQkFBTztxQ0FBQTtBQUdoQjtJQURDLGtCQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxrQkFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQzs4QkFDM0Isa0JBQVE7c0NBQUE7QUE5QkQsSUFBSTtJQUZ4QixnQkFBTSxDQUFDLE1BQU0sQ0FBQztJQUNkLGdCQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQztHQUNHLElBQUksQ0FnQ3hCO2tCQWhDb0IsSUFBSSJ9