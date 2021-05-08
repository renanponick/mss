import { Request, Response } from 'express'

import { messageError } from '../error'
import AuthToken from '../middlewares/auth/auth'
import UserService from '../services/user'
import { AuthUser, UpdateUser } from '../type'

export default class UserApi {

    private readonly userService = new UserService()
    private readonly auth = new AuthToken()

    async loginAuthUser(req: Request, res: Response) {
        const body = req.body

        if (!AuthUser.is(body)) {
            messageError(6)
        }
        try {
            const token = await this.auth.generateToken(body)

            res.send({ token })
        } catch (err) {
            res.status(404).send({ message: messageError(7, err.message) })

            return
        }

        return
    }

    async updateUser(req: Request, res: Response) {
        const body = req.body
        const userId = req.params.userId
        const authUser = body.userId

        if (!UpdateUser.is(body)) {
            res.status(400).send({ message: messageError(7) })

            return
        }

        if (userId !== authUser) {
            res.status(400).send({ message: messageError(8) })

            return
        }

        try {
            const result = await this.userService.update(body)
            res.send({ message: result })
        } catch (err) {
            res.status(400).send({ message: err.message })
        }
    }

    async removeUser(req: Request, res: Response) {
        const authUser = req.body.userId
        const userId = req.params.userId

        if (userId !== authUser) {
            res.status(400).send({ message: messageError(8) })

            return
        }

        const result = await this.userService.remove(userId)
        res.send({ message: result })
    }

}
