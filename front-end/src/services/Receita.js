import http from "./http-common";

class Receita {

    findById(id){
        return http.get(`/v1/prescription/${id}`);
    }
    
    findByToken(token){
        return http.get(`/v1/prescription/token/${token}`);
    }

    takePrescription(id){
        return http.put(`/v1/prescription/take/${id}`);
    }

    findAll(){
        return http.get(`/v1/prescriptions`);
    }

    create(data){
        return http.post("/v1/prescription", data);
    }

    update(data, id){
        return http.put(`/v1/prescription/${id}`, data);
    }

    delete(id){
        return http.delete(`/v1/prescription/${id}`);
    }

}
export default new Receita();