"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const error_1 = require("../../error");
const user_1 = __importDefault(require("../../services/user"));
function middleware(types, reactive = false) {
    return async (req, res, next) => {
        const header = req.get('authorization');
        if (!header) {
            res.status(401).send({ message: error_1.messageError(10) });
            return;
        }
        const b64auth = header.match(/Bearer\s(\S+)/);
        if (!b64auth) {
            res.status(401).send({ message: error_1.messageError(10) });
            return;
        }
        try {
            jsonwebtoken_1.default.verify(b64auth[1], config_1.default.secret);
        }
        catch (error) {
            res.status(401).send({ message: error_1.messageError(10) });
            return;
        }
        const content = Buffer.from(b64auth[1], 'base64').toString();
        const match = content.match(/{"email":"(.*)","password":"(.*)","type":(.*)}/);
        if (!match) {
            res.status(401).send({ message: error_1.messageError(10) });
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, email, password, type] = match;
        try {
            const users = new user_1.default();
            const user = await users.getByEmail(email);
            if (password.match(user.password)) {
                res.status(401).send({ message: error_1.messageError(7) });
                return;
            }
            // eslint-disable-next-line radix
            const userType = parseInt(type);
            const findType = types.find(type => type === userType);
            if (findType === undefined) {
                res.status(400).send({ message: error_1.messageError(8) });
                return;
            }
            if (!user.isActive
                && !reactive) {
                res.status(400).send({ message: error_1.messageError(9) });
                return;
            }
            req.body.userId = user.id;
            next();
        }
        catch (error) {
            res.status(400).send({ message: error.message });
            return;
        }
    };
}
exports.default = middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvbWlkZGxld2FyZXMvYXV0aC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUVBLGdFQUE4QjtBQUU5QiwwREFBaUM7QUFDakMsdUNBQTBDO0FBQzFDLCtEQUE2QztBQUU3QyxTQUFTLFVBQVUsQ0FBQyxLQUFlLEVBQUUsUUFBUSxHQUFHLEtBQUs7SUFDakQsT0FBTyxLQUFLLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUM1QixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDVCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUVuRCxPQUFNO1NBQ1Q7UUFFRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFBO1FBQzdDLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDVixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBWSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUVuRCxPQUFNO1NBQ1Q7UUFFRCxJQUFJO1lBQ0Esc0JBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLGdCQUFNLENBQUMsTUFBTSxDQUFDLENBQUE7U0FDeEM7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLG9CQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBRW5ELE9BQU07U0FDVDtRQUVELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFBO1FBQzVELE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQ3ZCLGdEQUFnRCxDQUNuRCxDQUFBO1FBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRTtZQUNSLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLG9CQUFZLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBRW5ELE9BQU07U0FDVDtRQUVELDZEQUE2RDtRQUM3RCxNQUFNLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFBO1FBQ3hDLElBQUk7WUFDQSxNQUFNLEtBQUssR0FBRyxJQUFJLGNBQVcsRUFBRSxDQUFBO1lBQy9CLE1BQU0sSUFBSSxHQUFHLE1BQU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUMxQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUMvQixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFFbEQsT0FBTTthQUNUO1lBRUQsaUNBQWlDO1lBQ2pDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUMvQixNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFBO1lBRXRELElBQUksUUFBUSxLQUFLLFNBQVMsRUFBRTtnQkFDeEIsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsb0JBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7Z0JBRWxELE9BQU07YUFDVDtZQUVELElBQ0ksQ0FBQyxJQUFJLENBQUMsUUFBUTttQkFDWCxDQUFDLFFBQVEsRUFDZDtnQkFDRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxvQkFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtnQkFFbEQsT0FBTTthQUNUO1lBQ0QsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQTtZQUV6QixJQUFJLEVBQUUsQ0FBQTtTQUNUO1FBQUMsT0FBTyxLQUFLLEVBQUU7WUFDWixHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTtZQUVoRCxPQUFNO1NBQ1Q7SUFDTCxDQUFDLENBQUE7QUFDTCxDQUFDO0FBRUQsa0JBQWUsVUFBVSxDQUFBIn0=