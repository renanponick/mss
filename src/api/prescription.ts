import { Request, Response } from 'express'
import { messageError } from '../error'

import PrescriptionService from "../services/prescription"
import { CreatePrescription, TakePrescription, UpdatePrescription } from '../type'

export default class PrescriptionApi {

    private prescriptionService = new PrescriptionService()

    async createPrescription(req: Request, res: Response) {
        const body = req.body

        if (!CreatePrescription.is(body)) {
            res.status(400).send({ message: messageError(5) })
        }

        try {
            const result = await this.prescriptionService.create(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(1),
                err: err.message
            })
        }
    }

    async takePrescription(req: Request, res: Response) {
        const body = req.body
        body.id = req.params.prescriptionId

        if (!TakePrescription.is(body)) {
            res.status(400).send({ message: messageError(5) })
        }
        try {
            const result = await this.prescriptionService.takePrescription(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(2),
                err: err.message
            })
        }
    }

    async updatePrescription(req: Request, res: Response) {
        const body = req.body
        body.id = req.params.prescriptionId

        if (!UpdatePrescription.is(body)) {
            res.status(400).send({ message: messageError(5) })
        }

        try {
            const result = await this.prescriptionService.update(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(2),
                err: err.message
            })
        }
    }

    async deletePrescription(req: Request, res: Response) {
        const prescriptionId = req.params.prescriptionId

        if (!prescriptionId) {
            res.status(400).send({ message: messageError(5) })
        }

        try {
            const result = await this.prescriptionService.remove(prescriptionId)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(3),
                err: err.message
            })
        }
    }

    async getPrescription(req: Request, res: Response) {
        try {
            const userId = req.body.userId
            const prescriptionId = req.params.prescriptionId
            const result = await this.prescriptionService
                .getPrescription(userId, prescriptionId)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(4),
                err: err.message
            })
        }
    }

    async getPrescriptions(req: Request, res: Response) {
        try {
            const result = await this.prescriptionService.getPrescriptions(req.body.userId)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(4),
                err: err.message
            })
        }
    }

}
