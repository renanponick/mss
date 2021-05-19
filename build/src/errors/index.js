"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
const sendAPIErrorResponse = (err, res) => {
    const { statusCode, message, code, detailedMessage, helpUrl } = err;
    res.status(statusCode).json({
        message,
        code,
        detailedMessage,
        helpUrl
    });
};
const middleware = (err, req, res, next) => {
    console.log(err);
    if (err instanceof error_1.APIError) {
        sendAPIErrorResponse(err, res);
    }
    else {
        sendAPIErrorResponse(new error_1.APIError('INTERNAL_SERVER_ERROR'), res);
    }
};
exports.default = middleware;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXJyb3JzL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsbUNBQWtDO0FBRWxDLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxHQUFhLEVBQUUsR0FBYSxFQUFFLEVBQUU7SUFDMUQsTUFBTSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUE7SUFFbkUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDeEIsT0FBTztRQUNQLElBQUk7UUFDSixlQUFlO1FBQ2YsT0FBTztLQUNWLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQTtBQUVELE1BQU0sVUFBVSxHQUF3QixDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO0lBQzVELE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDaEIsSUFBSSxHQUFHLFlBQVksZ0JBQVEsRUFBRTtRQUN6QixvQkFBb0IsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLENBQUE7S0FDakM7U0FBTTtRQUNILG9CQUFvQixDQUFDLElBQUksZ0JBQVEsQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFBO0tBQ25FO0FBQ0wsQ0FBQyxDQUFBO0FBRUQsa0JBQWUsVUFBVSxDQUFBIn0=