export function messageError(req: number, complement?: string){
    let message = 'Não foi possivel concluir'

    switch (req) {
        case 0:
            message += ' a requisição. Dados faltantes no corpo da requisição. Favor conferir.'
            break
        case 1:
            message += ' o cadastro.'
            break
        case 2:
            message += ' a alteração.'
            break
        case 3:
            message += ' a exclusão.'
            break
        case 4:
            message += ' a consulta.'
            break
        case 5:
            message = 'Dados inválidos ou faltantes no corpo da requisição, favor conferir.'
            break
        case 6:
            message += ' o login, pois há dados faltantes.'
            break
        case 7:
            message += ' o login, pois login ou senha não conferem.'
            break
        case 8:
            message = 'Seu usuário não ter permissão para acessa esta rotina.'
            break
        case 9:
            message = 'Usuário desativado.'
            break
        case 10:
            message = 'Usuário não autenticado. Favor realizar o login e tentar novamente.'
            break
        default:
            message += '.'
            break

    }

    return complement
        ? message += `${complement}`
        : message
    
}