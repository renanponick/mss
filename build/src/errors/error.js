"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const t = __importStar(require("io-ts"));
const PathReporter_1 = require("io-ts/lib/PathReporter");
// Recomendation of io-ts docs to create an union of literal strings
const ErrorCodeKey = t.keyof({
    ENTITY_ALREADY_EXIST: null,
    ENTITY_DOES_NOT_EXIST: null,
    VALIDATION_ERROR: null,
    INTERNAL_SERVER_ERROR: null,
    UNAUTHENTICATED: null,
    REQUIRED_BRANCH_ID: null,
    REQUIRED_ID_PARAMETER: null,
    BAD_REQUEST: null
});
exports.ErrorCodeKey = ErrorCodeKey;
const errorInfoWith = (payload = '') => ({
    ENTITY_ALREADY_EXIST: {
        status: 400,
        detailedMessage: `Already exists an entity (${payload}) with the provided id`,
        message: `The provided entity already exists`
    },
    ENTITY_DOES_NOT_EXIST: {
        status: 404,
        detailedMessage: `Doesn't exist the entity (${payload}) with the specified id`,
        message: 'The provided entity doesn\'t exist'
    },
    BAD_REQUEST: {
        status: 400,
        detailedMessage: `It was returned the following message: "${payload}"`,
        message: 'An error has occurred in the request data processing.'
    },
    VALIDATION_ERROR: {
        status: 400,
        detailedMessage: `${payload || 'A Validation error has occurred, verify the body data format'}`,
        message: 'The provided body data has an invalid format.'
    },
    INTERNAL_SERVER_ERROR: {
        status: 500,
        message: 'An unexpected error has occurred in the request processing',
        detailedMessage: 'Unexpected error'
    },
    UNAUTHENTICATED: {
        status: 401,
        message: 'Unauthenticated',
        detailedMessage: 'You must provide the correct credentials and branchId to access this resource'
    },
    REQUIRED_BRANCH_ID: {
        status: 400,
        message: 'The branchId query parameter is required',
        detailedMessage: 'You must provide a branchId as query parameter (?branchId=...)'
    },
    REQUIRED_ID_PARAMETER: {
        status: 400,
        message: 'The id parameter is required',
        detailedMessage: 'The id parameter is required for the specified method'
    }
});
class APIError extends Error {
    constructor(errorCode, payload = '') {
        const { status, message, detailedMessage } = errorInfoWith(payload)[errorCode];
        super(message);
        this.code = errorCode;
        this.detailedMessage = detailedMessage;
        this.statusCode = status;
        this.usedPayload = payload;
        // Recomendation for Built-ins, see the TypeScript Wiki
        // Tslint:disable-next-line: max-line-length
        // https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
        Object.setPrototypeOf(this, APIError.prototype);
    }
}
exports.APIError = APIError;
class APIValidationError extends APIError {
    constructor(payload) {
        super('VALIDATION_ERROR', payload);
    }
}
exports.APIValidationError = APIValidationError;
class APIBadRequestError extends APIError {
    constructor(payload) {
        super('BAD_REQUEST', payload);
    }
}
exports.APIBadRequestError = APIBadRequestError;
const raiseErrorFromDecode = (result) => {
    const errors = PathReporter_1.PathReporter.report(result);
    const attributes = [];
    for (const error of errors) {
        // 'Invalid value undefined supplied to... /id: string'
        // It will match 'id' and 'string'
        const [, attribute, type] = error.match(/.+\/(.+): (.+)$/) || [];
        if (!attribute && !type) {
            continue;
        }
        attributes.push(`(${attribute}: ${type})`);
    }
    if (!attributes.length) {
        // Default message
        throw new APIValidationError();
    }
    const attributesDetails = attributes.join(', ');
    const s = attributes.length > 1 ? 's' : '';
    const message = `Invalid or missing value${s} for the attribute${s}: `
        + `${attributesDetails}`;
    throw new APIValidationError(message);
};
exports.raiseErrorFromDecode = raiseErrorFromDecode;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZXJyb3JzL2Vycm9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUNBLHlDQUEwQjtBQUMxQix5REFBcUQ7QUFJckQsb0VBQW9FO0FBQ3BFLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDekIsb0JBQW9CLEVBQUUsSUFBSTtJQUMxQixxQkFBcUIsRUFBRSxJQUFJO0lBQzNCLGdCQUFnQixFQUFFLElBQUk7SUFDdEIscUJBQXFCLEVBQUUsSUFBSTtJQUMzQixlQUFlLEVBQUUsSUFBSTtJQUNyQixrQkFBa0IsRUFBRSxJQUFJO0lBQ3hCLHFCQUFxQixFQUFFLElBQUk7SUFDM0IsV0FBVyxFQUFFLElBQUk7Q0FDcEIsQ0FBQyxDQUFBO0FBb0lFLG9DQUFZO0FBMUhoQixNQUFNLGFBQWEsR0FBRyxDQUFDLE9BQU8sR0FBRyxFQUFFLEVBQWdDLEVBQUUsQ0FBQyxDQUFDO0lBQ25FLG9CQUFvQixFQUFFO1FBQ2xCLE1BQU0sRUFBRSxHQUFHO1FBQ1gsZUFBZSxFQUFFLDZCQUE2QixPQUFPLHdCQUF3QjtRQUM3RSxPQUFPLEVBQUUsb0NBQW9DO0tBQ2hEO0lBQ0QscUJBQXFCLEVBQUU7UUFDbkIsTUFBTSxFQUFFLEdBQUc7UUFDWCxlQUFlLEVBQUUsNkJBQTZCLE9BQU8seUJBQXlCO1FBQzlFLE9BQU8sRUFBRSxvQ0FBb0M7S0FDaEQ7SUFDRCxXQUFXLEVBQUU7UUFDVCxNQUFNLEVBQUUsR0FBRztRQUNYLGVBQWUsRUFBRSwyQ0FBMkMsT0FBTyxHQUFHO1FBQ3RFLE9BQU8sRUFBRSx1REFBdUQ7S0FDbkU7SUFDRCxnQkFBZ0IsRUFBRTtRQUNkLE1BQU0sRUFBRSxHQUFHO1FBQ1gsZUFBZSxFQUFFLEdBQUcsT0FBTyxJQUFJLDhEQUE4RCxFQUFFO1FBQy9GLE9BQU8sRUFBRSwrQ0FBK0M7S0FDM0Q7SUFDRCxxQkFBcUIsRUFBRTtRQUNu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