import { path } from 'ramda'
import { QueryFailedError } from 'typeorm'

import logger from '../logger'

import appErrorMessages from './app-error-messages'

export type BusinessErrorCode =
    | 'FORBIDDEN'
    | 'AUTHENTICATION_FAILED'
    | 'ENTITY_NOT_FOUND'
    | 'ENTITY_NOT_FOUND'
    | 'DUPLICATED_ENTITY'
    | 'ENTITY_IS_STILL_REFERENCED'

    // Those two should be split into more specific errors.
    | 'BUSINESS_ERROR'
    | 'INVALID_INPUT'

export interface ErrorProperties {
    message: string
}

const getSafeProperties = (
    code: BusinessErrorCode,
    properties?: ErrorProperties
) =>
    properties ?? { message: appErrorMessages[code] }

export class SuperBusinessError extends Error {

    readonly code: BusinessErrorCode
    readonly properties: ErrorProperties

    public constructor(
        code: BusinessErrorCode,
        properties: ErrorProperties
    ) {
        super(properties
            && typeof (properties.message) === 'string'
            ? properties.message
            : code)
        this.code = code
        this.properties = properties
    }

    static classFromCode(
        code: BusinessErrorCode
    ) {
        return class extends SuperBusinessError {

            constructor() {
                super(code, getSafeProperties(code))
            }

        }
    }

    static fromCode(code: BusinessErrorCode, properties?: ErrorProperties) {
        return new SuperBusinessError(code, getSafeProperties(code, properties))
    }

}

export class BusinessError extends SuperBusinessError {

    /**
     *
     * @param {string} [message] - A friendly error message
     */
    public constructor(message = appErrorMessages.BUSINESS_ERROR) {
        super('BUSINESS_ERROR', { message })
    }

}

export class AuthorizationError
    extends SuperBusinessError.classFromCode('FORBIDDEN') {}

export class AuthenticationError
    extends SuperBusinessError.classFromCode('AUTHENTICATION_FAILED') {}

// More info on https://www.postgresql.org/docs/11/errcodes-appendix.html
const dbErrors = {
    foreignKeyViolation: '23503',
    uniqueViolation: '23505'
}

export function errorFromEntityNotFound(
    name: string
): SuperBusinessError {
    return SuperBusinessError.fromCode('ENTITY_NOT_FOUND')
}

export function errorFromDatabaseError(
    dbError: QueryFailedError
): SuperBusinessError {
    const code = path<string>(['code'], dbError)
    const error = dbError as { detail?: string, message: string }

    if (code === dbErrors.uniqueViolation) {
        return SuperBusinessError.fromCode('DUPLICATED_ENTITY')
    }

    return SuperBusinessError.fromCode('INVALID_INPUT')
}

export class UnexpectedError extends Error {

    public constructor(message?: string) {
        super(message)
        this.name = 'UnexpectedError'

        logger.error(this)
    }

}

export class BusinessLogicError extends Error {

    public constructor(msg: string) {
        super(msg)
        this.name = 'BusinessLogicError'

        logger.error(this)
    }

}

export class NotFoundError extends Error {

    public constructor(message?: string) {
        super(message)
        this.name = 'NotFoundError'

        logger.error(this)
    }

}
