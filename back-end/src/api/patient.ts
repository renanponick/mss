import { Request, Response } from 'express'

import { messageError } from '../error'
import PatientService from '../services/patient'
import { CreatePatient, UpdatePatient } from '../type'

export default class PatientApi {

    private patientService = new PatientService()

    async createPatient(req: Request, res: Response) {
        const body = req.body

        if (!CreatePatient.is(body)) {
            res.status(400).send({ message: messageError(5) })

            return
        }

        try {
            const result = await this.patientService.create(body)
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

    async updatePatient(req: Request, res: Response) {
        const body = req.body
        const { id } = await this.patientService.findUser(body.userId)
        body.id = id

        if (!UpdatePatient.is(body)) {
            res.status(400).send({ message: messageError(5) })

            return
        }

        try {
            const result = await this.patientService.update(body)
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

    async getPatient(req: Request, res: Response) {
        const patient = await this.patientService.findUser(req.body.userId)
        if (!patient.id) {
            res.status(400).send({ message: messageError(8) })

            return
        }

        try {
            const result = await this.patientService.find(patient.id)
            res.send(result)

            return
        } catch (err) {
            res.status(404).send({
                message: messageError(
                    4,
                    `Paciente com id ${patient.id} não encontrado.`
                ),
                err: err.message
            })

            return
        }
    }

    async getPatientByCpf(req: Request, res: Response) {
        const cpf = req.params.cpf

        if (!cpf) {
            res.status(400).send({ message: messageError(5) })
        }

        try {
            const result = await this.patientService.findByCpf(cpf)
            res.send(result)

            return
        } catch (err) {
            res.status(404).send({
                message: messageError(
                    4,
                    `Paciente com CPF: ${cpf} não encontrado.`
                ),
                err: err.message
            })

            return
        }
    }

    async getPatients(_: Request, res: Response) {
        try {
            const result = await this.patientService.findAll()
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
