import { Request, Response } from 'express'
import { erroData, messageError } from '../error'

import DoctorService from "../services/doctor"
import { CreateDoctor, UpdateDoctor } from '../type'

export default class DoctorApi {
    private doctorService = new DoctorService()

    async createDoctor(req: Request, res: Response) {
        const body = req.body
        if (!CreateDoctor.is(body)) {
            res.status(400).send({ erroData })
        }
        const input = {
            user: {
                login: body.user.login,
                password: body.user.password,
            },
            name: body.name,
            crx: body.crx,
            ufCrx: body.ufCrx,
            cpf: body.cpf,
        }
        try{
            const result = await this.doctorService.create(input)
            res.send(result)
        }catch(err){
            res.status(500).send({
                message: messageError('o cadastro'),
                err
            })
        }
    }

    async updateDoctor(req: Request, res: Response) {
        const body = req.body
    
        if (!UpdateDoctor.is(body)) {
            res.status(400).send({ erroData })
        }
    
        const input = {
            id: req.params.doctorId,
            user: {
                login: body.user?.login,
                password: body.user?.password,
            },
            name: body.name,
            crx: body.crx,
            ufCrx: body.ufCrx,
            cpf: body.cpf
        }
        try{
            const result = await this.doctorService.update(input)
            res.send(result)
        }catch(err){
            res.status(500).send({
                message: messageError('a alteração'),
                err
            })
        }
    }

    async deleteDoctor(req: Request, res: Response) {
        try{
            const result = await this.doctorService.delete(req.params.doctorId)
            res.send(result)
        }catch(err){
            res.status(500).send({
                message: messageError('a exclusão'),
                err
            })
        }
    }

    async getDoctor(req: Request, res: Response) {
        const doctorId = req.params.doctorId
        try {
            const result = await this.doctorService.find(doctorId)
            res.send(result)
        }catch (err){
            res.status(404).send({
                message: messageError(`a busca, doutor com id ${doctorId} não encontrado`),
                err
            })
        }
    }

    async getDoctors(_: Request, res: Response) {
        try {
            const result = await this.doctorService.findAll()
            res.send(result)
        }catch (err){
            res.status(404).send({
                message: messageError('a busca'),
                err
            })
        }
    }
}


