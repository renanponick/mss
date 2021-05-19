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
let Pharmacy = class Pharmacy {
};
__decorate([
    typeorm_1.PrimaryColumn('uuid', { default: () => 'uuid_generate_v1mc()' }),
    __metadata("design:type", String)
], Pharmacy.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('uuid', { name: 'user_id' }),
    __metadata("design:type", String)
], Pharmacy.prototype, "userId", void 0);
__decorate([
    typeorm_1.Column('text', { name: 'social_name' }),
    __metadata("design:type", String)
], Pharmacy.prototype, "socialName", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Pharmacy.prototype, "cnpj", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Pharmacy.prototype, "address", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Pharmacy.prototype, "city", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], Pharmacy.prototype, "province", void 0);
__decorate([
    decorators_1.CreateDateColumn(),
    __metadata("design:type", Date)
], Pharmacy.prototype, "createdAt", void 0);
__decorate([
    decorators_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], Pharmacy.prototype, "updatedAt", void 0);
__decorate([
    decorators_1.JoinOnTableId('user_id'),
    typeorm_1.OneToOne(_ => user_1.default, u => u.pharmacy),
    __metadata("design:type", user_1.default)
], Pharmacy.prototype, "user", void 0);
__decorate([
    typeorm_1.OneToMany(_ => prescription_1.default, p => p.pharmacy),
    __metadata("design:type", Array)
], Pharmacy.prototype, "prescriptions", void 0);
Pharmacy = __decorate([
    typeorm_1.Entity('pharmacy'),
    typeorm_1.Unique(['cnpj'])
], Pharmacy);
exports.default = Pharmacy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3kuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvbW9kZWxzL3BoYXJtYWN5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBT2dCO0FBRWhCLDZDQUFnRjtBQUNoRixrRUFBeUM7QUFDekMsa0RBQXlCO0FBSXpCLElBQXFCLFFBQVEsR0FBN0IsTUFBcUIsUUFBUTtDQTBDNUIsQ0FBQTtBQXBDRztJQUpDLHVCQUFhLENBQ1YsTUFBTSxFQUNOLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLHNCQUFzQixFQUFFLENBQzVDOztvQ0FDUztBQUdWO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7O3dDQUN0QjtBQUdkO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLENBQUM7OzRDQUN0QjtBQUdsQjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOztzQ0FDSDtBQUdaO0lBREMsZ0JBQU0sQ0FBQyxNQUFNLENBQUM7O3lDQUNBO0FBR2Y7SUFEQyxnQkFBTSxDQUFDLE1BQU0sQ0FBQzs7c0NBQ0g7QUFHWjtJQURDLGdCQUFNLENBQUMsTUFBTSxDQUFDOzswQ0FDQztBQUdoQjtJQURDLDZCQUFnQixFQUFFOzhCQUNSLElBQUk7MkNBQUE7QUFHZjtJQURDLDZCQUFnQixFQUFFOzhCQUNSLElBQUk7MkNBQUE7QUFJZjtJQUZDLDBCQUFhLENBQUMsU0FBUyxDQUFDO0lBQ3hCLGtCQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxjQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDOzhCQUMvQixjQUFJO3NDQUFBO0FBTVY7SUFKQyxtQkFBUyxDQUNOLENBQUMsQ0FBQyxFQUFFLENBQUMsc0JBQVksRUFDakIsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUNsQjs7K0NBQzRCO0FBeENaLFFBQVE7SUFGNUIsZ0JBQU0sQ0FBQyxVQUFVLENBQUM7SUFDbEIsZ0JBQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0dBQ0ksUUFBUSxDQTBDNUI7a0JBMUNvQixRQUFRIn0=