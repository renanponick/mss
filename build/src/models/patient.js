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
let Patient = class Patient {
};
__decorate([
    typeorm_1.PrimaryColumn('uuid', { default: () => 'uuid_generate_v1mc()' }),
    __metadata("design:type", String)
], Patient.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('uuid', { name: 'user_id' }),
    __metadata("design:type", String)
], Patient.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Patient.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Patient.prototype, "cpf", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Patient.prototype, "address", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Patient.prototype, "city", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Patient.prototype, "province", void 0);
__decorate([
    decorators_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Patient.prototype, "createdAt", void 0);
__decorate([
    decorators_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Patient.prototype, "updatedAt", void 0);
__decorate([
    decorators_1.JoinOnTableId('user_id'),
    typeorm_1.OneToOne(_ => user_1.default, u => u.patient),
    __metadata("design:type", user_1.default)
], Patient.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(_ => prescription_1.default, p => p.patient),
    __metadata("design:type", Array)
], Patient.prototype, "prescriptions", void 0);
Patient = __decorate([
    typeorm_1.Entity('patient'),
    typeorm_1.Unique(['cpf'])
], Patient);
exports.default = Patient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9tb2RlbHMvcGF0aWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHFDQU9nQjtBQUVoQiw2Q0FBZ0Y7QUFDaEYsa0VBQXlDO0FBQ3pDLGtEQUF5QjtBQUl6QixJQUFxQixPQUFPLEdBQTVCLE1BQXFCLE9BQU87Q0EwQzNCLENBQUE7QUFwQ0c7SUFKQyx1QkFBYSxDQUNWLE1BQU0sRUFDTixFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxDQUM1Qzs7bUNBQ1M7QUFHVjtJQURDLGdCQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDOzt1Q0FDdEI7QUFHZDtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOztxQ0FDSDtBQUdaO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O29DQUNKO0FBR1g7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7d0NBQ0E7QUFHZjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOztxQ0FDSDtBQUdaO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O3lDQUNDO0FBR2hCO0lBREMsNkJBQWdCLEVBQUU7OEJBQ1IsSUFBSTswQ0FBQTtBQUdmO0lBREMsNkJBQWdCLEVBQUU7OEJBQ1IsSUFBSTswQ0FBQTtBQUlmO0lBRkMsMEJBQWEsQ0FBQyxTQUFTLENBQUM7SUFDeEIsa0JBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGNBQUksRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUM7OEJBQzlCLGNBQUk7cUNBQUE7QUFNVjtJQUpDLG1CQUFTLENBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxzQkFBWSxFQUNqQixDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQ2pCOzs4Q0FDNEI7QUF4Q1osT0FBTztJQUYzQixnQkFBTSxDQUFDLFNBQVMsQ0FBQztJQUNqQixnQkFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7R0FDSyxPQUFPLENBMEMzQjtrQkExQ29CLE9BQU8ifQ==