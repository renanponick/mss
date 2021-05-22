import crypto from 'crypto'

import bcrypt from 'bcrypt'
import { Service } from 'typedi'

import config from '../../config'
import { AuthUser } from '../../type'
import UserService from '../../services/user'
import { APIError } from '../../errors/error'

@Service()
export default class AuthToken {

    private users = new UserService()

    public async generateToken(fields: AuthUser) {
        const email = fields.email
        const pass = fields.password
        const user = await this.users.getByEmail(email)

        if (!await bcrypt.compare(pass, user.password)) {
            throw new APIError('UNAUTHENTICATED')
        }

        if (!user.isActive) {
            throw new APIError('UNAUTHENTICATED')
        }

        const header = JSON.stringify({
            alg: 'HS256',
            typ: 'JWT'
        })

        const payload = JSON.stringify({
            email: user.email,
            password: user.password,
            type: user.type
        })

        const base64Header = Buffer
            .from(header)
            .toString('base64')
            .replace(/=/g, '')
        const base64Payload = Buffer
            .from(payload)
            .toString('base64')
            .replace(/=/g, '')

        const data = `${base64Header}.${base64Payload}`

        const signature = crypto
            .createHmac('sha256', config.secret)
            .update(data)
            .digest('base64')

        const signatureUrl = signature
            .replace(/\+/g, '-')
            .replace(/\//g, '_')
            .replace(/=/g, '')

        return  { token: `${data}.${signatureUrl}`, type: user.type }
    }

}
