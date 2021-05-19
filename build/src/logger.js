"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const winston_1 = require("winston");
const config_1 = __importDefault(require("./config"));
const formats = [
    ...(config_1.default.logs.color
        ? [winston_1.format.colorize()]
        : []),
    winston_1.format.splat(),
    winston_1.format.simple()
];
const log = winston_1.createLogger({
    level: config_1.default.logs.level,
    transports: [new winston_1.transports.Console()],
    format: winston_1.format.combine(...formats)
});
exports.default = log;
morgan_1.default.token('id', req => Array.isArray(req.headers.id)
    ? req.headers.id[0]
    : req.headers.id || '');
exports.httpLogger = morgan_1.default(':id - :method :url - :response-time', { stream: { write: (message) => log.info(message) } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9nZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2xvZ2dlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG9EQUEyQjtBQUMzQixxQ0FBMEQ7QUFFMUQsc0RBQTZCO0FBRTdCLE1BQU0sT0FBTyxHQUFHO0lBQ1osR0FBRyxDQUFDLGdCQUFNLENBQUMsSUFBSSxDQUFDLEtBQUs7UUFDakIsQ0FBQyxDQUFDLENBQUMsZ0JBQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNyQixDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1QsZ0JBQU0sQ0FBQyxLQUFLLEVBQUU7SUFDZCxnQkFBTSxDQUFDLE1BQU0sRUFBRTtDQUNsQixDQUFBO0FBRUQsTUFBTSxHQUFHLEdBQUcsc0JBQVksQ0FBQztJQUNyQixLQUFLLEVBQUUsZ0JBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSztJQUN4QixVQUFVLEVBQUUsQ0FBQyxJQUFJLG9CQUFVLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDdEMsTUFBTSxFQUFFLGdCQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsT0FBTyxDQUFDO0NBQ3JDLENBQUMsQ0FBQTtBQUVGLGtCQUFlLEdBQUcsQ0FBQTtBQUVsQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO0lBQ25ELENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO0FBRWQsUUFBQSxVQUFVLEdBQUcsZ0JBQU0sQ0FDNUIscUNBQXFDLEVBQ3JDLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsT0FBZSxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsQ0FDaEUsQ0FBQSJ9