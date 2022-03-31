/* eslint-disable @typescript-eslint/prefer-regexp-exec */
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import config from '../../config'
import { messageError } from '../../error'
import UserService from '../../services/user'

function middleware(types: number[], reactive = false): RequestHandler {
    return async (req, res, next) => {
        const header = req.get('authorization')
        if (!header) {
            res.status(401).send({ message: messageError(10) })

            return
        }

        const b64auth = header.match(/Bearer\s(\S+)/)
        if (!b64auth) {
            res.status(401).send({ message: messageError(10) })

            return
        }

        try {
            jwt.verify(b64auth[1], config.secret)
        } catch (error) {
            res.status(401).send({ message: messageError(10) })

            return
        }

        const content = Buffer.from(b64auth[1], 'base64').toString()
        const match = content.match(
            /{"email":"(.*)","password":"(.*)","type":(.*)}/
        )
        if (!match) {
            res.status(401).send({ message: messageError(10) })

            return
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const [_, email, password, type] = match
        try {
            const users = new UserService()
            const user = await users.getByEmail(email)
            if (password.match(user.password)) {
                res.status(401).send({ message: messageError(7) })

                return
            }

            // eslint-disable-next-line radix
            const userType = parseInt(type)
            const findType = types.find(type => type === userType)

            if (findType === undefined) {
                res.status(400).send({ message: messageError(8) })

                return
            }

            if (
                !user.isActive
                && !reactive
            ) {
                res.status(400).send({ message: messageError(9) })

                return
            }
            req.body.userId = user.id

            next()
        } catch (error) {
            res.status(400).send({ message: error.message })

            return
        }
    }
}

export default middleware
