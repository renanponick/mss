import { BusinessErrorCode } from './errors'

const appErrorMessages: Record<BusinessErrorCode, string> = {
    FORBIDDEN: 'Você não possui permissão para realizar esta ação.',
    AUTHENTICATION_FAILED: 'O e-mail informado não está cadastrado ou a senha '
        + 'está incorreta. Verifique os dados digitados e tente entrar '
        + 'novamente.',
    ENTITY_NOT_FOUND: 'Verifique os dados e tente novamente',
    DUPLICATED_ENTITY:
        'Não foi possível concluir essa ação: '
        + 'um ou mais itens já estão cadastrados',
    INVALID_INPUT:
        'Não foi possível concluir essa ação: Um ou mais campos inválidos',
    BUSINESS_ERROR: 'Erro não identificado, contate o administrador',
    ENTITY_IS_STILL_REFERENCED:
        'Não é possível realizar a operação pois o registro já possui '
        + 'relacionamento com outro cadastro.'
}

export default appErrorMessages
