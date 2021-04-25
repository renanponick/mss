import { Request, Response } from 'express'
import { messageError } from '../error'

import DoctorService from "../services/doctor"
import { CreateDoctor, UpdateDoctor } from '../type'

export default class DoctorApi {
    private doctorService = new DoctorService()

    async createDoctor(req: Request, res: Response) {
        const body = req.body

        if (!CreateDoctor.is(body)) {
            res.status(400).send({ message: messageError(5) })
        }

        try {
            const result = await this.doctorService.create(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(1),
                err
            })
        }
    }

    async updateDoctor(req: Request, res: Response) {
        const body = req.body
        body.id = req.params.doctorId

        if (!UpdateDoctor.is(body) || !req.params.doctorId) {
            res.status(400).send({ message: messageError(5) })
        }

        try {
            const result = await this.doctorService.update(body)
            res.send(result)
        } catch (err) {
            res.status(500).send({
                message: messageError(2),
                err
            })
        }
    }

    async getDoctor(req: Request, res: Response) {
        const doctorId = req.params.doctorId

        if (!doctorId) {
            res.status(400).send({ message: messageError(5) })
        }

        try {
            const result = await this.doctorService.find(doctorId)
            res.send(result)
        } catch (err) {
            res.status(404).send({
                message: messageError(4, `Doutor com id ${doctorId} não encontrado.`),
                err
            })
        }
    }

    async getDoctors(_: Request, res: Response) {
        try {
            const result = await this.doctorService.findAll()
            res.send(result)
        } catch (err) {
            res.status(404).send({
                message: messageError(4),
                err
            })
        }
    }
}


