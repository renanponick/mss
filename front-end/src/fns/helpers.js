export function formataData(dataEnviada){
    const data = new Date(dataEnviada);
    return ((data.getDate())) + "/" + ((data.getMonth() + 1)) + "/" + data.getFullYear();
}