import config from '../../config'
import crypto from 'crypto'
import bcrypt from 'bcrypt'
import { AuthUser } from '../../type'
import UserRepository from '../../repositories/user'
import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'

@Service()
export default class AuthToken {

    public async generateToken(fields: AuthUser) {
        const login = fields.login
        const pass = fields.password

        const repository = getCustomRepository(UserRepository)
        const user = await repository.getByLogin(login)

        if (!await bcrypt.compare(pass, user.password)) {
            throw new Error("UNAUTHENTICATED")
        }

        const header = JSON.stringify({
            'alg': 'HS256',
            'typ': 'JWT'
        })

        const payload = JSON.stringify({
            'login': user.login,
            'password': user.password,
            'type': user.type
        })
        
        const base64Header = Buffer.from(header).toString('base64').replace(/=/g, '');
        const base64Payload = Buffer.from(payload).toString('base64').replace(/=/g, '');
        
        const data = `${base64Header}.${base64Payload}`
        
        const signature = crypto
            .createHmac('sha256', config.secret)
            .update(data)
            .digest('base64')
        
        const signatureUrl = signature
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '')

        return  `${data}.${signatureUrl}`
    }

}