"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function messageError(req, complement) {
    let message = 'Não foi possivel concluir';
    switch (req) {
        case 0:
            message += ' a requisição. Dados faltantes no corpo da requisição. Favor conferir.';
            break;
        case 1:
            message += ' o cadastro.';
            break;
        case 2:
            message += ' a alteração.';
            break;
        case 3:
            message += ' a exclusão.';
            break;
        case 4:
            message += ' a consulta.';
            break;
        case 5:
            message = 'Dados inválidos ou faltantes no corpo da requisição, favor conferir.';
            break;
        case 6:
            message += ' o login, pois há dados faltantes.';
            break;
        case 7:
            message += ' o login, pois login ou senha não conferem.';
            break;
        case 8:
            message = 'Seu usuário não ter permissão para acessa esta rotina.';
            break;
        case 9:
            message = 'Usuário desativado.';
            break;
        case 10:
            message = 'Usuário não autenticado. Favor realizar o login e tentar novamente.';
            break;
        default:
            message += '.';
            break;
    }
    return complement
        ? message += `${complement}`
        : message;
}
exports.messageError = messageError;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZXJyb3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxTQUFnQixZQUFZLENBQUMsR0FBVyxFQUFFLFVBQW1CO0lBQ3pELElBQUksT0FBTyxHQUFHLDJCQUEyQixDQUFBO0lBRXpDLFFBQVEsR0FBRyxFQUFFO1FBQ1QsS0FBSyxDQUFDO1lBQ0YsT0FBTyxJQUFJLHdFQUF3RSxDQUFBO1lBQ25GLE1BQUs7UUFDVCxLQUFLLENBQUM7WUFDRixPQUFPLElBQUksY0FBYyxDQUFBO1lBQ3pCLE1BQUs7UUFDVCxLQUFLLENBQUM7WUFDRixPQUFPLElBQUksZUFBZSxDQUFBO1lBQzFCLE1BQUs7UUFDVCxLQUFLLENBQUM7WUFDRixPQUFPLElBQUksY0FBYyxDQUFBO1lBQ3pCLE1BQUs7UUFDVCxLQUFLLENBQUM7WUFDRixPQUFPLElBQUksY0FBYyxDQUFBO1lBQ3pCLE1BQUs7UUFDVCxLQUFLLENBQUM7WUFDRixPQUFPLEdBQUcsc0VBQXNFLENBQUE7WUFDaEYsTUFBSztRQUNULEtBQUssQ0FBQztZQUNGLE9BQU8sSUFBSSxvQ0FBb0MsQ0FBQTtZQUMvQyxNQUFLO1FBQ1QsS0FBSyxDQUFDO1lBQ0YsT0FBTyxJQUFJLDZDQUE2QyxDQUFBO1lBQ3hELE1BQUs7UUFDVCxLQUFLLENBQUM7WUFDRixPQUFPLEdBQUcsd0RBQXdELENBQUE7WUFDbEUsTUFBSztRQUNULEtBQUssQ0FBQztZQUNGLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQTtZQUMvQixNQUFLO1FBQ1QsS0FBSyxFQUFFO1lBQ0gsT0FBTyxHQUFHLHFFQUFxRSxDQUFBO1lBQy9FLE1BQUs7UUFDVDtZQUNJLE9BQU8sSUFBSSxHQUFHLENBQUE7WUFDZCxNQUFLO0tBQ1o7SUFFRCxPQUFPLFVBQVU7UUFDYixDQUFDLENBQUMsT0FBTyxJQUFJLEdBQUcsVUFBVSxFQUFFO1FBQzVCLENBQUMsQ0FBQyxPQUFPLENBQUE7QUFDakIsQ0FBQztBQTdDRCxvQ0E2Q0MifQ==