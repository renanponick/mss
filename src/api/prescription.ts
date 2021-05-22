import { Request, Response } from 'express'

import { messageError } from '../error'
import DoctorService from '../services/doctor'
import PharmacyService from '../services/pharmacy'
import PrescriptionService from '../services/prescription'
import {
    CreatePrescription,
    TakePrescription,
    UpdatePrescription
} from '../type'

export default class PrescriptionApi {

    private prescriptionService = new PrescriptionService()
    private pharmacyService = new PharmacyService()
    private doctorService = new DoctorService()

    async createPrescription(req: Request, res: Response) {
        const body = req.body
        const { id } = await this.doctorService.findUser(body.userId)
        body.doctorId = id

        if (!CreatePrescription.is(body)) {
            res.status(400).send({ message: messageError(5) })

            return
        }

        try {
            const result = await this.prescriptionService.create(body)
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

    async takePrescription(req: Request, res: Response) {
        const body = req.body
        const { id } = await this.pharmacyService.findUser(body.userId)
        body.pharmacyId = id
        body.id = req.params.prescriptionId

        if (!TakePrescription.is(body)) {
            res.status(400).send({ message: messageError(5) })

            return
        }
        try {
            const result = await this.prescriptionService.takePrescription(body)
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

    async updatePrescription(req: Request, res: Response) {
        const body = req.body
        body.id = req.params.prescriptionId

        if (!UpdatePrescription.is(body)) {
            res.status(400).send({ message: messageError(5) })

            return
        }

        try {
            const result = await this.prescriptionService.update(body)
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

    async deletePrescription(req: Request, res: Response) {
        const prescriptionId = req.params.prescriptionId

        if (!prescriptionId) {
            res.status(400).send({ message: messageError(5) })

            return
        }

        try {
            const result = await this.prescriptionService.remove(prescriptionId)
            res.send(result)

            return
        } catch (err) {
            res.status(500).send({
                message: messageError(3),
                err: err.message
            })

            return
        }
    }

    async getPrescription(req: Request, res: Response) {
        try {
            const userId = req.body.userId
            const prescriptionId = req.params.prescriptionId
            const result = await this.prescriptionService
                .getPrescription(userId, prescriptionId)
            res.send(result)

            return
        } catch (err) {
            res.status(500).send({
                message: messageError(4),
                err: err.message
            })

            return
        }
    }

    async getPrescriptions(req: Request, res: Response) {
        try {
            const result = await this.prescriptionService
                .getPrescriptions(req.body.userId)
            res.send(result)

            return
        } catch (err) {
            res.status(500).send({
                message: messageError(4),
                err: err.message
            })

            return
        }
    }

}
