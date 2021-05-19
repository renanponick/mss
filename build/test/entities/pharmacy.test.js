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
const pharmacy_1 = __importDefault(require("../../src/services/pharmacy"));
let PharmacyTest = class PharmacyTest extends base_test_1.default {
    constructor(pharmacies) {
        super();
        this.pharmacies = pharmacies;
    }
    async ['should create a pharmacy']() {
        const input = {
            user: {
                email: 'test pharmacy',
                password: 'abc123'
            },
            socialName: 'pharmacy',
            cnpj: '21123000151',
            address: 'Rua 2123',
            city: 'Joinville',
            province: 'SC'
        };
        const pharmacy = await this.pharmacies.create(input);
        base_test_1.expect(pharmacy.socialName).to.be.equal(input.socialName);
        base_test_1.expect(pharmacy.cnpj).to.be.equal(input.cnpj);
        base_test_1.expect(pharmacy.address).to.be.equal(input.address);
        base_test_1.expect(pharmacy.city).to.be.equal(input.city);
        base_test_1.expect(pharmacy.province).to.be.equal(input.province);
    }
    async ['should update a pharmacy']() {
        const input = {
            id: 'aa7c9228-a6e9-11eb-a825-2b3ce0086693',
            socialName: 'pharmacy',
            cnpj: '21123000151',
            address: 'Rua 2123',
            city: 'Joinville',
            province: 'SC'
        };
        const pharmacy = await this.pharmacies.update(input);
        base_test_1.expect(pharmacy.socialName).to.be.equal(input.socialName);
        base_test_1.expect(pharmacy.cnpj).to.be.equal(input.cnpj);
        base_test_1.expect(pharmacy.address).to.be.equal(input.address);
        base_test_1.expect(pharmacy.city).to.be.equal(input.city);
        base_test_1.expect(pharmacy.province).to.be.equal(input.province);
    }
    async ['should get a pharmacy']() {
        const pharmacy = await this.pharmacies.find('aa7c9228-a6e9-11eb-a825-2b3ce0086693');
        base_test_1.expect(pharmacy.socialName).to.be.equal('Precinho baixo');
        base_test_1.expect(pharmacy.cnpj).to.be.equal('41.041.717/0001-69');
        base_test_1.expect(pharmacy.address).to.be.equal('Rua Pascoali');
        base_test_1.expect(pharmacy.city).to.be.equal('Joinville');
        base_test_1.expect(pharmacy.province).to.be.equal('SC');
    }
    async ['should get pharmacies']() {
        const pharmacy = await this.pharmacies.findAll();
        base_test_1.expect(pharmacy[0].socialName).to.be.equal('Precinho baixo');
        base_test_1.expect(pharmacy[0].cnpj).to.be.equal('41.041.717/0001-69');
        base_test_1.expect(pharmacy[0].address).to.be.equal('Rua Pascoali');
        base_test_1.expect(pharmacy[0].city).to.be.equal('Joinville');
        base_test_1.expect(pharmacy[0].province).to.be.equal('SC');
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PharmacyTest.prototype, 'should create a pharmacy', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PharmacyTest.prototype, 'should update a pharmacy', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PharmacyTest.prototype, 'should get a pharmacy', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PharmacyTest.prototype, 'should get pharmacies', null);
PharmacyTest = __decorate([
    mocha_typescript_1.suite('pharmacies'),
    __metadata("design:paramtypes", [pharmacy_1.default])
], PharmacyTest);
exports.default = PharmacyTest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGhhcm1hY3kudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Rlc3QvZW50aXRpZXMvcGhhcm1hY3kudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSx1REFBOEM7QUFFOUMsZ0VBQXFEO0FBQ3JELDJFQUF5RDtBQUd6RCxJQUFxQixZQUFZLEdBQWpDLE1BQXFCLFlBQWEsU0FBUSxtQkFBUTtJQUk5QyxZQUNJLFVBQTJCO1FBRTNCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUE7SUFDaEMsQ0FBQztJQUdELEtBQUssQ0FBQyxDQUFDLDBCQUEwQixDQUFDO1FBQzlCLE1BQU0sS0FBSyxHQUFHO1lBQ1YsSUFBSSxFQUFFO2dCQUNGLEtBQUssRUFBRSxlQUFlO2dCQUN0QixRQUFRLEVBQUUsUUFBUTthQUNyQjtZQUNELFVBQVUsRUFBRSxVQUFVO1lBQ3RCLElBQUksRUFBRSxhQUFhO1lBQ25CLE9BQU8sRUFBRSxVQUFVO1lBQ25CLElBQUksRUFBRSxXQUFXO1lBQ2pCLFFBQVEsRUFBRSxJQUFJO1NBQ2pCLENBQUE7UUFDRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRXBELGtCQUFNLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUN6RCxrQkFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDN0Msa0JBQU0sQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE9B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