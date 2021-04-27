import config from '../../config'
import { RequestHandler } from 'express'
import UserRepository from '../../repositories/user'
import { getCustomRepository } from 'typeorm'
import jwt from 'jsonwebtoken'
import { messageError } from '../../error'

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
        const match = content.match(/{"login":"(.*)","password":"(.*)","type":(.*)}/)
        if (!match) {
            res.status(401).send({ message: messageError(10) })
            return
        }
        
        const [_, login, password, type] = match
        const repository = getCustomRepository(UserRepository)
        try {
            const user = await repository.getByLogin(login)
            if (password.match(user.password)) {
                res.status(401).send({ message: messageError(7) })
                return
            }
    
            const userType = parseInt(type)
            const findType = types.find(type => type === userType)
    
            if(findType === undefined){
                res.status(404).send({ message: messageError(8) })
                return
            }
    
            if(
                !user.isActive
                && !reactive
            ){
                res.status(404).send({ message: messageError(9) })
                return
            }
            req.body.userId = user.id
            
            next()
        } catch (error) {
            res.status(404).send({ message: error.message })
            return
        }

    }
}

export default middleware
