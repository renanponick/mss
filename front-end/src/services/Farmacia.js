import http from "./http-common";

class Farmacia {

    findById(){
        return http.get(`/v1/pharmacy`);
    }

    findAll(){
        return http.get(`/v1/pharmacy`);
    }

    create(data){
        return http.post("/v1/pharmacy", data);
    }

    update(data){
        return http.put(`/v1/pharmacy`, data);
    }

}
export default new Farmacia();