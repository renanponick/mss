import { Request, Response } from 'express'
import { erroData, messageError } from '../error'

import PrescriptionService from "../services/prescription"
import { } from '../type'

export default class PrescriptionApi {
    private prescriptionService = new PrescriptionService()

    async createPrescription(req: Request, res: Response) {
        const result = await this.prescriptionService.create(req)
        res.json({ message: "retorno" })
    }

    async updatePrescription(req: Request, res: Response) {
        const result = await this.prescriptionService.update(req)
        res.json({ message: "retorno" })
    }

    async deletePrescription(req: Request, res: Response) {
        const result = await this.prescriptionService.remove(req.params.userId)
        res.json({ message: "retorno" })
    }

    async getPrescription(req: Request, res: Response) {
        const result = await this.prescriptionService.find(req.params.pharmacyId)
        res.json({ message: "retorno" })
    }

    async getPrescriptions(req: Request, res: Response) {
        const result = await this.prescriptionService.findAll()
        res.json({ message: "retorno" })
    }

    /*
    async getPrescriptionBy(req: Request, res: Response) {
        const result = await this.prescriptionService.findByPaciente()
        res.json({ message: "retorno" })
    }*/
}


