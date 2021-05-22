import { Request, Response } from 'express'

import { messageError } from '../error'
import PharmacyService from '../services/pharmacy'
import { CreatePharmacy, UpdatePharmacy } from '../type'

export default class PharmacyApi {

    private pharmacyService = new PharmacyService()

    async createPharmacy(req: Request, res: Response) {
        const body = req.body

        if (!CreatePharmacy.is(body)) {
            res.status(400).send({ message: messageError(5) })

            return
        }

        try {
            const result = await this.pharmacyService.create(body)
            res.send(result)

            return
        } catch (err) {
            res.status(500).send({
                message: messageError(1),
                err: err.message
            })

            return
        }
    }

    async updatePharmacy(req: Request, res: Response) {
        const body = req.body
        const { id } = await this.pharmacyService.findUser(body.userId)
        body.id = id

        if (!UpdatePharmacy.is(body)) {
            res.status(400).send({ message: messageError(5) })

            return
        }

        try {
            const result = await this.pharmacyService.update(body)
            res.send(result)

            return
        } catch (err) {
            res.status(500).send({
                message: messageError(2),
                err: err.message
            })

            return
        }
    }

    async getPharmacy(req: Request, res: Response) {
        const pharmacy = await this.pharmacyService.findUser(req.body.userId)
        if (!pharmacy.id) {
            res.status(400).send({ message: messageError(8) })

            return
        }

        try {
            const result = await this.pharmacyService.find(pharmacy.id)
            res.send(result)

            return
        } catch (err) {
            res.status(404).send({
                message: messageError(
                    4,
                    `Farmacia com id ${pharmacy.id} não encontrado.`
                ),
                err: err.message
            })

            return
        }
    }

    async getPharmacies(_: Request, res: Response) {
        try {
            const result = await this.pharmacyService.findAll()
            res.send(result)

            return
        } catch (err) {
            res.status(404).send({
                message: messageError(4),
                err: err.message
            })

            return
        }
    }

}
