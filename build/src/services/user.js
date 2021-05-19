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
const typedi_1 = require("typedi");
const typeorm_1 = require("typeorm");
const bcrypt_1 = __importDefault(require("bcrypt"));
const ramda_1 = require("ramda");
const user_1 = __importDefault(require("../repositories/user"));
let UserService = class UserService {
    async hashPassword(plainPassword) {
        if (plainPassword === '') {
            throw new Error('A senha não pode ser vazia');
        }
        return bcrypt_1.default.hash(plainPassword, 10);
    }
    async create(fields) {
        const repository = typeorm_1.getCustomRepository(user_1.default);
        const password = await this.hashPassword(fields.password);
        const result = await repository.createAndSave({
            ...fields,
            password
        });
        return ramda_1.omit(['password'], result);
    }
    async update(fields) {
        const repository = typeorm_1.getCustomRepository(user_1.default);
        const query = { id: fields.userId };
        const user = await repository
            .findOneOrFail({ where: query });
        if (!await bcrypt_1.default.compare(fields.lastPassword, user.password)) {
            throw new Error('A senha anterior não confere');
        }
        const password = await this.hashPassword(fields.password);
        const result = await repository.save({
            ...query,
            ...user,
            password,
            isActive: true
        });
        return ramda_1.omit(['password'], result);
    }
    async remove(id) {
        const repository = typeorm_1.getCustomRepository(user_1.default);
        const query = { id };
        const user = await repository
            .findOneOrFail({ where: query });
        const result = await repository.save({
            ...query,
            ...user,
            isActive: false
        });
        return ramda_1.omit(['password'], result);
    }
    async find(id) {
        const repository = typeorm_1.getCustomRepository(user_1.default);
        const query = { id };
        return repository.findOneOrFail({ where: query });
    }
    async findAll() {
        const repository = typeorm_1.getCustomRepository(user_1.default);
        return repository.findAll();
    }
    async getByEmail(email) {
        const repository = typeorm_1.getCustomRepository(user_1.default);
        return repository.getByEmail(email);
    }
};
UserService = __decorate([
    typedi_1.Service()
], UserService);
exports.default = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zZXJ2aWNlcy91c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsbUNBQWdDO0FBQ2hDLHFDQUE2QztBQUM3QyxvREFBMkI7QUFDM0IsaUNBQTRCO0FBRTVCLGdFQUFpRDtBQUlqRCxJQUFxQixXQUFXLEdBQWhDLE1BQXFCLFdBQVc7SUFFNUIsS0FBSyxDQUFDLFlBQVksQ0FBQyxhQUFxQjtRQUNwQyxJQUFJLGFBQWEsS0FBSyxFQUFFLEVBQUU7WUFDdEIsTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFBO1NBQ2hEO1FBRUQsT0FBTyxnQkFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDekMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBZ0I7UUFDekIsTUFBTSxVQUFVLEdBQUcsNkJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDdEQsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN6RCxNQUFNLE1BQU0sR0FBRyxNQUFNLFVBQVUsQ0FBQyxhQUFhLENBQUM7WUFDMUMsR0FBRyxNQUFNO1lBQ1QsUUFBUTtTQUNYLENBQUMsQ0FBQTtRQUVGLE9BQU8sWUFBSSxDQUFDLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUE7SUFDckMsQ0FBQztJQUVELEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBa0I7UUFDM0IsTUFBTSxVQUFVLEdBQUcsNkJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDdEQsTUFBTSxLQUFLLEdBQUcsRUFBRSxFQUFFLEVBQUUsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFBO1FBRW5DLE1BQU0sSUFBSSxHQUFHLE1BQU0sVUFBVTthQUN4QixhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUVwQyxJQUFJLENBQUMsTUFBTSxnQkFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtZQUMzRCxNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUE7U0FDbEQ7UUFFRCxNQUFNLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3pELE1BQU0sTUFBTSxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQztZQUNqQyxHQUFHLEtBQUs7WUFDUixHQUFHLElBQUk7WUFDUCxRQUFRO1lBQ1IsUUFBUSxFQUFFLElBQUk7U0FDakIsQ0FBQyxDQUFBO1FBRUYsT0FBTyxZQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxFQUFVO1FBQ25CLE1BQU0sVUFBVSxHQUFHLDZCQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQ3RELE1BQU0sS0FBSyxHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUE7UUFFcEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxVQUFVO2FBQ3hCLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBRXBDLE1BQU0sTUFBTSxHQUFHLE1BQU0sVUFBVSxDQUFDLElBQUksQ0FBQztZQUNqQyxHQUFHLEtBQUs7WUFDUixHQUFHLElBQUk7WUFDUCxRQUFRLEVBQUUsS0FBSztTQUNsQixDQUFDLENBQUE7UUFFRixPQUFPLFlBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQ3JDLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQVU7UUFDakIsTUFBTSxVQUFVLEdBQUcsNkJBQW1CLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDdEQsTUFBTSxLQUFLLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQTtRQUVwQixPQUFPLFVBQVUsQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQTtJQUNyRCxDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU87UUFDVCxNQUFNLFVBQVUsR0FBRyw2QkFBbUIsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUV0RCxPQUFPLFVBQVUsQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUMvQixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFhO1FBQzFCLE1BQU0sVUFBVSxHQUFHLDZCQUFtQixDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBRXRELE9BQU8sVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0NBRUosQ0FBQTtBQTlFb0IsV0FBVztJQUQvQixnQkFBTyxFQUFFO0dBQ1csV0FBVyxDQThFL0I7a0JBOUVvQixXQUFXIn0=