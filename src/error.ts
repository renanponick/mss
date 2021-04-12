export function messageError(req: string){
    return `Não foi possivel concluir ${req}.\nPor favor, tente novamente mais tarde`
}

export const erroData = 'Dados faltantes no corpo da requisição. Favor conferir.'