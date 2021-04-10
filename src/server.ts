import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import log from './logger'

import DoctorService from './services/doctor'
import PatientService from './services/patient'
import PharmacyService from './services/pharmacy'
import PrescriptionService from './services/prescription'
import UserService from './services/user'
import { CreateDoctor, UpdateDoctor } from './type'
const app = express();

const doctorService = new DoctorService()
const patientService = new PatientService()
const pharmacyService = new PharmacyService()
const prescriptionService = new PrescriptionService()
const userService = new UserService()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))

app.get("/ping", async (_: Request, res: Response) => {
    log.info("Call route /ping")

    res.json({ message: "Hello! Ping it's OK!" })
});

// Doctor
app.get("/doctor/:doctorId", async (req: Request, res: Response) => {
    const doctorId = req.params.doctorId
    try {
        const result = await doctorService.find(doctorId)
        res.send(result)
    }catch (err){
        res.status(404).send({
            message: "Doutor não encontrado. ID: " + doctorId,
            err
        });
    }
});

app.get("/doctors", async (_: Request, res: Response) => {
    try {
        const result = await doctorService.findAll()
        res.send(result)
    }catch (err){
        res.status(404).send({
            message: "Doutores não encontrados.",
            err
        });
    }
});

app.post("/doctor", async (req: Request, res: Response) => {
    const body = req.body
    if (!CreateDoctor.is(body)) {
        res.status(400).send({
            message: "Dados faltantes no corpo da requisição. Favor conferir."
        });
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
        const result = await doctorService.create(input)
        res.send(result)
    }catch(err){
        res.status(500).send({
            message: "Erro ao cadastrar doutor.",
            err
        });
    }
});

app.put("/doctor/:doctorId", async (req: Request, res: Response) => {
    const body = req.body

    if (!UpdateDoctor.is(body)) {
        res.status(400).send({
            message: "Dados faltantes no corpo da requisição. Favor conferir."
        });
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
        const result = await doctorService.update(input)
        res.send(result)
    }catch(err){
        res.status(500).send({
            message: "Erro ao alterar doutor.",
            err
        });
    }
});

app.delete("/doctor/:doctorId", async (req: Request, res: Response) => {
    try{
        const result = await doctorService.delete(req.params.doctorId)
        res.send(result)
    }catch(err){
        res.status(500).send({
            message: "Erro ao excluir doutor.",
            err
        });
    }
});



// Phanrmacy
app.get("/pharmacy/:pharmacyId" , async (req: Request, res: Response) => {
    const result = await pharmacyService.find(req.params.pharmacyId)
    res.json({ message: "retorno" })
});
    
/*app.get("/pharmacy/user/:userId", async (req: Request, res: Response) => {
    const result = await pharmacyService.findByUserId()
    res.json({ message: "retorno" })
});*/

app.get("/pharmacies", async (_: Request, res: Response) => {
    const result = await pharmacyService.findAll()
    res.json({ message: "retorno" })
});

app.post("/pharmacy", async (req: Request, res: Response) => {
    const result = await pharmacyService.create(req)
    res.json({ message: "retorno" })
});

app.put("/pharmacy/:pharmacyId", async (req: Request, res: Response) => {
    const result = await pharmacyService.update(req)
    res.json({ message: "retorno" })
});

// Patient

app.get("/patient/:patientId", async (req: Request, res: Response) => {
    const result = await patientService.find(req.params.pharmacyId)
    res.json({ message: "retorno" })
});

/*app.get("/pacientes/user/:idUsuario", async (req: Request, res: Response) => {
    const result = await patientService.findByUserId()
    res.json({ message: "retorno" })
});*/

app.get("/patients", async (_: Request, res: Response) => {
    const result = await patientService.findAll()
    res.json({ message: "retorno" })
});

app.post("/patient", async (req: Request, res: Response) => {
    const result = await patientService.create(req)
    res.json({ message: "retorno" })
});

app.put("/patient/:patientId", async (req: Request, res: Response) => {
    const result = await patientService.update(req)
    res.json({ message: "retorno" })
});

// Prescription
app.get("/prescription/:prescriptionId", async (req: Request, res: Response) => {
    const result = await prescriptionService.find(req.params.pharmacyId)
    res.json({ message: "retorno" })
});
/*
app.get("/prescription/patient/:patientId", async (req: Request, res: Response) => {
    const result = await prescriptionService.findByPaciente()
    res.json({ message: "retorno" })
});

app.get("/prescription/doctor/:doctorId", async (req: Request, res: Response) => {
    const result = await prescriptionService.findByDoutor()
    res.json({ message: "retorno" })
});

app.get("/prescription/pharmacy/:pharmacyId", async (req: Request, res: Response) => {
    const result = await prescriptionService.findByFarmacia()
    res.json({ message: "retorno" })
});
*/
app.get("/prescriptions", async (_: Request, res: Response) => {
    const result = await prescriptionService.findAll()
    res.json({ message: "retorno" })
});
//[authJwt.verifyToken, authJwt.isDoutor],
app.post("/prescription", async (req: Request, res: Response) => {
    const result = await prescriptionService.create(req)
    res.json({ message: "retorno" })
});

app.put("/prescription/:prescriptionId", async (req: Request, res: Response) => {
    const result = await prescriptionService.update(req)
    res.json({ message: "retorno" })
});

app.delete("/prescription", async (req: Request, res: Response) => {
    const result = await prescriptionService.remove(req.params.userId)
    res.json({ message: "retorno" })
});

// User
//app.post("/signin", UserService.signIn);

app.delete("/userId", async (req: Request, res: Response) => {
    const result = await userService.remove(req.params.userId)
    res.json({ message: "retorno" })
});

app.listen(3000, () => {
    log.info(`Servidor rodando: http://localhost:3000`)
});

