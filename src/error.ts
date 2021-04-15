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
            message += `. ${complement}`
            break
        case 6:
            message += `. ${complement}`
            break
        case 7:
            message += `. ${complement}`
            break
        case 8:
            message += `. ${complement}`
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

export const erroData = ''