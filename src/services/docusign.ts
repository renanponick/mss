import Prescription from '../models/prescription'

import DocuSign from './docusign/integration'
import DoctorService from './doctor'
import UserService from './user'

export default class DocusignService {

    private readonly docusign = new DocuSign()
    private readonly doctorService = new DoctorService()
    private readonly userService = new UserService()

    async signEmbedded(prescription: Prescription) {
        const { userId, name, cpf, role } = await this.doctorService
            .find(prescription.doctorId)
        const { email } = await this.userService.find(userId)
        const envelopeArgs = {
            signerEmail: email,
            signerName: name,
            dsReturnUrl: 'http://localhost:8080/mss/v1/docusign',
            icp: {
                cpf,
                role
            }
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
