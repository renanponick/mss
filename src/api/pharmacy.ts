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
        }

        try {
            const result = await this.pharmacyService.create(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(1),
                err: err.message
            })
        }
    }

    async updatePharmacy(req: Request, res: Response) {
        const body = req.body
        body.id = req.params.pharmacyId

        const pharmacy = await this.pharmacyService.findUser(body.userId)
        if (pharmacy.id !== body.id) {
            res.status(400).send({ message: messageError(8) })
        }

        if (!UpdatePharmacy.is(body) || !req.params.pharmacyId) {
            res.status(400).send({ message: messageError(5) })
        }

        try {
            const result = await this.pharmacyService.update(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(2),
                err: err.message
            })
        }
    }

    async getPharmacy(req: Request, res: Response) {
        const pharmacyId = req.params.pharmacyId

        const pharmacy = await this.pharmacyService.findUser(req.body.userId)
        if (pharmacy.id !== pharmacyId) {
            res.status(400).send({ message: messageError(8) })
        }

        if (!pharmacyId) {
            res.status(400).send({ message: messageError(5) })
        }

        try {
            const result = await this.pharmacyService.find(pharmacyId)
            res.send(result)
        } catch (err) {
            res.status(404).send({
                message: messageError(
                    4,
                    `Farmacia com id ${pharmacyId} não encontrado.`
                ),
                err: err.message
            })
        }
    }

    async getPharmacies(_: Request, res: Response) {
        try {
            const result = await this.pharmacyService.findAll()
            res.send(result)
        } catch (err) {
            res.status(404).send({
                message: messageError(4),
                err: err.message
            })
        }
    }

}
