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
let Prescription = class Prescription {
};
__decorate([
    typeorm_1.PrimaryColumn('uuid', { default: () => 'uuid_generate_v1mc()' }),
    __metadata("design:type", String)
], Prescription.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('uuid', { name: 'patient_id' }),
    __metadata("design:type", String)
], Prescription.prototype, "patientId", void 0);
__decorate([
    typeorm_1.Column('uuid', { name: 'doctor_id' }),
    __metadata("design:type", String)
], Prescription.prototype, "doctorId", void 0);
__decorate([
    typeorm_1.Column('uuid', { name: 'pharmacy_id', nullable: true }),
    __metadata("design:type", String)
], Prescription.prototype, "pharmacyId", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Prescription.prototype, "composed", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Prescription.prototype, "dosage", void 0);
__decorate([
    typeorm_1.Column('int', { name: 'times_day' }),
    __metadata("design:type", Number)
], Prescription.prototype, "timesDay", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Prescription.prototype, "note", void 0);
__decorate([
    typeorm_1.Column('timestamptz'),
    __metadata("design:type", String)
], Prescription.prototype, "validity", void 0);
__decorate([
    decorators_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Prescription.prototype, "createdAt", void 0);
__decorate([
    decorators_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Prescription.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'external_id', nullable: true }),
    __metadata("design:type", String)
], Prescription.prototype, "externalId", void 0);
__decorate([
    decorators_1.JoinOnTableId('doctor_id'),
    typeorm_1.ManyToOne(_ => doctor_1.default, d => d.prescriptions, { eager: true }),
    __metadata("design:type", doctor_1.default)
], Prescription.prototype, "doctor", void 0);
__decorate([
    decorators_1.JoinOnTableId('patient_id'),
    typeorm_1.ManyToOne(_ => patient_1.default, d => d.prescriptions, { eager: true }),
    __metadata("design:type", patient_1.default)
], Prescription.prototype, "patient", void 0);
__decorate([
    decorators_1.JoinOnTableId('pharmacy_id'),
    typeorm_1.ManyToOne(_ => pharmacy_1.default, p => p.prescriptions, { nullable: true }),
    __metadata("design:type", pharmacy_1.default)
], Prescription.prototype, "pharmacy", void 0);
Prescription = __decorate([
    typeorm_1.Entity('prescription')
], Prescription);
exports.default = Prescription;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2NyaXB0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21vZGVscy9wcmVzY3JpcHRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxxQ0FLZ0I7QUFFaEIsNkNBQWdGO0FBQ2hGLHNEQUE2QjtBQUM3Qix3REFBK0I7QUFDL0IsMERBQWlDO0FBR2pDLElBQXFCLFlBQVksR0FBakMsTUFBcUIsWUFBWTtDQXlEaEMsQ0FBQTtBQW5ERztJQUpDLHVCQUFhLENBQ1YsTUFBTSxFQUNOLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixFQUFFLENBQzVDOzt3Q0FDUztBQUdWO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7OytDQUN0QjtBQUdqQjtJQURDLGdCQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDOzs4Q0FDdEI7QUFHaEI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksRUFBRSxhQUFhLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztnREFDdEM7QUFHbEI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7OENBQ0M7QUFHaEI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7NENBQ0Q7QUFHZDtJQURDLGdCQUFNLENBQUMsS0FBSyxFQUFFLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDOzs4Q0FDckI7QUFHaEI7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7MENBQ0g7QUFHWjtJQURDLGdCQUFNLENBQUMsYUFBYSxDQUFDOzs4Q0FDTjtBQUdoQjtJQURDLDZCQUFnQixFQUFFOzhCQUNSLElBQUk7K0NBQUE7QUFHZjtJQURDLDZCQUFnQixFQUFFOzhCQUNSLElBQUk7K0NBQUE7QUFHZjtJQURDLGdCQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7O2dEQUN0QztBQUlsQjtJQUZDLDBCQUFhLENBQUMsV0FBVyxDQUFDO0lBQzFCLG1CQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxnQkFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFDdEQsZ0JBQU07NENBQUE7QUFJZDtJQUZDLDBCQUFhLENBQUMsWUFBWSxDQUFDO0lBQzNCLG1CQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxpQkFBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQzs4QkFDdEQsaUJBQU87NkNBQUE7QUFRaEI7SUFOQywwQkFBYSxDQUFDLGFBQWEsQ0FBQztJQUM1QixtQkFBUyxDQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsa0JBQVEsRUFDYixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxhQUFhLEVBQ3BCLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUNyQjs4QkFDVSxrQkFBUTs4Q0FBQTtBQXZERixZQUFZO0lBRGhDLGdCQUFNLENBQUMsY0FBYyxDQUFDO0dBQ0YsWUFBWSxDQXlEaEM7a0JBekRvQixZQUFZIn0=