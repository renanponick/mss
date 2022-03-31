import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/mss",
    headers: {
        "Content-type": "application/json",
        "authorization": `Bearer ${localStorage.getItem("user-token")}`
    }
});