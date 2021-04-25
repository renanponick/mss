import config from '../../config'
import { RequestHandler } from 'express'
import UserRepository from '../../repositories/user'
import { getCustomRepository } from 'typeorm'
import jwt from 'jsonwebtoken'
import { messageError } from '../../error'

function middleware(userType: number): RequestHandler {
    return async (req, res, next) => {
        const header = req.get('authorization')
        console.log(header)
        if (!header) {
            res.status(401).send({ message: messageError(7) })
            return
        }

        const b64auth = header.match(/Bearer\s(\S+)/)
        if (!b64auth) {
            res.status(401).send({ message: messageError(7) })
            return
        }

        try {
            jwt.verify(b64auth[1], config.secret)
        } catch (error) {
            res.status(401).send({ message: messageError(7) })
            return
        }

        const content = Buffer.from(b64auth[1], 'base64').toString()
        const match = content.match(/{"login":"(.*)","password":"(.*)","type":"(.*)"}/)
        if (!match) {
            res.status(401).send({ message: messageError(7) })
            return
        }

        const [_, login, password, type] = match
        const repository = getCustomRepository(UserRepository)
        const user = await repository.getByLogin(login)
        if (password.match(user.password)) {
            res.status(401).send({ message: messageError(7) })
            return
        }
        if(parseInt(type) != userType){
            res.status(404).send({ message: messageError(8) })
            return
        }
        req.body.userId = user.id
        
        next()
    }
}

export default middleware
