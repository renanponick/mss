import { Request, Response } from 'express'
import { erroData, messageError } from '../error'

import PrescriptionService from "../services/prescription"
import { CreatePrescription, UpdatePrescription } from '../type'

export default class PrescriptionApi {
    private prescriptionService = new PrescriptionService()

    async createPrescription(req: Request, res: Response) {
        const body = req.body
        
        if (!CreatePrescription.is(body)) {
            res.status(400).send({ erroData })
        }
        try {
            const result = await this.prescriptionService.create(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(1),
                err
            })
        }
    }

    async updatePrescription(req: Request, res: Response) {
        const body = req.body
        
        if (!UpdatePrescription.is(body)) {
            res.status(400).send({ erroData })
        }
        
        try {
            const result = await this.prescriptionService.update(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(2),
                err
            })
        }
    }

    async deletePrescription(req: Request, res: Response) {
        const body = req.params.prescriptionId

        try {
            const result = await this.prescriptionService.remove(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(3),
                err
            })
        }
    }

    async getPrescription(req: Request, res: Response) {
        const body = req.params.prescriptionId

        try {
            const result = await this.prescriptionService.find(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(4),
                err
            })
        }
    }

    async getPrescriptions(_: Request, res: Response) {
        try {
            const result = await this.prescriptionService.findAll()
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(4),
                err
            })
        }
    }

    /*
    async getPrescriptionBy(req: Request, res: Response) {
        const body = req.body
        
        if (!CreateDoctor.is(body)) {
            res.status(400).send({ erroData })
        }

        const result = await this.prescriptionService.findByPaciente()
        
        try {
            const result = await this.doctorService.create(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError('o cadastro'),
                err
            })
        }
    }*/
}
