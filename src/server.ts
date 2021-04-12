import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import log from './logger'
import { delay, race } from 'bluebird'
import dbConnection from './database'

import PatientService from './services/patient'
import PharmacyService from './services/pharmacy'
import PrescriptionService from './services/prescription'
import UserService from './services/user'
import { healthCheck } from './health-check'
import DoctorApi from './api/doctor'

async function gracefulExit(signal: NodeJS.Signals) {
    log.info(`Signal "${signal}" received, shutting down...`)
    const connection = await dbConnection
    
    await race([delay(5000), connection.close()])
    process.exit(0)
}

log.info(`Process id: ${process.pid}`)

process.on('SIGTERM', gracefulExit)
process.on('SIGINT', gracefulExit)

const app = express()

const doctorApi = new DoctorApi()
const patientService = new PatientService()
const pharmacyService = new PharmacyService()
const prescriptionService = new PrescriptionService()
const userService = new UserService()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))


app.get("/ping", async (_: Request, res: Response) => {
    log.info("Call route /ping")

    res.json({ message: "Hello! Ping it's OK!" })
})

app.get("/health-check", healthCheck)

const binder = (api: any, method: string) => 
    async (req: Request, res: Response) => {
        api[method](req, res)
    }

// Doctor
app.get("/doctor/:doctorId", binder(doctorApi,'getDoctor'))
app.get("/doctors", binder(doctorApi,'getDoctors'))
app.post("/doctor", binder(doctorApi,'createDoctor'))
app.put("/doctor/:doctorId", binder(doctorApi,'updateDoctor'))
app.delete("/doctor/:doctorId", binder(doctorApi,'deleteDoctor'))



// Phanrmacy
app.get("/pharmacy/:pharmacyId" , async (req: Request, res: Response) => {
    const result = await pharmacyService.find(req.params.pharmacyId)
    res.json({ message: "retorno" })
})
    
/*app.get("/pharmacy/user/:userId", async (req: Request, res: Response) => {
    const result = await pharmacyService.findByUserId()
    res.json({ message: "retorno" })
})*/

app.get("/pharmacies", async (_: Request, res: Response) => {
    const result = await pharmacyService.findAll()
    res.json({ message: "retorno" })
})

app.post("/pharmacy", async (req: Request, res: Response) => {
    const result = await pharmacyService.create(req)
    res.json({ message: "retorno" })
})

app.put("/pharmacy/:pharmacyId", async (req: Request, res: Response) => {
    const result = await pharmacyService.update(req)
    res.json({ message: "retorno" })
})

// Patient

app.get("/patient/:patientId", async (req: Request, res: Response) => {
    const result = await patientService.find(req.params.pharmacyId)
    res.json({ message: "retorno" })
})

/*app.get("/pacientes/user/:idUsuario", async (req: Request, res: Response) => {
    const result = await patientService.findByUserId()
    res.json({ message: "retorno" })
})*/

app.get("/patients", async (_: Request, res: Response) => {
    const result = await patientService.findAll()
    res.json({ message: "retorno" })
})

app.post("/patient", async (req: Request, res: Response) => {
    const result = await patientService.create(req)
    res.json({ message: "retorno" })
})

app.put("/patient/:patientId", async (req: Request, res: Response) => {
    const result = await patientService.update(req)
    res.json({ message: "retorno" })
})

// Prescription
app.get("/prescription/:prescriptionId", async (req: Request, res: Response) => {
    const result = await prescriptionService.find(req.params.pharmacyId)
    res.json({ message: "retorno" })
})
/*
app.get("/prescription/patient/:patientId", async (req: Request, res: Response) => {
    const result = await prescriptionService.findByPaciente()
    res.json({ message: "retorno" })
})

app.get("/prescription/doctor/:doctorId", async (req: Request, res: Response) => {
    const result = await prescriptionService.findByDoutor()
    res.json({ message: "retorno" })
})

app.get("/prescription/pharmacy/:pharmacyId", async (req: Request, res: Response) => {
    const result = await prescriptionService.findByFarmacia()
    res.json({ message: "retorno" })
})
*/
app.get("/prescriptions", async (_: Request, res: Response) => {
    const result = await prescriptionService.findAll()
    res.json({ message: "retorno" })
})
//[authJwt.verifyToken, authJwt.isDoutor],
app.post("/prescription", async (req: Request, res: Response) => {
    const result = await prescriptionService.create(req)
    res.json({ message: "retorno" })
})

app.put("/prescription/:prescriptionId", async (req: Request, res: Response) => {
    const result = await prescriptionService.update(req)
    res.json({ message: "retorno" })
})

app.delete("/prescription", async (req: Request, res: Response) => {
    const result = await prescriptionService.remove(req.params.userId)
    res.json({ message: "retorno" })
})

// User
//app.post("/signin", UserService.signIn)

app.delete("/userId", async (req: Request, res: Response) => {
    const result = await userService.remove(req.params.userId)
    res.json({ message: "retorno" })
})

async function run() {
    await dbConnection

    app.listen(3000, () => {
        log.info(`Servidor rodando: http://localhost:3000`)
    })
}

export default run().catch(err => {
    log.error(err)
    log.error(err.stack)
    process.exit(1)
})