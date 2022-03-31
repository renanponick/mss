import { Request, Response } from 'express'

import { messageError } from '../error'
import DoctorService from '../services/doctor'
import { CreateDoctor, UpdateDoctor } from '../type'

export default class DoctorApi {

    private doctorService = new DoctorService()

    async createDoctor(req: Request, res: Response) {
        const body = req.body

        if (!CreateDoctor.is(body)) {
            res.status(400).send({ message: messageError(5) })

            return
        }

        try {
            const result = await this.doctorService.create(body)
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

    async updateDoctor(req: Request, res: Response) {
        const body = req.body
        const { id } = await this.doctorService.findUser(body.userId)
        body.id = id

        if (!UpdateDoctor.is(body)) {
            res.status(400).send({ message: messageError(5) })

            return
        }

        try {
            const result = await this.doctorService.update(body)
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

    async getDoctor(req: Request, res: Response) {
        const doctor = await this.doctorService.findUser(req.body.userId)
        if (!doctor.id) {
            res.status(400).send({ message: messageError(8) })

            return
        }
        try {
            const result = await this.doctorService.find(doctor.id)
            res.send(result)

            return
        } catch (err) {
            res.status(404).send({
                message: messageError(
                    4,
                    `Doutor com id ${doctor.id} não encontrado.`
                ),
                err: err.message
            })

            return
        }
    }

    async getDoctors(_: Request, res: Response) {
        try {
            const result = await this.doctorService.findAll()
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
