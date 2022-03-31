import http from "./http-common";

class Paciente {

    findById(){
        return http.get(`/v1/patient`);
    }

    findByCpf(cpf){
        return http.get(`/v1/patient/cpf/${cpf}`);
    }

    findAll(){
        return http.get(`/v1/patients`);
    }

    create(data){
        return http.post("/v1/patient", data);
    }

    update(data){
        return http.put(`/v1/patient`, data);
    }

}
export default new Paciente();