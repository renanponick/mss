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
const prescription_1 = __importDefault(require("./prescription"));
const user_1 = __importDefault(require("./user"));
let Doctor = class Doctor {
};
__decorate([
    typeorm_1.PrimaryColumn('uuid', { default: () => 'uuid_generate_v1mc()' }),
    __metadata("design:type", String)
], Doctor.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('uuid', { name: 'user_id' }),
    __metadata("design:type", String)
], Doctor.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Doctor.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Doctor.prototype, "crx", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'uf_crx' }),
    __metadata("design:type", String)
], Doctor.prototype, "ufCrx", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Doctor.prototype, "cpf", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Doctor.prototype, "address", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Doctor.prototype, "city", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Doctor.prototype, "province", void 0);
__decorate([
    decorators_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Doctor.prototype, "createdAt", void 0);
__decorate([
    decorators_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Doctor.prototype, "updatedAt", void 0);
__decorate([
    decorators_1.JoinOnTableId('user_id'),
    typeorm_1.OneToOne(_ => user_1.default, u => u.doctor),
    __metadata("design:type", user_1.default)
], Doctor.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(_ => prescription_1.default, p => p.doctor),
    __metadata("design:type", Array)
], Doctor.prototype, "prescriptions", void 0);
Doctor = __decorate([
    typeorm_1.Entity('doctor')
    // Arrumar numero + estado
    ,
    typeorm_1.Unique(['crx', 'cpf'])
], Doctor);
exports.default = Doctor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVscy9kb2N0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FPZ0I7QUFFaEIsNkNBQWdGO0FBQ2hGLGtFQUF5QztBQUN6QyxrREFBeUI7QUFLekIsSUFBcUIsTUFBTSxHQUEzQixNQUFxQixNQUFNO0NBZ0QxQixDQUFBO0FBMUNHO0lBSkMsdUJBQWEsQ0FDVixNQUFNLEVBQ04sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsc0JBQXNCLEVBQUUsQ0FDNUM7O2tDQUNTO0FBR1Y7SUFEQyxnQkFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQzs7c0NBQ3RCO0FBR2Q7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7b0NBQ0g7QUFHWjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOzttQ0FDSjtBQUdYO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUM7O3FDQUN0QjtBQUdiO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O21DQUNKO0FBR1g7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7dUNBQ0E7QUFHZjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOztvQ0FDSDtBQUdaO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O3dDQUNDO0FBR2hCO0lBREMsNkJBQWdCLEVBQUU7OEJBQ1IsSUFBSTt5Q0FBQTtBQUdmO0lBREMsNkJBQWdCLEVBQUU7OEJBQ1IsSUFBSTt5Q0FBQTtBQUlmO0lBRkMsMEJBQWEsQ0FBQyxTQUFTLENBQUM7SUFDeEIsa0JBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7OEJBQzdCLGNBQUk7b0NBQUE7QUFNVjtJQUpDLG1CQUFTLENBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxzQkFBWSxFQUNqQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQ2hCOzs2Q0FDNEI7QUE5Q1osTUFBTTtJQUgxQixnQkFBTSxDQUFDLFFBQVEsQ0FBQztJQUNqQiwwQkFBMEI7O0lBQ3pCLGdCQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7R0FDRixNQUFNLENBZ0QxQjtrQkFoRG9CLE1BQU0ifQ==