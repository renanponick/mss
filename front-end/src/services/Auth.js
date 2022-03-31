import http from "./http-common";
import decode from "jwt-decode";

class Auth {

    signIn(data){
        return http.post("/v1/signin", data);
    }

    setUserData(data){
        localStorage.setItem("user-token", data.token);
        localStorage.setItem("user-type", data.type);
    }

    logOut(){
        localStorage.removeItem("user-token");
        localStorage.removeItem("user-type");
        window.location.href="/login"
    }

    isSignedIn(pageType){
        const token = localStorage.getItem("user-token");
        const type = localStorage.getItem("user-type");
        if(!type && !token){
            this.logOut();
        }
        if(parseInt(type) !== pageType){
            this.logOut();
        }
        try{
            var res = decode(token);
            if(res.type !== pageType){
                this.logOut();
            }
        } catch(_) {
            this.logOut();
        }
    }

    delete(){
        return http.delete(`/v1/removeUser`);
    }

}
export default new Auth();