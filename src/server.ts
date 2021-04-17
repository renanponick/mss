import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import log from './logger'
import { delay, race } from 'bluebird'
import dbConnection from './database'
import path from 'path'

import { initialize } from 'express-openapi'
import { apiDoc } from './api-doc';
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


app.get("/mss/v1/ping", async (_: Request, res: Response) => {
    log.info("Call route /ping")

    res.send({ message: "Hello! Ping it's OK!" })
})

app.get("/mss/v1/health-check", healthCheck)

const binder = (api: any, method: string) =>
    async (req: Request, res: Response) => {
        api[method](req, res)
    }

// Doctor
app.post("/mss/v1/doctor", binder(doctorApi, 'createDoctor'))
app.put("/mss/v1/doctor/:doctorId", binder(doctorApi, 'updateDoctor'))
app.get("/mss/v1/doctor/:doctorId", binder(doctorApi, 'getDoctor'))
app.get("/mss/v1/doctors", binder(doctorApi, 'getDoctors'))

// Phanrmacy
/*app.get("/mss/v1/pharmacy/user/:userId", binder(pharmacyService,'getDoctor'))*/
app.post("/mss/v1/pharmacy", binder(pharmacyService, 'createPharmacy'))
app.put("/mss/v1/pharmacy/:pharmacyId", binder(pharmacyService, 'updatePharmacy'))
app.get("/mss/v1/pharmacy/:pharmacyId", binder(pharmacyService, 'getPharmacy'))
app.get("/mss/v1/pharmacies", binder(pharmacyService, 'getPharmacies'))

// Patient
app.post("/mss/v1/patient", binder(patientService, 'createPatient'))
app.put("/mss/v1/patient/:patientId", binder(patientService, 'updatePatient'))
app.get("/mss/v1/patient/:patientId", binder(patientService, 'getPatient'))
app.get("/mss/v1/patients", binder(patientService, 'getPatients'))
/*app.get("/mss/v1/pacientes/user/:idUsuario", binder(patientService,'getDoctor'))*/

// Prescription
app.post("/mss/v1/prescription", binder(prescriptionService, 'createPrescription'))
app.put("/mss/v1/prescription/:prescriptionId", binder(prescriptionService, 'updatePrescription'))
app.delete("/mss/v1/prescription/:prescriptionId", binder(prescriptionService, 'deletePrescription'))
app.get("/mss/v1/prescription/:prescriptionId", binder(prescriptionService, 'getPrescription'))
app.get("/mss/v1/prescriptions", binder(prescriptionService, 'getPrescriptions'))//[authJwt.verifyToken, authJwt.isDoutor],
/*app.get("/mss/v1/prescription/patient/:patientId", binder(prescriptionService,'getPrescriptionBy'))
app.get("/mss/v1/prescription/doctor/:doctorId", binder(prescriptionService,'getPrescriptionBy'))
app.get("/mss/v1/prescription/pharmacy/:pharmacyId", binder(prescriptionService,'getPrescriptionBy'))*/

// User
//app.post("/mss/v1/signin", binder(userService,'getDoctor'))
app.delete("/mss/v1/userId", binder(userService, 'getDoctor'))


async function run() {
    await dbConnection

    app.listen(3000, () => {
        log.info(`Servidor rodando: http://localhost:3000`)
    })

    // OpenAPI routes
    initialize({
        app,
        apiDoc,
        paths: path.resolve(__dirname, './api'),
    })

    app.use(
        '/api-doc', 
        swaggerUi.serve,
        swaggerUi.setup(undefined, {
            swaggerOptions: {
                url: 'http://localhost:3000/mss/api-docs',
            },
        })
    )
}

export default run().catch(err => {
    log.error(err)
    log.error(err.stack)
    process.exit(1)
})