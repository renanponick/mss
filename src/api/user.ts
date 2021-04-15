import { Request, Response } from 'express'
import { erroData, messageError } from '../error'

import UserService from "../services/user"
import { CreateDoctor, UpdateDoctor } from '../type'

export default class UserApi {
    private userService = new UserService()

    async deletePrescription(req: Request, res: Response) {
        const result = await this.userService.remove(req.params.userId)
        res.json({ message: "retorno" })
    }

}
