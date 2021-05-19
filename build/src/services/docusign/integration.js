"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const docusign_esign_1 = __importDefault(require("docusign-esign"));
const config_1 = __importDefault(require("../../config"));
class DocuSign {
    constructor() {
        this.opts = {
            basePath: 'https://demo.docusign.net/restapi',
            oAuthBasePath: 'https://account-d.docusign.com'
        };
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
    async getToken() {
        const clientApi = new docusign_esign_1.default.ApiClient(this.opts);
        try {
            const result = await clientApi.requestJWTUserToken(config_1.default.integrationKey, config_1.default.userIdDocusign, config_1.default.scopeDocusign.split(' '), Buffer.from(config_1.default.privateKey, 'utf-8'), 600)
                .catch((e) => {
                const body = e.response && e.response.body;
                if (body) {
                    if (body.error && body.error === 'consent_required') {
                        const consentScope = config_1.default.scopeDocusign;
                        const consentUrl = `${this.opts.oAuthBasePath}/oauth/auth?response_type=code&scope=${consentScope}&client_id=${config_1.default.integrationKey}&redirect_uri=${config_1.default.endpoint}`;
                        return { permission: consentUrl };
                    }
                    else {
                        return body;
                    }
                }
                else {
                    return {
                        response: {
                            body: {
                                message: e
                            },
                            error: {
                                status: 404
                            }
                        }
                    };
                }
            });
            if (typeof result === 'object'
                && 'body' in result) {
                return { token: result.body.access_token };
            }
            else if ('permission' in result) {
                return result;
            }
        }
        catch (error) {
            return {
                response: {
                    body: {
                        message: error
                    },
                    error: {
                        status: 404
                    }
                }
            };
        }
    }
}
exports.default = DocuSign;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW50ZWdyYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc2VydmljZXMvZG9jdXNpZ24vaW50ZWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRUFNeUI7QUFFekIsMERBQWlDO0FBRWpDLE1BQXFCLFFBQVE7SUFBN0I7UUFFcUIsU0FBSSxHQUFHO1lBQ3BCLFFBQVEsRUFBRSxtQ0FBbUM7WUFDN0MsYUFBYSxFQUFFLGdDQUFnQztTQUNsRCxDQUFBO1FBNEREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUF1TEY7SUFFRixDQUFDO0lBblBXLEtBQUssQ0FBQyxRQUFRO1FBQ2xCLE1BQU0sU0FBUyxHQUFHLElBQUksd0JBQVEsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ25ELElBQUk7WUFDQSxNQUFNLE1BQU0sR0FBRyxNQUFNLFNBQVMsQ0FBQyxtQkFBbUIsQ0FDOUMsZ0JBQU0sQ0FBQyxjQUFjLEVBQ3JCLGdCQUFNLENBQUMsY0FBYyxFQUNyQixnQkFBTSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQU0sQ0FBQyxVQUFVLEVBQUUsT0FBTyxDQUFDLEVBQ3ZDLEdBQUcsQ0FDTjtpQkFDSSxLQUFLLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtnQkFDZCxNQUFNLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFBO2dCQUMxQyxJQUFJLElBQUksRUFBRTtvQkFDTixJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxrQkFBa0IsRUFBRTt3QkFDakQsTUFBTSxZQUFZLEdBQUcsZ0JBQU0sQ0FBQyxhQUFhLENBQUE7d0JBQ3pDLE1BQU0sVUFBVSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUNoQyx3Q0FBd0MsWUFDeEMsY0FBYyxnQkFBTSxDQUFDLGNBQ3JCLGlCQUFpQixnQkFBTSxDQUFDLFFBQVEsRUFBRSxDQUFBO3dCQUVsQyxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxDQUFBO3FCQUNwQzt5QkFBTTt3QkFDSCxPQUFPLElBQUksQ0FBQTtxQkFDZDtpQkFDSjtxQkFBTTtvQkFDSCxPQUFPO3dCQUNILFFBQVEsRUFBRTs0QkFDTixJQUFJLEVBQUU7Z0NBQ0YsT0FBTyxFQUFFLENBQUM7NkJBQ2I7NEJBQ0QsS0FBSyxFQUFFO2dDQUNILE1BQU0sRUFBRSxHQUFHOzZCQUNkO3lCQUNKO3FCQUNKLENBQUE7aUJBQ0o7WUFDTCxDQUFDLENBQUMsQ0FBQTtZQUNOLElBQ0ksT0FBTyxNQUFNLEtBQUssUUFBUTttQkFDdkIsTUFBTSxJQUFJLE1BQU0sRUFDckI7Z0JBQ0UsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFBO2FBQzdDO2lCQUFNLElBQUksWUFBWSxJQUFJLE1BQU0sRUFBRTtnQkFDL0IsT0FBTyxNQUFNLENBQUE7YUFDaEI7U0FDSjtRQUFDLE9BQU8sS0FBSyxFQUFFO1lBQ1osT0FBTztnQkFDSCxRQUFRLEVBQUU7b0JBQ04sSUFBSSxFQUFFO3dCQUNGLE9BQU8sRUFBRSxLQUFLO3FCQUNqQjtvQkFDRCxLQUFLLEVBQUU7d0JBQ0gsTUFBTSxFQUFFLEdBQUc7cUJBQ2Q7aUJBQ0o7YUFDSixDQUFBO1NBQ0o7SUFDTCxDQUFDO0NBMExKO0FBMVBELDJCQTBQQyJ9