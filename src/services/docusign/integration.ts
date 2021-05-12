import docusign/* , {
    Document,
    EnvelopeDefinition,
    RecipientViewRequest,
    Signer,
    SignHere
}*/ from 'docusign-esign'

import config from '../../config'

export default class DocuSign {

    private readonly opts = {
        basePath: 'https://demo.docusign.net/restapi',
        oAuthBasePath: 'https://account-d.docusign.com'
    }

    private async getToken() {
        const clientApi = new docusign.ApiClient(this.opts)
        try {
            const result = await clientApi.requestJWTUserToken(
                config.integrationKey,
                config.userIdDocusign,
                config.scopeDocusign.split(' '),
                Buffer.from(config.privateKey, 'utf-8'),
                600
            )
                .catch((e: any) => {
                    const body = e.response && e.response.body
                    if (body) {
                        if (body.error && body.error === 'consent_required') {
                            const consentScope = config.scopeDocusign
                            const consentUrl = `${this.opts.oAuthBasePath
                            }/oauth/auth?response_type=code&scope=${consentScope
                            }&client_id=${config.integrationKey
                            }&redirect_uri=${config.endpoint}`

                            return { permission: consentUrl }
                        } else {
                            return body
                        }
                    } else {
                        return {
                            response: {
                                body: {
                                    message: e
                                },
                                error: {
                                    status: 404
                                }
                            }
                        }
                    }
                })
            if (
                typeof result === 'object'
                && 'body' in result
            ) {
                return { token: result.body.access_token }
            } else if ('permission' in result) {
                return result
            }
        } catch (error) {
            return {
                response: {
                    body: {
                        message: error
                    },
                    error: {
                        status: 404
                    }
                }
            }
        }
    }
    /* -
    private makeEnvelope(
        file: string,
        recipients: string,
        emailSubject: string
    ) {
        const signers: Signer[] = []
        if (recipients.length > 0) {
            recipients.map((recipient, index) => {
                const recipientId = (index + 1).toString()
                if (recipient.action === 0) {
                    const signHere: SignHere = {
                        anchorString: recipient.anchorString,
                        anchorYOffset: '10',
                        anchorUnits: 'pixels',
                        anchorXOffset: '20'
                    }

                    signers.push({
                        name: recipient.name,
                        email: recipient.email,
                        routingOrder: recipient.workflow || '0',
                        recipientId,
                        tabs: {
                            signHereTabs: [signHere]
                        },
                        recipientSignatureProviders: recipient.icp
                            ? [{
                                // eslint-disable-next-line max-len
                                signatureProviderName:
                                'UniversalSignaturePen_ICP_SmartCard_TSP',
                                signatureProviderOptions: {
                                    cpfNumber: recipient.icp.cpf,
                                    signerRole: recipient.icp.role
                                }
                            }]
                            : []
                    })
                }
            })
        }

        const document: Document = {
            documentBase64: file.fileBase64,
            name: file.name,
            fileExtension: file.type,
            documentId: '1'
        }

        const envelop: EnvelopeDefinition = {
            emailSubject,
            documents: [document],
            status: 'created',
            recipients: {
                signers
            }
        }

        return envelop
    }

    public async sendDocument(
        file: string,
        emailSubject: string
    ) {
        const returnToken = await this.getToken()
        if (!returnToken.token) {
            return returnToken
        }
        const clientApi = new docusign.ApiClient(this.opts)
        clientApi.addDefaultHeader(
            'Authorization',
            `Bearer ${returnToken.token}`
        )
        const envelopesApi = new docusign.EnvelopesApi(clientApi)

        const envelope = this.makeEnvelope([], file, emailSubject)
        try {
            const result = await envelopesApi.createEnvelope(
                config.accountId,
                { envelopeDefinition: envelope }
            )

            return result
        } catch (error) {
            return error
        }
    }

    public async getDocument(idEnvelope: string) {
        const returnToken = await this.getToken()
        if (!returnToken.token) {
            return returnToken
        }
        const clientApi = new docusign.ApiClient(this.opts)
        clientApi.addDefaultHeader(
            'Authorization',
            `Bearer ${returnToken.token}`
        )
        const envelopesApi = new docusign.EnvelopesApi(clientApi)

        try {
            const result = await envelopesApi.getEnvelope(
                config.accountId,
                idEnvelope
            )

            return result
        } catch (error) {
            return error
        }
    }

    public async downloadDocument(idEnvelope: string) {
        const returnToken = await this.getToken()
        if (!returnToken.token) {
            return returnToken
        }
        const clientApi = new docusign.ApiClient(this.opts)
        clientApi.addDefaultHeader(
            'Authorization',
            `Bearer ${returnToken.token}`
        )
        const envelopesApi = new docusign.EnvelopesApi(clientApi)
        const documentOptions = {
            certificate: 'true',
            language: 'pt_BR'
        }
        try {
            const result = await envelopesApi.getDocument(
                config.accountId,
                idEnvelope,
                'archive',
                documentOptions
            )

            return result
        } catch (error) {
            return error
        }
    }

    public makeRecipientViewRequest(signerInfo: string) {
        const viewRequest: RecipientViewRequest = {
            returnUrl: `${signerInfo.returnUrl}?state=123`,
            authenticationMethod: 'none',
            email: signerInfo.email,
            userName: signerInfo.userName,
            userId: signerInfo.userId
        }

        return viewRequest
    }

    public async signing(
        idEnvelope: string,
        signerInfo: string
    ) {
        const returnToken = await this.getToken()
        if (!returnToken.token) {
            return returnToken
        }
        const clientApi = new docusign.ApiClient(this.opts)
        clientApi.addDefaultHeader(
            'Authorization',
            `Bearer ${returnToken.token}`
        )
        const envelopesApi = new docusign.EnvelopesApi(clientApi)

        try {
            const viewRequest = this.makeRecipientViewRequest(signerInfo)

            const result = await envelopesApi.createRecipientView(
                config.accountId,
                idEnvelope,
                { recipientViewRequest: viewRequest }
            )

            return result
        } catch (error) {
            return error
        }
    }
*/

}
