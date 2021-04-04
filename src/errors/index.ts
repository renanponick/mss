import { ErrorRequestHandler, Response } from 'express'
import { APIError } from './error'

const sendAPIErrorResponse = (err: APIError, res: Response) => {
    const { statusCode, message, code, detailedMessage, helpUrl } = err

    res.status(statusCode).json({
        message,
        code,
        detailedMessage,
        helpUrl
    })
}

const middleware: ErrorRequestHandler = (err, req, res, next) => {
    console.log(err)
    if (err instanceof APIError) {
        sendAPIErrorResponse(err, res)
    } else {
        sendAPIErrorResponse(new APIError('INTERNAL_SERVER_ERROR'), res)
    }
}

export default middleware
