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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_typescript_1 = require("mocha-typescript");
const bcrypt_1 = __importDefault(require("bcrypt"));
const base_test_1 = __importStar(require("../utils/base-test"));
const doctor_1 = __importDefault(require("../../src/services/doctor"));
const user_1 = __importDefault(require("../../src/services/user"));
let UserTest = class UserTest extends base_test_1.default {
    constructor(doctors, users) {
        super();
        this.doctors = doctors;
        this.users = users;
    }
    async ['should create an user']() {
        const input = {
            user: {
                email: 'test doctor',
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
        const user = await this.users.find(doctor.userId);
        base_test_1.expect(user.email).to.be.equal(input.user.email);
        base_test_1.expect(await bcrypt_1.default.compare(input.user.password, user.password))
            .to.be.equal(true);
        base_test_1.expect(user.type).to.be.equal(0);
    }
    async ['should update am activity user']() {
        const input = {
            userId: 'c85570e8-89d0-11eb-a43d-e37781ba023d',
            password: 'abc123a',
            lastPassword: 'abc123'
        };
        await this.users.update(input);
        const user = await this.users.find(input.userId);
        base_test_1.expect(user.id).to.be.equal(input.userId);
        base_test_1.expect(await bcrypt_1.default.compare(input.password, user.password))
            .to.be.equal(true);
    }
    async ['should deactive an user']() {
        const input = 'c85570e8-89d0-11eb-a43d-e37781ba023d';
        await this.users.remove(input);
        const user = await this.users.find(input);
        base_test_1.expect(user.id).to.be.equal(input);
        base_test_1.expect(user.isActive).to.be.equal(false);
    }
    async ['should update a desctivity user and reactivate']() {
        const userId = 'c85570e8-89d0-11eb-a43d-e37781ba023d';
        await this.users.remove(userId);
        const userDeactivate = await this.users.find(userId);
        base_test_1.expect(userDeactivate.id).to.be.equal(userId);
        base_test_1.expect(userDeactivate.isActive).to.be.equal(false);
        const input = {
            userId,
            password: 'abc123a',
            lastPassword: 'abc123'
        };
        await this.users.update(input);
        const user = await this.users.find(input.userId);
        base_test_1.expect(user.id).to.be.equal(input.userId);
        base_test_1.expect(await bcrypt_1.default.compare(input.password, user.password))
            .to.be.equal(true);
        base_test_1.expect(user.isActive).to.be.equal(true);
    }
};
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserTest.prototype, 'should create an user', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserTest.prototype, 'should update am activity user', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserTest.prototype, 'should deactive an user', null);
__decorate([
    mocha_typescript_1.test,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserTest.prototype, 'should update a desctivity user and reactivate', null);
UserTest = __decorate([
    mocha_typescript_1.suite('users'),
    __metadata("design:paramtypes", [doctor_1.default,
        user_1.default])
], UserTest);
exports.default = UserTest;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vdGVzdC9lbnRpdGllcy91c2VyLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdURBQThDO0FBQzlDLG9EQUEyQjtBQUUzQixnRUFBcUQ7QUFDckQsdUVBQXFEO0FBQ3JELG1FQUFpRDtBQUdqRCxJQUFxQixRQUFRLEdBQTdCLE1BQXFCLFFBQVMsU0FBUSxtQkFBUTtJQUsxQyxZQUNJLE9BQXNCLEVBQ3RCLEtBQWtCO1FBRWxCLEtBQUssRUFBRSxDQUFBO1FBQ1AsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUE7UUFDdEIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUE7SUFDdEIsQ0FBQztJQUdELEtBQUssQ0FBQyxDQUFDLHVCQUF1QixDQUFDO1FBQzNCLE1BQU0sS0FBSyxHQUFHO1lBQ1YsSUFBSSxFQUFFO2dCQUNGLEtBQUssRUFBRSxhQUFhO2dCQUNwQixRQUFRLEVBQUUsUUFBUTthQUNyQjtZQUNELElBQUksRUFBRSxRQUFRO1lBQ2QsR0FBRyxFQUFFLEtBQUs7WUFDVixLQUFLLEVBQUUsSUFBSTtZQUNYLEdBQUcsRUFBRSxhQUFhO1lBQ2xCLE9BQU8sRUFBRSxLQUFLO1lBQ2QsSUFBSSxFQUFFLFdBQVc7WUFDakIsUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQTtRQUNELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDL0MsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7UUFFakQsa0JBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxL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