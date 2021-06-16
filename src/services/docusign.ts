import Prescription from '../models/prescription'

import DocuSign from './docusign/integration'
import UserService from './user'

export default class DocusignService {

    private readonly docusign = new DocuSign()
    private readonly userService = new UserService()

    async signEmbedded(prescription: Prescription) {
        const id = prescription.id
        const { userId, name, cpf, role, crx } = prescription.doctor
        const { email } = await this.userService.find(userId)
        const envelopeArgs = {
            signerEmail: email,
            signerName: name,
            dsReturnUrl: 'http://localhost:8080/mss/v1/docusign',
            icp: {
                cpf,
                role
            },
            doctor: {
                name,
                crx,
                role,
            },
            patient: {
                name: prescription.patient.name,
            },
            composed: prescription.composed,
            dosage: prescription.dosage,
            timesDay: prescription.timesDay,
            note: prescription.note,
            validity: prescription.validity,
            token: id.substring(id.length - 6)
        }
        try {
            return this.docusign.workerEmbedded(envelopeArgs)
        }
        catch (error) {
            throw new Error(`Erro na geração da receita. ${error}`)
        }
    }

    downloadPrescription(envelopeId: string) {
        return this.docusign.downloadPrescription(envelopeId)
    }

}
