"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const logger_1 = __importDefault(require("../logger"));
const app_error_messages_1 = __importDefault(require("./app-error-messages"));
const getSafeProperties = (code, properties) => (properties !== null && properties !== void 0 ? properties : { message: app_error_messages_1.default[code] });
class SuperBusinessError extends Error {
    constructor(code, properties) {
        super(properties
            && typeof (properties.message) === 'string'
            ? properties.message
            : code);
        this.code = code;
        this.properties = properties;
    }
    static classFromCode(code) {
        return class extends SuperBusinessError {
            constructor() {
                super(code, getSafeProperties(code));
            }
        };
    }
    static fromCode(code, properties) {
        return new SuperBusinessError(code, getSafeProperties(code, properties));
    }
}
exports.SuperBusinessError = SuperBusinessError;
class BusinessError extends SuperBusinessError {
    /**
     *
     * @param {string} [message] - A friendly error message
     */
    constructor(message = app_error_messages_1.default.BUSINESS_ERROR) {
        super('BUSINESS_ERROR', { message });
    }
}
exports.BusinessError = BusinessError;
class AuthorizationError extends SuperBusinessError.classFromCode('FORBIDDEN') {
}
exports.AuthorizationError = AuthorizationError;
class AuthenticationError extends SuperBusinessError.classFromCode('AUTHENTICATION_FAILED') {
}
exports.AuthenticationError = AuthenticationError;
// More info on https://www.postgresql.org/docs/11/errcodes-appendix.html
const dbErrors = {
    foreignKeyViolation: '23503',
    uniqueViolation: '23505'
};
function errorFromEntityNotFound(name) {
    return SuperBusinessError.fromCode('ENTITY_NOT_FOUND');
}
exports.errorFromEntityNotFound = errorFromEntityNotFound;
function errorFromDatabaseError(dbError) {
    const code = ramda_1.path(['code'], dbError);
    const error = dbError;
    if (code === dbErrors.uniqueViolation) {
        return SuperBusinessError.fromCode('DUPLICATED_ENTITY');
    }
    return SuperBusinessError.fromCode('INVALID_INPUT');
}
exports.errorFromDatabaseError = errorFromDatabaseError;
class UnexpectedError extends Error {
    constructor(message) {
        super(message);
        this.name = 'UnexpectedError';
        logger_1.default.error(this);
    }
}
exports.UnexpectedError = UnexpectedError;
class BusinessLogicError extends Error {
    constructor(msg) {
        super(msg);
        this.name = 'BusinessLogicError';
        logger_1.default.error(this);
    }
}
exports.BusinessLogicError = BusinessLogicError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
        logger_1.default.error(this);
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NlcnZpY2VzL2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlDQUE0QjtBQUc1Qix1REFBOEI7QUFFOUIsOEVBQW1EO0FBa0JuRCxNQUFNLGlCQUFpQixHQUFHLENBQ3RCLElBQXVCLEVBQ3ZCLFVBQTRCLEVBQzlCLEVBQUUsRUFDQSxVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxFQUFFLE9BQU8sRUFBRSw0QkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFBLENBQUE7QUFFckQsTUFBYSxrQkFBbUIsU0FBUSxLQUFLO0lBS3pDLFlBQ0ksSUFBdUIsRUFDdkIsVUFBMkI7UUFFM0IsS0FBSyxDQUFDLFVBQVU7ZUFDVCxPQUFPLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVE7WUFDM0MsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPO1lBQ3BCLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNYLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFBO0lBQ2hDLENBQUM7SUFFRCxNQUFNLENBQUMsYUFBYSxDQUNoQixJQUF1QjtRQUV2QixPQUFPLEtBQU0sU0FBUSxrQkFBa0I7WUFFbkM7Z0JBQ0ksS0FBSyxDQUFDLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO1lBQ3hDLENBQUM7U0FFSixDQUFBO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBdUIsRUFBRSxVQUE0QjtRQUNqRSxPQUFPLElBQUksa0JBQWtCLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFBO0lBQzVFLENBQUM7Q0FFSjtBQWpDRCxnREFpQ0M7QUFFRCxNQUFhLGFBQWMsU0FBUSxrQkFBa0I7SUFFakQ7OztPQUdHO0lBQ0gsWUFBbUIsT0FBTyxHQUFHLDRCQUFnQixDQUFDLGNBQWM7UUFDeEQsS0FBSyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQTtJQUN4QyxDQUFDO0NBRUo7QUFWRCxzQ0FVQztBQUVELE1BQWEsa0JBQ1QsU0FBUSxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDO0NBQUc7QUFENUQsZ0RBQzREO0FBRTVELE1BQWEsbUJBQ1QsU0FBUSxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsdUJBQXVCLENBQUM7Q0FBRztBQUR4RSxrREFDd0U7QUFFeEUseUVBQXlFO0FBQ3pFLE1BQU0sUUFBUSxHQUFHO0lBQ2IsbUJBQW1CLEVBQUUsT0FBTztJQUM1QixlQUFlLEVBQUUsT0FBTztDQUMzQixDQUFBO0FBRUQsU0FBZ0IsdUJBQXVCLENBQ25DLElBQVk7SUFFWixPQUFPLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFBO0FBQzFELENBQUM7QUFKRCwwREFJQztBQUVELFNBQWdCLHNCQUFzQixDQUNsQyxPQUF5QjtJQUV6QixNQUFNLElBQUksR0FBRyxZQUFJLENBQVMsQ0FBQyxNQUFNLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQTtJQUM1QyxNQUFNLEtBQUssR0FBRyxPQUErQyxDQUFBO0lBRTdELElBQUksSUFBSSxLQUFLLFFBQVEsQ0FBQyxlQUFlLEVBQUU7UUFDbkMsT0FBTyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsbUJBQW1CLENBQUMsQ0FBQTtLQUMxRDtJQUVELE9BQU8sa0JBQWtCLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxDQUFBO0FBQ3ZELENBQUM7QUFYRCx3REFXQztBQUVELE1BQWEsZUFBZ0IsU0FBUSxLQUFLO0lBRXRDLFlBQW1CLE9BQWdCO1FBQy9CLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNkLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUE7UUFFN0IsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDdEIsQ0FBQztDQUVKO0FBVEQsMENBU0M7QUFFRCxNQUFhLGtCQUFtQixTQUFRLEtBQUs7SUFFekMsWUFBbUIsR0FBVztRQUMxQixLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDVixJQUFJLENBQUMsSUFBSSxHQUFHLG9CQUFvQixDQUFBO1FBRWhDLGdCQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3RCLENBQUM7Q0FFSjtBQVRELGdEQVNDO0FBRUQsTUFBYSxhQUFjLFNBQVEsS0FBSztJQUVwQyxZQUFtQixPQUFnQjtRQUMvQixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDZCxJQUFJLENBQUMsSUFBSSxHQUFHLGVBQWUsQ0FBQTtRQUUzQixnQkFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN0QixDQUFDO0NBRUo7QUFURCxzQ0FTQyJ9