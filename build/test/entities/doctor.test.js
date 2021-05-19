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
const doctor_1 = __importDefault(require("../../src/services/doctor"));
let DoctorTest = class DoctorTest extends base_test_1.default {
    constructor(doctors) {
        super();
        this.doctors = doctors;
    }
    async ['should create a doctor']() {
        const input = {
            user: {
                email: 'test@doctor.com',
                password: 'abc123'
            },
            name: 'Doutor',
            crx: '123',
            ufCrx: 'SC',
            cpf: '11111111111',
            address: 'Rua',
            city: 'Joinville',
            province: 'SC'
        };
        const doctor = await this.doctors.create(input);
        base_test_1.expect(doctor.name).to.be.equal(input.name);
        base_test_1.expect(doctor.crx).to.be.equal(input.crx);
        base_test_1.expect(doctor.ufCrx).to.be.equal(input.ufCrx);
        base_test_1.expect(doctor.cpf).to.be.equal(input.cpf);
        base_test_1.expect(doctor.address).to.be.equal(input.address);
        base_test_1.expect(doctor.city).to.be.equal(input.city);
        base_test_1.expect(doctor.province).to.be.equal(input.province);
    }
    async ['should update a doctor']() {
        const input = {
            id: 'aa7ef6ee-a6e9-11eb-a825-173e511d6e4a',
            name: 'DoutorEditado',
            crx: '123456',
            ufCrx: 'AC',
            cpf: '222222222',
            address: 'Rua 2123',
            city: 'Joinville',
            province: 'SC'
        };
        const doctor = await this.doctors.update(input);
        base_test_1.expect(doctor.name).to.be.equal(input.name);
        base_test_1.expect(doctor.crx).to.be.equal(input.crx);
        base_test_1.expect(doctor.ufCrx).to.be.equal(input.ufCrx);
        base_test_1.expect(doctor.cpf).to.be.equal(input.cpf);
        base_test_1.expect(doctor.address).to.be.equal(input.address);
        base_test_1.expect(doctor.city).to.be.equal(input.city);
        base_test_1.expect(doctor.province).to.be.equal(input.province);
    }
    async ['should get a doctor']() {
        const doctor = await this.doctors
            .find('aa7ef6ee-a6e9-11eb-a825-173e511d6e4a');
        base_test_1.expect(doctor.name).to.be.equal('Patricia');
        base_test_1.expect(doctor.crx).to.be.equal('12332');
        base_test_1.expect(doctor.ufCrx).to.be.equal('SC');
        base_test_1.expect(doctor.cpf).to.be.equal('123.456.789-32');
        base_test_1.expect(doctor.address).to.be.equal('Rua Pascoali');
        base_test_1.expect(doctor.city).to.be.equal('Joinville');
        base_test_1.expect(doctor.province).to.be.equal('SC');
    }
    async ['should get doctors']() {
        const doctor = await this.doctors.findAll();
        base_test_1.expect(doctor[0].name).to.be.equal('Patricia');
        base_test_1.expect(doctor[0].crx).to.be.equal('12332');
        base_test_1.expect(doctor[0].ufCrx).to.be.equal('SC');
        base_test_1.expect(doctor[0].cpf).to.be.equal('123.456.789-32');
        base_test_1.expect(doctor[0].address).to.be.equal('Rua Pascoali');
        base_test_1.expect(doctor[0].city).to.be.equal('Joinville');
        base_test_1.expect(doctor[0].province).to.be.equal('SC');
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DoctorTest.prototype, 'should create a doctor', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DoctorTest.prototype, 'should update a doctor', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DoctorTest.prototype, 'should get a doctor', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DoctorTest.prototype, 'should get doctors', null);
DoctorTest = __decorate([
    mocha_typescript_1.suite('doctors'),
    __metadata("design:paramtypes", [doctor_1.default])
], DoctorTest);
exports.default = DoctorTest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9jdG9yLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi90ZXN0L2VudGl0aWVzL2RvY3Rvci50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHVEQUE4QztBQUU5QyxnRUFBcUQ7QUFDckQsdUVBQXFEO0FBR3JELElBQXFCLFVBQVUsR0FBL0IsTUFBcUIsVUFBVyxTQUFRLG1CQUFRO0lBSTVDLFlBQ0ksT0FBc0I7UUFFdEIsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtJQUMxQixDQUFDO0lBR0QsS0FBSyxDQUFDLENBQUMsd0JBQXdCLENBQUM7UUFDNUIsTUFBTSxLQUFLLEdBQUc7WUFDVixJQUFJLEVBQUU7Z0JBQ0YsS0FBSyxFQUFFLGlCQUFpQjtnQkFDeEIsUUFBUSxFQUFFLFFBQVE7YUFDckI7WUFDRCxJQUFJLEVBQUUsUUFBUTtZQUNkLEdBQUcsRUFBRSxLQUFLO1lBQ1YsS0FBSyxFQUFFLElBQUk7WUFDWCxHQUFHLEVBQUUsYUFBYTtZQUNsQixPQUFPLEVBQUUsS0FBSztZQUNkLElBQUksRUFBRSxXQUFXO1lBQ2pCLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUE7UUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRS9DLGtCQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUMzQyxrQkFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDekMsa0JBQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxD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