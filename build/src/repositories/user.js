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
const typeorm_1 = require("typeorm");
const class_transformer_1 = require("class-transformer");
const user_1 = __importDefault(require("../models/user"));
let UserRepository = class UserRepository extends typeorm_1.Repository {
    async findAll() {
        return this
            .createQueryBuilder('user')
            .getMany();
    }
    async createAndSave(fields) {
        const entity = class_transformer_1.plainToClass(user_1.default, fields);
        return this.save(entity);
    }
    async getByEmail(email) {
        return this.findOneOrFail({ email });
    }
};
UserRepository = __decorate([
    typeorm_1.EntityRepository(user_1.default)
], UserRepository);
exports.default = UserRepository;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9yZXBvc2l0b3JpZXMvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLHFDQUFzRDtBQUN0RCx5REFBZ0Q7QUFFaEQsMERBQWlDO0FBSWpDLElBQXFCLGNBQWMsR0FBbkMsTUFBcUIsY0FBZSxTQUFRLG9CQUFnQjtJQUV4RCxLQUFLLENBQUMsT0FBTztRQUNULE9BQU8sSUFBSTthQUNOLGtCQUFrQixDQUFDLE1BQU0sQ0FBQzthQUMxQixPQUFPLEVBQUUsQ0FBQTtJQUNsQixDQUFDO0lBRUQsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFnQjtRQUNoQyxNQUFNLE1BQU0sR0FBRyxnQ0FBWSxDQUFDLGNBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtRQUV6QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBYTtRQUMxQixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQ3hDLENBQUM7Q0FFSixDQUFBO0FBbEJvQixjQUFjO0lBRGxDLDBCQUFnQixDQUFDLGNBQUksQ0FBQztHQUNGLGNBQWMsQ0FrQmxDO2tCQWxCb0IsY0FBYyJ9