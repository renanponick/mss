export function messageError(req: number, complement?: string){
    let message = 'Não foi possivel concluir'

    switch (req) {
        case 0:
            message += ` a requisição. Dados faltantes no corpo da requisição. Favor conferir.`
            break
        case 1:
            message += ` o cadastro. ${complement}`
            break
        case 2:
            message += ` a alteração. ${complement}`
            break
        case 3:
            message += ` a exclusão. ${complement}`
            break
        case 4:
            message += ` a consulta. ${complement}`
            break
        case 5:
            message = `Dados inválidos ou faltantes no corpo da requisição, favor conferir. ${complement}`
            break
        case 6:
            message += ` o login, pois há dados faltantes.${complement}`
            break
        case 7:
            message += ` o login, pois login ou senha não conferem.`
            break
        case 8:
            message = `Seu usuário não ter permissão para acessa esta rotina.`
            break
        case 9:
            message += `. ${complement}`
            break
        default:
            message += `. ${complement}`
            break

    }

    return message
}