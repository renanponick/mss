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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_typescript_1 = require("mocha-typescript");
const base_test_1 = __importStar(require("../utils/base-test"));
const patient_1 = __importDefault(require("../../src/services/patient"));
let PatientTest = class PatientTest extends base_test_1.default {
    constructor(patients) {
        super();
        this.patients = patients;
    }
    async ['should create a patient']() {
        const input = {
            user: {
                email: 'test patient',
                password: 'abc123'
            },
            name: 'Doutor',
            cpf: '11111111111',
            address: 'Rua 2123',
            city: 'Joinville',
            province: 'SC'
        };
        const patient = await this.patients.create(input);
        base_test_1.expect(patient.name).to.be.equal(input.name);
        base_test_1.expect(patient.address).to.be.equal(input.address);
        base_test_1.expect(patient.city).to.be.equal(input.city);
        base_test_1.expect(patient.province).to.be.equal(input.province);
        base_test_1.expect(patient.cpf).to.be.equal(input.cpf);
    }
    async ['should update a patient']() {
        const input = {
            id: '860a4700-a6e9-11eb-82b6-2bc550c71cf0',
            name: 'PatientEditado',
            address: 'Rua 2123',
            city: 'Joinville',
            province: 'SC',
            cpf: '222222222'
        };
        const patient = await this.patients.update(input);
        base_test_1.expect(patient.name).to.be.equal(input.name);
        base_test_1.expect(patient.address).to.be.equal(input.address);
        base_test_1.expect(patient.cpf).to.be.equal(input.cpf);
        base_test_1.expect(patient.address).to.be.equal(input.address);
        base_test_1.expect(patient.city).to.be.equal(input.city);
        base_test_1.expect(patient.province).to.be.equal(input.province);
    }
    async ['should get a patient']() {
        const patient = await this.patients.find('860a4700-a6e9-11eb-82b6-2bc550c71cf0');
        base_test_1.expect(patient.name).to.be.equal('João');
        base_test_1.expect(patient.cpf).to.be.equal('625.803.820-46');
        base_test_1.expect(patient.address).to.be.equal('Rua Pascoali');
        base_test_1.expect(patient.city).to.be.equal('Joinville');
        base_test_1.expect(patient.province).to.be.equal('SC');
    }
    async ['should get patients']() {
        const patient = await this.patients.findAll();
        base_test_1.expect(patient[0].name).to.be.equal('João');
        base_test_1.expect(patient[0].cpf).to.be.equal('625.803.820-46');
        base_test_1.expect(patient[0].address).to.be.equal('Rua Pascoali');
        base_test_1.expect(patient[0].city).to.be.equal('Joinville');
        base_test_1.expect(patient[0].province).to.be.equal('SC');
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientTest.prototype, 'should create a patient', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientTest.prototype, 'should update a patient', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientTest.prototype, 'should get a patient', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PatientTest.prototype, 'should get patients', null);
PatientTest = __decorate([
    mocha_typescript_1.suite('patients'),
    __metadata("design:paramtypes", [patient_1.default])
], PatientTest);
exports.default = PatientTest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF0aWVudC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdC9lbnRpdGllcy9wYXRpZW50LnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQThDO0FBRTlDLGdFQUFxRDtBQUNyRCx5RUFBdUQ7QUFHdkQsSUFBcUIsV0FBVyxHQUFoQyxNQUFxQixXQUFZLFNBQVEsbUJBQVE7SUFJN0MsWUFDSSxRQUF3QjtRQUV4QixLQUFLLEVBQUUsQ0FBQTtRQUNQLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFBO0lBQzVCLENBQUM7SUFHRCxLQUFLLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQztRQUM3QixNQUFNLEtBQUssR0FBRztZQUNWLElBQUksRUFBRTtnQkFDRixLQUFLLEVBQUUsY0FBYztnQkFDckIsUUFBUSxFQUFFLFFBQVE7YUFDckI7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLE9BQU8sRUFBRSxVQUFVO1lBQ25CLElBQUksRUFBRSxXQUFXO1lBQ2pCLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUE7UUFDRCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRWpELGtCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUM1QyxrQkFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDbEQsa0JBQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUks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