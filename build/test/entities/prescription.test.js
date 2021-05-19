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
const prescription_1 = __importDefault(require("../../src/services/prescription"));
let PrescriptionTest = class PrescriptionTest extends base_test_1.default {
    constructor(prescriptions) {
        super();
        this.prescriptions = prescriptions;
    }
    async ['should create a prescription']() {
        const input = {
            composed: 'Composição',
            dosage: 'Dosage',
            timesDay: 2,
            note: 'Nota',
            validity: '2021-03-20T19:59:39.677Z',
            doctorId: 'aa7ef6ee-a6e9-11eb-a825-173e511d6e4a',
            patientId: '860a4700-a6e9-11eb-82b6-2bc550c71cf0'
        };
        const prescription = await this.prescriptions.create(input);
        base_test_1.expect(prescription.composed).to.be.equal(input.composed);
        base_test_1.expect(prescription.dosage).to.be.equal(input.dosage);
        base_test_1.expect(prescription.timesDay).to.be.equal(input.timesDay);
        base_test_1.expect(prescription.note).to.be.equal(input.note);
        base_test_1.expect(prescription.validity).to.be.equal(input.validity);
        base_test_1.expect(prescription.doctorId).to.be.equal(input.doctorId);
        base_test_1.expect(prescription.patientId).to.be.equal(input.patientId);
    }
    async ['should update a prescription']() {
        const newInput = {
            composed: 'Composição',
            dosage: 'Dosage',
            timesDay: 2,
            note: 'Nota',
            validity: '2021-03-20T19:59:39.677Z',
            doctorId: 'aa7ef6ee-a6e9-11eb-a825-173e511d6e4a',
            patientId: '860a4700-a6e9-11eb-82b6-2bc550c71cf0'
        };
        const newPrescription = await this.prescriptions.create(newInput);
        const input = {
            id: newPrescription.id,
            composed: 'Composição',
            dosage: 'Dosage',
            timesDay: 2,
            note: 'Nota',
            doctorId: 'aa7ef6ee-a6e9-11eb-a825-173e511d6e4a',
            patientId: '860a4700-a6e9-11eb-82b6-2bc550c71cf0',
            externalId: '999a4700-a6e9-ab89-82b6-2bc550c71999'
        };
        const prescription = await this.prescriptions.update(input);
        base_test_1.expect(prescription.composed).to.be.equal(input.composed);
        base_test_1.expect(prescription.dosage).to.be.equal(input.dosage);
        base_test_1.expect(prescription.timesDay).to.be.equal(input.timesDay);
        base_test_1.expect(prescription.note).to.be.equal(input.note);
        base_test_1.expect(prescription.doctorId).to.be.equal(input.doctorId);
        base_test_1.expect(prescription.patientId).to.be.equal(input.patientId);
        base_test_1.expect(prescription.externalId).to.be.equal(input.externalId);
    }
    async ['should get a prescription']() {
        const prescription = await this.prescriptions.find('f5402e86-a6f4-11eb-a44d-639077f1f0bd');
        base_test_1.expect(prescription.composed).to.be.equal('Paracetamol 200ml');
        base_test_1.expect(prescription.dosage).to.be.equal('1 a cada 2 dias');
        base_test_1.expect(prescription.timesDay).to.be.equal(1);
        base_test_1.expect(prescription.note).to.be.equal('Não tomar com Vinho');
        base_test_1.expect(prescription.validity).to.be.equalDate(new Date('2021-03-20 19:59:39.677+00'));
        base_test_1.expect(prescription.doctorId).to.be.equal('aa7ef6ee-a6e9-11eb-a825-173e511d6e4a');
        base_test_1.expect(prescription.patientId).to.be.equal('860a4700-a6e9-11eb-82b6-2bc550c71cf0');
    }
    async ['should get prescriptions']() {
        const prescription = await this.prescriptions.getPrescriptions('c85570e8-89d0-11eb-a43d-e37781ba023d');
        if (prescription) {
            base_test_1.expect(prescription[0].composed).to.be.equal('Paracetamol 200ml');
            base_test_1.expect(prescription[0].dosage).to.be.equal('1 a cada 2 dias');
            base_test_1.expect(prescription[0].timesDay).to.be.equal(1);
            base_test_1.expect(prescription[0].note).to.be.equal('Não tomar com Vinho');
            base_test_1.expect(prescription[0].validity).to.be.equalDate(new Date('2021-03-20 19:59:39.677+00'));
            base_test_1.expect(prescription[0].doctorId).to.be.equal('aa7ef6ee-a6e9-11eb-a825-173e511d6e4a');
            base_test_1.expect(prescription[0].patientId).to.be.equal('860a4700-a6e9-11eb-82b6-2bc550c71cf0');
        }
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrescriptionTest.prototype, 'should create a prescription', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrescriptionTest.prototype, 'should update a prescription', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrescriptionTest.prototype, 'should get a prescription', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PrescriptionTest.prototype, 'should get prescriptions', null);
PrescriptionTest = __decorate([
    mocha_typescript_1.suite('prescriptions'),
    __metadata("design:paramtypes", [prescription_1.default])
], PrescriptionTest);
exports.default = PrescriptionTest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlc2NyaXB0aW9uLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90ZXN0L2VudGl0aWVzL3ByZXNjcmlwdGlvbi50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUE4QztBQUU5QyxnRUFBcUQ7QUFDckQsbUZBQWlFO0FBR2pFLElBQXFCLGdCQUFnQixHQUFyQyxNQUFxQixnQkFBaUIsU0FBUSxtQkFBUTtJQUlsRCxZQUNJLGFBQWtDO1FBRWxDLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLGFBQWEsR0FBRyxhQUFhLENBQUE7SUFDdEMsQ0FBQztJQUdELEtBQUssQ0FBQyxDQUFDLDhCQUE4QixDQUFDO1FBQ2xDLE1BQU0sS0FBSyxHQUFHO1lBQ1YsUUFBUSxFQUFFLFlBQVk7WUFDdEIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsUUFBUSxFQUFFLENBQUM7WUFDWCxJQUFJLEVBQUUsTUFBTTtZQUNaLFFBQVEsRUFBRSwwQkFBMEI7WUFDcEMsUUFBUSxFQUFFLHNDQUFzQztZQUNoRCxTQUFTLEVBQUUsc0NBQXNDO1NBQ3BELENBQUE7UUFDRCxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRTNELGtCQUFNLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN6RCxrQkFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDckQsa0JBQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FB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