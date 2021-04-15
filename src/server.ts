import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import log from './logger'
import { delay, race } from 'bluebird'
import dbConnection from './database'

import { healthCheck } from './health-check'
import DoctorApi from './api/doctor'
import PatientApi from './api/patient'
import PharmacyApi from './api/pharmacy'
import PrescriptionApi from './api/prescription'
import UserApi from './api/user'

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
const pharmacyService = new PharmacyApi()
const patientService = new PatientApi()
const prescriptionService = new PrescriptionApi()
const userService = new UserApi()

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
app.post("/doctor", binder(doctorApi, 'createDoctor'))
app.put("/doctor/:doctorId", binder(doctorApi, 'updateDoctor'))
app.get("/doctor/:doctorId", binder(doctorApi, 'getDoctor'))
app.get("/doctors", binder(doctorApi, 'getDoctors'))

// Phanrmacy
/*app.get("/pharmacy/user/:userId", binder(pharmacyService,'getDoctor'))*/
app.post("/pharmacy", binder(pharmacyService, 'createPharmacy'))
app.put("/pharmacy/:pharmacyId", binder(pharmacyService, 'updatePharmacy'))
app.get("/pharmacy/:pharmacyId", binder(pharmacyService, 'getPharmacy'))
app.get("/pharmacies", binder(pharmacyService, 'getPharmacies'))

// Patient
app.post("/patient", binder(patientService, 'createPatient'))
app.put("/patient/:patientId", binder(patientService, 'updatePatient'))
app.get("/patient/:patientId", binder(patientService, 'getPatient'))
app.get("/patients", binder(patientService, 'getPatients'))
/*app.get("/pacientes/user/:idUsuario", binder(patientService,'getDoctor'))*/

// Prescription
app.post("/prescription", binder(prescriptionService, 'createPrescription'))
app.put("/prescription/:prescriptionId", binder(prescriptionService, 'updatePrescription'))
app.delete("/prescription", binder(prescriptionService, 'deletePrescription'))
app.get("/prescription/:prescriptionId", binder(prescriptionService, 'getPrescription'))
app.get("/prescriptions", binder(prescriptionService, 'getPrescriptions'))//[authJwt.verifyToken, authJwt.isDoutor],
/*app.get("/prescription/patient/:patientId", binder(prescriptionService,'getPrescriptionBy'))
app.get("/prescription/doctor/:doctorId", binder(prescriptionService,'getPrescriptionBy'))
app.get("/prescription/pharmacy/:pharmacyId", binder(prescriptionService,'getPrescriptionBy'))*/

// User
//app.post("/signin", binder(userService,'getDoctor'))
app.delete("/userId", binder(userService, 'getDoctor'))


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