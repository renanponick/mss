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

    async deletePrescription(req: Request, res: Response) {
        const result = await this.userService.remove(req.params.userId)
        res.send({ message: "retorno" })
    }

    
}
