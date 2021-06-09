import { Service } from 'typedi'
import { getCustomRepository } from 'typeorm'
import { isThisHour, isAfter } from 'date-fns'
import { omit } from 'ramda'

import PrescriptionRepository from '../repositories/prescription'
import {
    CreatePrescription,
    TakePrescription,
    UpdatePrescription
} from '../type'

import UserService from './user'
import DoctorService from './doctor'
import PatientService from './patient'
import PharmacyService from './pharmacy'
import DocusignService from './docusign'

@Service()
export default class PrescriptionService {

    private userService = new UserService()
    private doctorService = new DoctorService()
    private patientService = new PatientService()
    private pharmacyService = new PharmacyService()
    private docusign = new DocusignService()

    async create(fields: CreatePrescription) {
        const repository = getCustomRepository(PrescriptionRepository)
        try {
            const prescription = await repository.createAndSave(
                omit(['userId'], fields)
            )

            const result = await this.docusign.signEmbedded(prescription)

            await this.update({
                ...prescription,
                externalId: result.externalId
            })

            return result.viewEnvelop
        } catch (error) {
            throw new Error(`Erro na geração da receita. ${error}`)
        }
    }

    async update(fields: UpdatePrescription) {
        const repository = getCustomRepository(PrescriptionRepository)
        const query = { id: fields.id }
        const prescription = await repository
            .findOneOrFail({ where: query })

        if (!isThisHour(prescription.createdAt)) {
            throw new Error(
                'Não é possivel alterar uma prescrição gerada após uma hora.'
            )
        }

        if (prescription.pharmacyId) {
            throw new Error('Não é possivel alterar uma receita já dispensada.')
        }

        return repository.save({
            ...query,
            ...prescription,
            ...omit(['userId'], fields)
        })
    }

    async takePrescription(fields: TakePrescription) {
        const repository = getCustomRepository(PrescriptionRepository)
        const query = { id: fields.id }

        const prescription = await repository
            .findOneOrFail({ where: query })

        if (isAfter(new Date(), new Date(prescription.validity))) {
            throw new Error('Receita vencida.')
        }

        if (prescription.pharmacyId) {
            throw new Error('Receita já dispensada.')
        }

        return repository.save({
            ...query,
            ...prescription,
            pharmacyId: fields.pharmacyId
        })
    }

    async remove(id: string) {
        const repository = getCustomRepository(PrescriptionRepository)
        const query = { id }
        const prescription = await repository.findOneOrFail(query)

        if (!isThisHour(prescription.createdAt)) {
            throw new Error(
                'Não é possivel excluir uma receita gerada após uma hora.'
            )
        }

        if (prescription.pharmacyId) {
            throw new Error('Não é possivel excluir uma receita já dispensada.')
        }

        await repository.remove({ ...prescription })

        return omit(['userId'], prescription)
    }

    async getPrescription(userId: string, prescriptionId: string) {
        const { type } = await this.userService.find(userId)
        try {
            let result
            if (type === 0) {
                const { id } = await this.doctorService.findUser(userId)
                result = await this.findByDoctor(id)
            } else if (type === 1) {
                const { id } = await this.patientService.findUser(userId)
                result = await this.findByPatient(id)
            } else if (type === 2) {
                const { id } = await this.pharmacyService.findUser(userId)
                result = await this.findByPharmacy(id)
            }

            if (result && result.length > 0) {
                return result.find(
                    prescription => prescription.id === prescriptionId
                )
            } else {
                throw new Error('Receita não encontrada para usuário logado.')
            }
        } catch (err) {
            throw new Error(err)
        }
    }

    async find(id: string) {
        const repository = getCustomRepository(PrescriptionRepository)
        const query = { id }

        return repository.findOneOrFail({ where: query })
    }

    async getPrescriptions(userId: string) {
        const { type } = await this.userService.find(userId)
        try {
            if (type === 0) {
                const { id } = await this.doctorService.findUser(userId)
                const result = await this.findByDoctor(id)

                return result
            } else if (type === 1) {
                const { id } = await this.patientService.findUser(userId)
                const result = await this.findByPatient(id)

                return result
            } else if (type === 2) {
                const { id } = await this.pharmacyService.findUser(userId)
                const result = await this.findByPharmacy(id)

                return result
            }
        } catch (err) {
            throw new Error(err)
        }
    }

    async findByDoctor(doctorId: string) {
        const repository = getCustomRepository(PrescriptionRepository)
        const query = { doctorId }

        return repository.find({ where: query })
    }

    async findByPatient(patientId: string) {
        const repository = getCustomRepository(PrescriptionRepository)
        const query = { patientId }

        return repository.find({ where: query })
    }

    async findByPharmacy(pharmacyId: string) {
        const repository = getCustomRepository(PrescriptionRepository)
        const query = { pharmacyId }

        return repository.find({ where: query })
    }

    async getPrescriptionsByToken(token: string) {
        const repository = getCustomRepository(PrescriptionRepository)

        return repository.query(`select * from prescription where substring(id::text, LENGTH(id::TEXT)-5, LENGTH(id::TEXT)) = '${token}'`)
    }

    async downloadPrescription(userId: string, prescriptionId: string) {
        const { type } = await this.userService.find(userId)
        try {
            let result
            if (type === 0) {
                const { id } = await this.doctorService.findUser(userId)
                result = await this.findByDoctor(id)
            } else if (type === 1) {
                const { id } = await this.patientService.findUser(userId)
                result = await this.findByPatient(id)
            } else if (type === 2) {
                const { id } = await this.pharmacyService.findUser(userId)
                result = await this.findByPharmacy(id)
            }

            if (result && result.length > 0) {
                const prescription = result.find(
                    prescription => prescription.id === prescriptionId
                )
                if (prescription) {
                    return this.docusign
                        .downloadPrescription(prescription.externalId)
                }
            } else {
                throw new Error('Receita não encontrada para usuário logado.')
            }
        } catch (err) {
            throw new Error(err)
        }
    }

}
