import { Request, Response } from 'express'
import { erroData, messageError } from '../error'

import PharmacyService from "../services/pharmacy"
import { CreateDoctor } from '../type'

export default class PharmacyApi {
    private pharmacyService = new PharmacyService()

    async createPharmacy(req: Request, res: Response) {
        const result = await this.pharmacyService.create(req)
        res.json({ message: "retorno" })
    }

    async updatePharmacy(req: Request, res: Response) {
        const result = await this.pharmacyService.update(req)
        res.json({ message: "retorno" })
    }

    async getPharmacy(req: Request, res: Response) {
        const result = await this.pharmacyService.find(req.params.pharmacyId)
        res.json({ message: "retorno" })
    }

    async getPharmacies(req: Request, res: Response) {
        const result = await this.pharmacyService.findAll()
        res.json({ message: "retorno" })
    }
    /*app.get("/pharmacy/user/:userId", async (req: Request, res: Response) => {
        const result = await this.pharmacyService.findByUserId()
        res.json({ message: "retorno" })
    })*/
}


