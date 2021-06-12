/* eslint-disable max-len */
import docusign, {
    Document,
    EnvelopeDefinition,
    RecipientViewRequest,
    Signer,
    SignHere
} from 'docusign-esign'

import config from '../../config'
import { EnvelopeArgs } from '../../type'

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

    async workerEmbedded(envelopeArgs: EnvelopeArgs) {
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

        const envelope = this.makeEnvelope(envelopeArgs)

        const results = await envelopesApi.createEnvelope(
            config.accountId,
            { envelopeDefinition: envelope }
        )

        if (results.envelopeId) {
            const viewRequest = this.makeRecipientViewRequest(envelopeArgs)

            const viewEnvelop = await envelopesApi.createRecipientView(
                config.accountId,
                results.envelopeId,
                { recipientViewRequest: viewRequest }
            )

            return { viewEnvelop, externalId: results.envelopeId }
        } else {
            throw new Error('Erro na criação do envelope')
        }
    }

    private makeEnvelope(envelopeArgs: EnvelopeArgs) {
        const docb64 = Buffer
            .from(this.prescriptionHtml(envelopeArgs))
            .toString('base64')
        const doc: Document = {
            documentBase64: docb64,
            name: 'Receita',
            fileExtension: 'html',
            documentId: '1'
        }
        const signHere: SignHere = {
            anchorString: '**signature_1**',
            anchorYOffset: '10',
            anchorUnits: 'pixels',
            anchorXOffset: '20'
        }
        const signer: Signer = {
            email: envelopeArgs.signerEmail,
            name: envelopeArgs.signerName,
            clientUserId: '1000',
            recipientId: '1',
            tabs: { signHereTabs: [signHere] },
            /*recipientSignatureProviders: [{
                // eslint-disable-next-line max-len
                signatureProviderName: 'UniversalSignaturePen_ICP_SmartCard_TSP',
                signatureProviderOptions: {
                    cpfNumber: envelopeArgs.icp.cpf,
                    signerRole: envelopeArgs.icp.role
                }
            }]*/
        }
        const env: EnvelopeDefinition = {
            emailSubject: 'Receita médica',
            brandId: 'bf40158b-b21d-4d0e-9e76-dde9da509de6',
            documents: [doc],
            recipients: {
                signers: [signer]
            },
            status: 'sent'
        }

        return env
    }

    private prescriptionHtml(envelopeArgs: EnvelopeArgs) {
        return `
        <!DOCTYPE html>
        <html>
            <head>
            <meta charset="UTF-8">
            </head>
            <body style="font-family:sans-serif;margin-left:2em;">
            <h1 style="font-family: 'Trebuchet MS', Helvetica, sans-serif;
                color: darkblue;margin-bottom: 0;">World Wide Corp</h1>
            <h2 style="font-family: 'Trebuchet MS', Helvetica, sans-serif;
            margin-top: 0px;margin-bottom: 3.5em;font-size: 1em;
            color: darkblue;">Order Processing Division</h2>
            <h4>Ordered by ${envelopeArgs.signerName}</h4>
            <p style="margin-top:0em; margin-bottom:0em;">Email: ${envelopeArgs.signerEmail}</p>
            <p style="margin-top:3em;">
    Candy bonbon pastry jujubes lollipop wafer biscuit biscuit. Topping brownie sesame snaps sweet roll pie. Croissant danish biscuit soufflé caramels jujubes jelly. Dragée danish caramels lemon drops dragée. Gummi bears cupcake biscuit tiramisu sugar plum pastry. Dragée gummies applicake pudding liquorice. Donut jujubes oat cake jelly-o. Dessert bear claw chocolate cake gummies lollipop sugar plum ice cream gummies cheesecake.
            </p>
            <!-- Note the anchor tag for the signature field is in white. -->
            <h3 style="margin-top:3em;">Agreed: <span style="color:white;">**signature_1**/</span></h3>
            </body>
        </html>
    `
    }

    private makeRecipientViewRequest(envelopeArgs: EnvelopeArgs) {
        const viewRequest: RecipientViewRequest = {
            returnUrl: `${envelopeArgs.dsReturnUrl}?state=123`,
            authenticationMethod: 'none',
            email: envelopeArgs.signerEmail,
            userName: envelopeArgs.signerName,
            clientUserId: '1000'
        }

        return viewRequest
    }

    async downloadPrescription(idEnvelope: string) {
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

}
