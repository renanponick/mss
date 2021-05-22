import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import { delay, race } from 'bluebird'

import log from './logger'
import dbConnection from './database'
import { apiDoc } from './api-doc'
import { healthCheck } from './health-check'
import DoctorApi from './api/doctor'
import PatientApi from './api/patient'
import PharmacyApi from './api/pharmacy'
import PrescriptionApi from './api/prescription'
import UserApi from './api/user'
import AuthMiddleware from './middlewares/auth'
import config from './config'

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
const pharmacyApi = new PharmacyApi()
const patientApi = new PatientApi()
const prescriptionService = new PrescriptionApi()
const userService = new UserApi()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/mss/v1/ping', async (_: Request, res: Response) => {
    log.info('Call route /ping')

    res.send({ message: 'Hello! Ping it\'s OK!' })
})

app.get('/mss/v1/health-check', healthCheck)

const binder = (api: any, method: string) =>
    async (req: Request, res: Response) => {
        api[method](req, res)
    }

app.post('/mss/v1/doctor', binder(doctorApi, 'createDoctor'))
app.put('/mss/v1/doctor', AuthMiddleware([0]), binder(doctorApi, 'updateDoctor'))
app.get('/mss/v1/doctor', AuthMiddleware([0]), binder(doctorApi, 'getDoctor'))
app.get("/mss/v1/doctors", AuthMiddleware([0]), binder(doctorApi, 'getDoctors'))
app.post('/mss/v1/patient', binder(patientApi, 'createPatient'))
app.put('/mss/v1/patient', AuthMiddleware([1]), binder(patientApi, 'updatePatient'))
app.get('/mss/v1/patient', AuthMiddleware([1]), binder(patientApi, 'getPatient'))
app.get('/mss/v1/patients', AuthMiddleware([0]), binder(patientApi, 'getPatients'))
app.get('/mss/v1/patient/cpf/:cpf', AuthMiddleware([0,2]), binder(patientApi, 'getPatientByCpf'))
app.post('/mss/v1/pharmacy', binder(pharmacyApi, 'createPharmacy'))
app.put('/mss/v1/pharmacy', AuthMiddleware([2]), binder(pharmacyApi, 'updatePharmacy'))
app.get('/mss/v1/pharmacy', AuthMiddleware([2]), binder(pharmacyApi, 'getPharmacy'))
app.get("/mss/v1/pharmacies", AuthMiddleware([2]), binder(pharmacyApi, 'getPharmacies'))
app.post('/mss/v1/prescription', AuthMiddleware([0]), binder(prescriptionService, 'createPrescription'))
app.put('/mss/v1/prescription/:prescriptionId', AuthMiddleware([0]), binder(prescriptionService, 'updatePrescription'))
app.put('/mss/v1/prescription/take/:prescriptionId', AuthMiddleware([2]), binder(prescriptionService, 'takePrescription'))
app.delete('/mss/v1/prescription/:prescriptionId', AuthMiddleware([0]), binder(prescriptionService, 'deletePrescription'))
app.get('/mss/v1/prescriptions/', AuthMiddleware([0,1,2]), binder(prescriptionService, 'getPrescriptions'))
app.get('/mss/v1/prescription/:prescriptionId', AuthMiddleware([0,1,2]), binder(prescriptionService, 'getPrescription'))
app.post('/mss/v1/signin', binder(userService, 'loginAuthUser'))
app.put('/mss/v1/updateUser', AuthMiddleware([0,1,2], true), binder(userService, 'updateUser'))
app.delete('/mss/v1/removeUser', AuthMiddleware([0,1,2]), binder(userService, 'removeUser'))

async function run() {
    log.info('Start db')
    await dbConnection
    log.info('Finish db')

    app.use(
        '/api-doc',
        swaggerUi.serve,
        swaggerUi.setup(apiDoc)
    )

    log.info('Start listen')
    app.listen(config.port, () => {
        log.info(`Servidor rodando: ${config.port}`)
    })
}

export default run().catch(err => {
    log.error('Deu ruim Aqui ')
    log.error(err)
    log.error(err.stack)
    process.exit(1)
})
