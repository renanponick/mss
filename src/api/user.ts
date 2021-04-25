import { Request, Response } from 'express'
import { messageError } from '../error'
import AuthToken from '../middlewares/auth/auth'

import UserService from "../services/user"
import { AuthUser } from '../type'

export default class UserApi {

    private readonly userService = new UserService()
    private readonly auth = new AuthToken()

    async loginAuthUser(req: Request, res: Response){
        const body = req.body

        if(!AuthUser.is(body)){
            messageError(6)
        }
        try {
            const token = await this.auth.generateToken(body)

            res.send({token})
        } catch (error) {
            messageError(7, error)
        }
        return
    }

    async removeUser(req: Request, res: Response) {
        const authUser = req.body.userId
        const userId = req.params.userId

        if(userId != authUser){
            res.status(404).send({ message: messageError(8) })
            return
        }

        const result = await this.userService.remove(userId)
        res.send({ message: result })
    }
    
}
