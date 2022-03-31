import http from "./http-common";

class Doutor {

    findById(){
        return http.get(`/v1/doctor`);
    }

    findAll(){
        return http.get(`/v1/doctors`);
    }

    create(data){
        return http.post("/v1/doctor", data);
    }

    update(data){
        return http.put(`/v1/doctor`, data);
    }

}
export default new Doutor();