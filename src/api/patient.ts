import { Request, Response } from 'express'
import { messageError } from '../error'

import PatientService from "../services/patient"
import { CreatePatient, UpdatePatient } from '../type'

export default class PatientApi {
    private patientService = new PatientService()

    async createPatient(req: Request, res: Response) {
        const body = req.body

        if (!CreatePatient.is(body)) {
            res.status(400).send({ message: messageError(5) })
        } 

        try {
            const result = await this.patientService.create(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(1),
                err: err.message
            })
        }
    }

    async updatePatient(req: Request, res: Response) {
        const body = req.body
        body.id = req.params.patientId
    
        if (!UpdatePatient.is(body) || !req.params.patientId) {
            res.status(400).send({ message: messageError(5) })
        }

        try {
            const result = await this.patientService.update(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(2),
                err: err.message
            })
        }
    }

    async getPatient(req: Request, res: Response) {
        const patientId = req.params.patientId

        if (!patientId) {
            res.status(400).send({ message: messageError(5) })
        }

        try {
            const result = await this.patientService.find(patientId)
            res.send(result)
        } catch (err) {
            res.status(404).send({
                message: messageError(4, `Paciente com id ${patientId} não encontrado.`),
                err: err.message
            })
        }
    }

    async getPatients(_: Request, res: Response) {
        try {
            const result = await this.patientService.findAll()
            res.send(result)
        } catch (err) {
            res.status(404).send({
                message: messageError(4),
                err: err.message
            })
        }
    }
}