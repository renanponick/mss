"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("../error");
const auth_1 = __importDefault(require("../middlewares/auth/auth"));
const user_1 = __importDefault(require("../services/user"));
const type_1 = require("../type");
class UserApi {
    constructor() {
        this.userService = new user_1.default();
        this.auth = new auth_1.default();
    }
    async loginAuthUser(req, res) {
        const body = req.body;
        if (!type_1.AuthUser.is(body)) {
            error_1.messageError(6);
        }
        try {
            const token = await this.auth.generateToken(body);
            res.send({ token });
        }
        catch (err) {
            res.status(404).send({ message: error_1.messageError(7, err.message) });
            return;
        }
        return;
    }
    async updateUser(req, res) {
        const body = req.body;
        const userId = req.params.userId;
        const authUser = body.userId;
        if (!type_1.UpdateUser.is(body)) {
            res.status(400).send({ message: error_1.messageError(7) });
            return;
        }
        if (userId !== authUser) {
            res.status(400).send({ message: error_1.messageError(8) });
            return;
        }
        try {
            const result = await this.userService.update(body);
            res.send({ message: result });
        }
        catch (err) {
            res.status(400).send({ message: err.message });
        }
    }
    async removeUser(req, res) {
        const authUser = req.body.userId;
        const userId = req.params.userId;
        if (userId !== authUser) {
            res.status(400).send({ message: error_1.messageError(8) });
            return;
        }
        const result = await this.userService.remove(userId);
        res.send({ message: result });
    }
}
exports.default = UserApi;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcGkvdXNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLG9DQUF1QztBQUN2QyxvRUFBZ0Q7QUFDaEQsNERBQTBDO0FBQzFDLGtDQUE4QztBQUU5QyxNQUFxQixPQUFPO0lBQTVCO1FBRXFCLGdCQUFXLEdBQUcsSUFBSSxjQUFXLEVBQUUsQ0FBQTtRQUMvQixTQUFJLEdBQUcsSUFBSSxjQUFTLEVBQUUsQ0FBQTtJQTREM0MsQ0FBQztJQTFERyxLQUFLLENBQUMsYUFBYSxDQUFDLEdBQVksRUFBRSxHQUFhO1FBQzNDLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUE7UUFFckIsSUFBSSxDQUFDLGVBQVEsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsb0JBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUNsQjtRQUNELElBQUk7WUFDQSxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO1lBRWpELEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO1NBQ3RCO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDVixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBWSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBRS9ELE9BQU07U0FDVDtRQUVELE9BQU07SUFDVixDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFZLEVBQUUsR0FBYTtRQUN4QyxNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFBO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFBO1FBQ2hDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUE7UUFFNUIsSUFBSSxDQUFDLGlCQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3RCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLG9CQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBRWxELE9BQU07U0FDVDtRQUVELElBQUksTUFBTSxLQUFLLFFBQVEsRUFBRTtZQUNyQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUVsRCxPQUFNO1NBQ1Q7UUFFRCxJQUFJO1lBQ0EsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNsRCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUE7U0FDaEM7UUFBQyxPQUFPLEdBQUcsRUFBRTtZQUNWLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFBO1NBQ2pEO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBWSxFQUFFLEdBQWE7UUFDeEMsTUFBTSxRQUFRLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUE7UUFDaEMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUE7UUFFaEMsSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFO1lBQ3JCLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLG9CQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBRWxELE9BQU07U0FDVDtRQUVELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDcEQsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFBO0lBQ2pDLENBQUM7Q0FFSjtBQS9ERCwwQkErREMifQ==