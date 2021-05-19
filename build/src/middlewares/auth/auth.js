"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const user_1 = __importDefault(require("../../services/user"));
const error_1 = require("../../errors/error");
let AuthToken = class AuthToken {
    constructor() {
        this.users = new user_1.default();
    }
    async generateToken(fields) {
        const email = fields.email;
        const pass = fields.password;
        const user = await this.users.getByEmail(email);
        if (!await bcrypt_1.default.compare(pass, user.password)) {
            throw new error_1.APIError('UNAUTHENTICATED');
        }
        if (!user.isActive) {
            throw new error_1.APIError('UNAUTHENTICATED');
        }
        const header = JSON.stringify({
            alg: 'HS256',
            typ: 'JWT'
        });
        const payload = JSON.stringify({
            email: user.email,
            password: user.password,
            type: user.type
        });
        const base64Header = Buffer
            .from(header)
            .toString('base64')
            .replace(/=/g, '');
        const base64Payload = Buffer
            .from(payload)
            .toString('base64')
            .replace(/=/g, '');
        const data = `${base64Header}.${base64Payload}`;
        const signature = crypto_1.default
            .createHmac('sha256', config_1.default.secret)
            .update(data)
            .digest('base64');
        const signatureUrl = signature
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '');
        return `${data}.${signatureUrl}`;
    }
};
AuthToken = __decorate([
    typedi_1.Service()
], AuthToken);
exports.default = AuthToken;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9taWRkbGV3YXJlcy9hdXRoL2F1dGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSxvREFBMkI7QUFFM0Isb0RBQTJCO0FBQzNCLG1DQUFnQztBQUVoQywwREFBaUM7QUFFakMsK0RBQTZDO0FBQzdDLDhDQUE2QztBQUc3QyxJQUFxQixTQUFTLEdBQTlCLE1BQXFCLFNBQVM7SUFBOUI7UUFFWSxVQUFLLEdBQUcsSUFBSSxjQUFXLEVBQUUsQ0FBQTtJQWtEckMsQ0FBQztJQWhEVSxLQUFLLENBQUMsYUFBYSxDQUFDLE1BQWdCO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUE7UUFDMUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLFFBQVEsQ0FBQTtRQUM1QixNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBRS9DLElBQUksQ0FBQyxNQUFNLGdCQUFNLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDNUMsTUFBTSxJQUFJLGdCQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtTQUN4QztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxnQkFBUSxDQUFDLGlCQUFpQixDQUFDLENBQUE7U0FDeEM7UUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzFCLEdBQUcsRUFBRSxPQUFPO1lBQ1osR0FBRyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUE7UUFFRixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJO1NBQ2xCLENBQUMsQ0FBQTtRQUVGLE1BQU0sWUFBWSxHQUFHLE1BQU07YUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNaLFFBQVEsQ0FBQyxRQUFRLENBQUM7YUFDbEIsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUN0QixNQUFNLGFBQWEsR0FBRyxNQUFNO2FBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDYixRQUFRLENBQUMsUUFBUSxDQUFDO2FBQ2xCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7UUFFdEIsTUFBTSxJQUFJLEdBQUcsR0FBRyxZQUFZLElBQUksYUFBYSxFQUFFLENBQUE7UUFFL0MsTUFBTSxTQUFTLEdBQUcsZ0JBQU07YUFDbkIsVUFBVSxDQUFDLFFBQVEsRUFBRSxnQkFBTSxDQUFDLE1BQU0sQ0FBQzthQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDO2FBQ1osTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBRXJCLE1BQU0sWUFBWSxHQUFHLFNBQVM7YUFDekIsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7YUFDbkIsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUM7YUFDbkIsT0FBTyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtRQUV0QixPQUFRLEdBQUcsSUFBSSxJQUFJLFlBQVksRUFBRSxDQUFBO0lBQ3JDLENBQUM7Q0FFSixDQUFBO0FBcERvQixTQUFTO0lBRDdCLGdCQUFPLEVBQUU7R0FDVyxTQUFTLENBb0Q3QjtrQkFwRG9CLFNBQVMifQ==