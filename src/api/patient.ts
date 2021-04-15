import { Request, Response } from 'express'
import { erroData, messageError } from '../error'

import PatientService from "../services/patient"
import { CreatePatient, UpdatePatient } from '../type'

export default class PatientApi {
    private patientService = new PatientService()

    async createPatient(req: Request, res: Response) {
        const body = req.body

        if (!CreatePatient.is(body)) {
            res.status(400).send({ erroData })
        }

        try {
            const result = await this.patientService.create(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError('o cadastro'),
                err
            })
        }
    }

    async updatePatient(req: Request, res: Response) {
        const result = await this.patientService.update(req)
        res.json({ message: "retorno" })
    }

    async getPatient(req: Request, res: Response) {
        const result = await this.patientService.find(req.params.pharmacyId)
        res.json({ message: "retorno" })
    }

    async getPatients(req: Request, res: Response) {
        const result = await this.patientService.findAll()
        res.json({ message: "retorno" })
    }

    /*app.get("/pacientes/user/:idUsuario", async (req: Request, res: Response) => {
        const result = await this.patientService.findByUserId()
        res.json({ message: "retorno" })
    })*/

}
